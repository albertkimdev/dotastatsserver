import "reflect-metadata";
import { Tournament } from "../../entity/Tournament";
import { matchDetail } from "../opendota/matchDetail";
import { BoxScore } from "../../entity/BoxScore";
import { createTypeormConn } from "../../utils/createTypeormConn";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// select name, avg(deaths), count(*) as games_played as avg_deaths from boxscores
// GROUP BY name
// ORDER BY avg_deaths ASC
// LIMIT 25;

// /*197, 268, 500 - 310 rows ms*/

const getMatchIdsFromTournament = async () => {
  await createTypeormConn();
  // manually update each tournament index
  // and save all box scores in db
  // for each tournament match id
  const tournaments = await Tournament.find();

  for (var z = 0; z < tournaments.length; z++) {
    // @ts-ignore
    const tournament = tournaments[z];
    const matches = tournament.match_ids;

    // each of these matches needs to be added to db
    // multiple per tournament

    const getScoreFromOd = matches.map(
      (match: number, i: number) =>
        new Promise(async (resolve, reject) => {
          try {
            await delay(10000 * i);
            const score: any = await matchDetail(match);

            // score is 10 box scores,
            // have to create 10 instances in db

            const scoresToSave = score.map((s: any) => {
              if (!s.max_hero_hit) {
                s.max_hero_hit = null;
              } else {
                s.max_hero_hit = s.max_hero_hit.value;
              }
              return BoxScore.create({
                // @ts-ignore
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
    // @ts-ignore
    console.log(tournament.name);
    await delay(10000 * z);
  }
};

getMatchIdsFromTournament();
