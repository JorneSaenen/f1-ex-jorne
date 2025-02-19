import { Request, Response } from "express";
import { Race } from "../models/RaceModel";
import { Driver } from "../models/DriversModel";
import { formatTime, getFlagUrl } from "../utils/helpers";

export const getRaces = async (req: Request, res: Response) => {
  try {
    const format = req.query.format;
    const races = await Race.find().lean();
    const drivers = await Driver.find().lean();

    const raceWithDriverDetails = races.map((race) => {
      return {
        ...race,
        race_results: race.race_results.map((raceResult) => {
          const driver = drivers.find(
            (driver) => driver.driver_id === raceResult.driver_id
          );

          return {
            ...raceResult,
            time:
              format === "true"
                ? formatTime(raceResult.time, raceResult.position)
                : raceResult.time,
            driver: {
              ...driver,
              flag: getFlagUrl(driver!.countryCode),
            },
          };
        }),
      };
    });

    res.status(200).json(raceWithDriverDetails);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
