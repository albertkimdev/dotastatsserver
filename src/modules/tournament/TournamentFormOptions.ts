import { Resolver, Query } from "type-graphql";
import { Tournament } from "../../entity/Tournament";

@Resolver()
export class TournamentFormOptionsResolver {
  @Query(() => [Tournament])
  async tournamentFormOptions(): Promise<Tournament[]> {
    return Tournament.find({
      select: ["name", "id", "date"]
    });
  }
}
