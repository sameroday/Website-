import { type Rating, type InsertRating } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createRating(rating: InsertRating): Promise<Rating>;
  getRatings(): Promise<Rating[]>;
}

export class MemStorage implements IStorage {
  private ratings: Map<string, Rating>;

  constructor() {
    this.ratings = new Map();
  }

  async createRating(insertRating: InsertRating): Promise<Rating> {
    const id = randomUUID();
    const rating: Rating = { 
      ...insertRating, 
      id, 
      createdAt: new Date() 
    };
    this.ratings.set(id, rating);
    return rating;
  }

  async getRatings(): Promise<Rating[]> {
    return Array.from(this.ratings.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
