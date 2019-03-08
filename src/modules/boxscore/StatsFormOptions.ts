import { Resolver, Query } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class StatsFormOptionsResolver {
  @Query(() => String)
  async statsFormOptions() {
    // getting the DB fields of boxscore
    // that are queryable i guess

    getConnection()
      .getMetadata("BoxScore")
      .columns.forEach(col => {
        console.log(col.propertyName);
      });

    return "hey";
  }
}
