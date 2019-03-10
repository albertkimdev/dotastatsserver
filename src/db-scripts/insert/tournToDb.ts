import "reflect-metadata";

import { getTournamentInfo } from "../liquid/dpc1718";
import { getMatchIds } from "../liquid/liquidMatchIds";
import { Tournament } from "../../entity/Tournament";
import { createTypeormConn } from "../../utils/createTypeormConn";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const addTournamentsToDb = async () => {
  await createTypeormConn();
  // 17-18 DPC season
  const tournInfo1718: any = await getTournamentInfo();
  // this provides name, date, link
  // Use link to get match ids

  const matchIdsAndSave = tournInfo1718.map(
    (tourn: any, i: number) =>
      new Promise(async (resolve, reject) => {
        try {
          console.log(tournInfo1718[i].name);
          await delay(8000 * i);
          const matchid: any = await getMatchIds(tournInfo1718[i].link);

          await Tournament.create({
            name: tourn.name,
            date: tourn.date,
            match_ids: matchid
          }).save();
          console.log(`${matchid.length} matches saved for ${tourn.name}`);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      })
  );

  await Promise.all(matchIdsAndSave);
};

const doit = () => {
  addTournamentsToDb();
};

doit();
