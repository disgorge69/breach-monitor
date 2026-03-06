import { db } from "./db";
import { breaches, type InsertBreach, type BreachResponse, type Breach } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getBreaches(): Promise<BreachResponse[]>;
  getBreach(id: number): Promise<BreachResponse | undefined>;
  createBreach(breach: InsertBreach): Promise<BreachResponse>;
}

let inMemoryBreaches: BreachResponse[] = [];
let nextId = 1;

export class DatabaseStorage implements IStorage {
  async getBreaches(): Promise<BreachResponse[]> {
    if (!db) return inMemoryBreaches.sort((a, b) => 
      new Date(b.breachDate).getTime() - new Date(a.breachDate).getTime()
    );
    return await db.select().from(breaches).orderBy(breaches.breachDate);
  }

  async getBreach(id: number): Promise<BreachResponse | undefined> {
    if (!db) return inMemoryBreaches.find(b => b.id === id);
    const [breach] = await db.select().from(breaches).where(eq(breaches.id, id));
    return breach;
  }

  async createBreach(insertBreach: InsertBreach): Promise<BreachResponse> {
    if (!db) {
      const newBreach: BreachResponse = {
        ...insertBreach,
        id: nextId++,
        addedDate: new Date(),
      } as BreachResponse;
      inMemoryBreaches.push(newBreach);
      return newBreach;
    }
    const [breach] = await db.insert(breaches).values(insertBreach).returning();
    return breach;
  }
}

export const storage = new DatabaseStorage();
