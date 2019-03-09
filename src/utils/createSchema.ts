import { buildSchema } from "type-graphql";
import { StatsByFilterResolver } from "../modules/boxscore/StatsByFilter";
import { TournamentFormOptionsResolver } from "../modules/tournament/TournamentFormOptions";

export const createSchema = async () => {
  try {
    const schema = await buildSchema({
      resolvers: [StatsByFilterResolver, TournamentFormOptionsResolver],
      authChecker: ({ context: { req } }) => {
        return !!req.session.userId;
      },
      validate: false
    });
    return schema;
  } catch (err) {
    console.error(err);
    return err;
  }
};
