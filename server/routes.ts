import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";

async function fetchExternalBreaches() {
  try {
    const response = await fetch("https://haveibeenpwned.com/api/v3/breaches");
    if (!response.ok) return [];
    const data = await response.json();
    return data.slice(0, 10).map((b: any) => ({
      name: b.Title,
      domain: b.Domain,
      breachDate: new Date(b.BreachDate),
      description: b.Description.replace(/<[^>]*>?/gm, ''), // Strip HTML
      recordCount: b.PwnCount,
      severity: b.PwnCount > 1000000 ? "critical" : b.PwnCount > 100000 ? "high" : "medium"
    }));
  } catch (err) {
    console.error("Failed to fetch external breaches:", err);
    return [];
  }
}

async function seedDatabase() {
  const existingBreaches = await storage.getBreaches();
  if (existingBreaches.length === 0) {
    const externalBreaches = await fetchExternalBreaches();
    const seedData = externalBreaches.length > 0 ? externalBreaches : [
      {
        name: "TechNova Solutions",
        domain: "technova.example.com",
        breachDate: new Date("2023-11-15T00:00:00Z"),
        description: "A misconfigured S3 bucket exposed customer PII and internal access logs.",
        recordCount: 154000,
        severity: "high"
      },
      {
        name: "Global Finance Corp",
        domain: "gfc.example.net",
        breachDate: new Date("2024-01-22T00:00:00Z"),
        description: "Ransomware group exploited a zero-day vulnerability in VPN concentrators.",
        recordCount: 2300000,
        severity: "critical"
      }
    ];

    for (const data of seedData) {
      await storage.createBreach(data);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Call seed database
  seedDatabase().catch(console.error);

  app.get(api.breaches.list.path, async (req, res) => {
    try {
      const allBreaches = await storage.getBreaches();
      res.status(200).json(allBreaches);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch breaches" });
    }
  });

  app.get(api.breaches.get.path, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const breach = await storage.getBreach(id);
      if (!breach) {
        return res.status(404).json({ message: "Breach not found" });
      }
      res.status(200).json(breach);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.breaches.create.path, async (req, res) => {
    try {
      const input = api.breaches.create.input.extend({
        breachDate: z.coerce.date()
      }).parse(req.body);
      const newBreach = await storage.createBreach(input);
      res.status(201).json(newBreach);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
