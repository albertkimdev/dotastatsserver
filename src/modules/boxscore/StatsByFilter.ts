import { Resolver, Query, Arg } from "type-graphql";
import { getConnection } from "typeorm";
import { StatsByFilterInput } from "./statsByFilter/StatsByFilterInput";
import { StatsResultReturn } from "../../types/Stats";

@Resolver()
export class StatsByFilterResolver {
  @Query(() => StatsResultReturn, { nullable: true })
  async statsByFilter(@Arg("data")
  {
    tourn_ids,
    avgOptions,
    totalOptions,
    limit,
    minGames
  }: StatsByFilterInput): Promise<StatsResultReturn | null> {
    /**
     * Get all boxscores
     * with stats by filter
     * From boxscores
     * with those tournament ids
     */

    try {
      const avgScores = avgOptions.map((avg) => {
        return getConnection().manager.query(`
          SELECT name, avg(${avg}) as average, count(*) as games_played from BoxScores
          ${tourn_ids
            .map((id, i) => {
              if (i === 0) {
                return `WHERE tourn_id = '${id}'`;
              }
              return ` OR tourn_id = '${id}'`;
            })
            .join(" ")}
          GROUP BY name
          HAVING count(*) >= ${minGames}
          ORDER BY average DESC
          LIMIT ${limit}
        `);
      });

      const totalScores = totalOptions.map((total) => {
        return getConnection().manager.query(`
          SELECT name, ${total} as total from BoxScores
          ${tourn_ids
            .map((id, i) => {
              if (i === 0) {
                return `WHERE tourn_id = '${id}'`;
              }
              return ` OR tourn_id = '${id}'`;
            })
            .join(" ")}
          ORDER BY total DESC NULLS LAST
          LIMIT ${limit}
        `);
      });

      const avgResults = await Promise.all(avgScores);
      const totalResults = await Promise.all(totalScores);

      const avgReturn = avgResults.map((avg, i) => {
        return {
          name: avgOptions[i],
          scores: avg
        };
      });

      const totalReturn = totalResults.map((total, i) => {
        return {
          name: totalOptions[i],
          scores: total
        };
      });

      return {
        average: avgReturn,
        total: totalReturn
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

// SELECT name, avg(${avg}) as average, count(*) as games_played from BoxScores
// ${tourn_ids
//   .map((id, i) => {
//     if (i === 0) {
//       return `WHERE tourn_id = '${id}'`;
//     }
//     return ` OR tourn_id = '${id}'`;
//   })
//   .join(" ")}
// GROUP BY name
// ORDER BY average DESC
// LIMIT ${limit}

// SELECT name, ${total} from BoxScores
// ${tourn_ids
//   .map((id, i) => {
//     if (i === 0) {
//       return `WHERE tourn_id = '${id}'`;
//     }
//     return ` OR tourn_id = '${id}'`;
//   })
//   .join(" ")}
// ORDER BY ${total} DESC
// LIMIT ${limit}
