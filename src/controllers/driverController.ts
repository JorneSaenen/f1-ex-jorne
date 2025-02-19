import { Request, Response } from "express";
import { Driver } from "../models/DriversModel";
import { getFlagUrl } from "../utils/helpers";

export const getDrivers = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const drivers = await Driver.find(
      search
        ? {
            familyName: { $regex: search, $options: "i" },
          }
        : {}
    ).lean();

    const driversWithFlag = drivers.map((driver) => {
      return {
        ...driver,
        flag: getFlagUrl(driver.countryCode),
      };
    });

    res.status(200).json(driversWithFlag);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
