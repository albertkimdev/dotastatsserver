import { Resolver, Query, Arg } from "type-graphql";
import { BoxScore } from "../../entity/BoxScore";
import { StatsByFilterInput } from "./statsByFilter/StatsByFilterInput";

@Resolver()
export class StatsByFilterResolver {
  @Query(() => [BoxScore], { nullable: true })
  async statsByFilter(@Arg("data")
  {
    tourn_ids,
    filters
  }: StatsByFilterInput): Promise<BoxScore[] | null> {
    console.log(tourn_ids);
    console.log(filters);

    // time to start building this bad ass motha fucka
    // do typeorm query builder n shit
    // with those psql commands and get input
    // and build sql queries

    return null;
  }
}
