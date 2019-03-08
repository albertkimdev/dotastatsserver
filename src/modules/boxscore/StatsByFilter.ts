import { Resolver, Query, Arg } from "type-graphql";
import { BoxScore } from "../../entity/BoxScore";
import { StatsByFilterInput } from "./statsByFilter/StatsByFilterInput";
// import { getConnection } from "typeorm";

@Resolver()
export class StatsByFilterResolver {
  @Query(() => [BoxScore], { nullable: true })
  async statsByFilter(@Arg("data")
  {
    tourn_ids,
    avgOptions,
    totalOptions
  }: StatsByFilterInput): Promise<BoxScore[] | null> {
    console.log(tourn_ids);
    console.log(avgOptions);
    console.log(totalOptions);
    return null;
    /**
     * Get all boxscores
     * with stats by filter
     * From boxscores
     * with those tournament ids
     */
    // let scoresQb = getConnection()
    //   .getRepository(BoxScore)
    //   .createQueryBuilder("b")
    //   .select(["b.name", "b.kills"]); // make dynamic

    // // Tournament ids where builder
    // tourn_ids.forEach((tid, i) => {
    //   scoresQb = scoresQb.orWhere(`b.tourn_id = :tid${i}`, {
    //     [`tid${i}`]: tid
    //   });
    // });

    // // scoresQb = scoresQb.groupBy("b.name");

    // scoresQb = scoresQb.orderBy("b.kills", "DESC");

    // // select name, avg(deaths), count(*) as games_played as avg_deaths from boxscores
    // // GROUP BY name
    // // ORDER BY avg_deaths ASC
    // // LIMIT 25;

    // return scoresQb.limit(15).getMany();
  }
}
