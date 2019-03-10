import { Tournament } from "../../entity/Tournament";
import { getTournamentInfo } from "../liquid/reqDpc1718";
import { getMatchIds } from "../liquid/puppeetMatchIds";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const addTournamentsToDb = async () => {
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
