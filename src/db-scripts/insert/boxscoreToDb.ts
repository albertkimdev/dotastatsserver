import "reflect-metadata";
import { createConnection } from "typeorm";
import { Tournament } from "../../entity/Tournament";
import { matchDetail } from "../opendota/matchDetail";
import { delay } from "./tournToDb";
import { BoxScore } from "../../entity/BoxScore";

// select name, avg(deaths), count(*) as games_played as avg_deaths from boxscores
// GROUP BY name
// ORDER BY avg_deaths ASC
// LIMIT 25;

// /*197, 268, 500 - 310 rows ms*/

const getMatchIdsFromTournament = async () => {
  await createConnection();

  // manually update each tournament index
  // and save all box scores in db
  // for each tournament match id
  const index = 17;

  const tournaments = await Tournament.find();

  const tournament = tournaments[index];
  const matches = tournament.match_ids;

  // each of these matches needs to be added to db
  // multiple per tournament

  const getScoreFromOd = matches.map(
    (match: number, i: number) =>
      new Promise(async (resolve, reject) => {
        try {
          await delay(4000 * i);
          const score: any = await matchDetail(match);

          // score is 10 box scores,
          // have to create 10 instances in db

          const scoresToSave = score.map((s: any) => {
            s.max_hero_hit = s.max_hero_hit.value;
            return BoxScore.create({
              tourn_id: tournament.id,
              ...s
            }).save();
          });

          await Promise.all(scoresToSave);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      })
  );

  await Promise.all(getScoreFromOd);
};

const doit = () => {
  getMatchIdsFromTournament();
};

doit();
