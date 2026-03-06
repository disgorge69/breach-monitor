import { db } from "./db";
import { breaches, type InsertBreach, type BreachResponse } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getBreaches(): Promise<BreachResponse[]>;
  getBreach(id: number): Promise<BreachResponse | undefined>;
  createBreach(breach: InsertBreach): Promise<BreachResponse>;
}

export class DatabaseStorage implements IStorage {
  async getBreaches(): Promise<BreachResponse[]> {
    return await db.select().from(breaches).orderBy(breaches.breachDate);
  }

  async getBreach(id: number): Promise<BreachResponse | undefined> {
    const [breach] = await db.select().from(breaches).where(eq(breaches.id, id));
    return breach;
  }

  async createBreach(insertBreach: InsertBreach): Promise<BreachResponse> {
    const [breach] = await db.insert(breaches).values(insertBreach).returning();
    return breach;
  }
}

export const storage = new DatabaseStorage();
