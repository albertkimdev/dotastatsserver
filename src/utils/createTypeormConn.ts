import { getConnectionOptions, createConnection } from "typeorm";
import { User } from "../entity/User";
import { BoxScore } from "../entity/BoxScore";
import { Tournament } from "../entity/Tournament";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  return process.env.NODE_ENV === "production"
    ? createConnection({
      ...connectionOptions,
      entities: [User, BoxScore, Tournament],
      name: "default",
      host: process.env.DATABASE_URL as string,
      database: process.env.DATABASE_NAME as string,
      username: process.env.TYPEORM_USERNAME as string,
      password: process.env.TYPEORM_PASSWORD as string,
      ssl: true
    } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
