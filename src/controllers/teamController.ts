import { Request, Response } from "express";
import { Team } from "../models/TeamsModel";
import { Driver } from "../models/DriversModel";
import { getFlagUrl } from "../utils/helpers";

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().lean();
    const drivers = await Driver.find().lean();

    const teamWithDriverDetails = teams.map((team) => {
      return {
        ...team,
        drivers: team.drivers.map((_) => {
          const driverObject = drivers.find(
            (driver) => driver.driver_id === driver.driver_id
          );
          return {
            ...driverObject,
            flag: getFlagUrl(driverObject!.countryCode),
          };
        }),
      };
    });

    res.status(200).json(teamWithDriverDetails);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
