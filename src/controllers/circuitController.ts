import { Request, Response } from "express";
import { Circuit } from "../models/CircuitModel";
export const getCircuits = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const circuits = await Circuit.find(
      search
        ? {
            name: { $regex: search, $options: "i" },
          }
        : {}
    ).lean();

    res.status(200).json(circuits);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
