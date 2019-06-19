import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { formatArgumentValidationError } from "type-graphql";
import session from "express-session";
import connectRedis from "connect-redis";

import { redis } from "./redis";
import cors from "cors";
import { createSchema } from "./utils/createSchema";
import { createTypeormConn } from "./utils/createTypeormConn";

const main = async () => {
  await createTypeormConn();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res }),
    introspection: process.env.NODE_ENV !== "production",
    playground: process.env.NODE_ENV !== "production"
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  /**
   *
   * 1. twitter
   * 2. backend automation !!11.
   *    - scraping scripts to db
   *    - twitter
   * 3. content
   *    - posting content via api bot
   * 4. buy tesla stock
   * 5. CICD integration!
   * 6. user auth oauth
   * 7. user custom stats
   * 8. social features
   * 9. analytics
   */

  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === "production"
          ? (process.env.PROD_ORIGIN as string)
          : (process.env.DEV_ORIGIN as string)
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: process.env.SESSION_SECRET as string, // @TODO move to .env
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ cors: false, app, path: "/" });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, async () => {
    console.log(`Server started on port: ${PORT}`);
  });
};

main();
