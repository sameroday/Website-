import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRatingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/ratings - Submit a new rating
  app.post("/api/ratings", async (req, res) => {
    try {
      const validatedData = insertRatingSchema.parse(req.body);
      const rating = await storage.createRating(validatedData);
      res.json(rating);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // GET /api/ratings - Get all ratings
  app.get("/api/ratings", async (req, res) => {
    try {
      const ratings = await storage.getRatings();
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
