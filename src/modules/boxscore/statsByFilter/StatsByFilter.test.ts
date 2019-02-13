import { Connection, createConnection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";

let conn: Connection;

beforeAll(async () => {
  conn = await createConnection();
});
afterAll(async () => {
  await conn.close();
});

const statsByFilterQuery = `
  query StatsByFilter($data: StatsByFilterInput!) {
    statsByFilter(
      data: $data
    ) {
      kills
      deaths
      assists
      name
    }
  }
`;

describe("Stats By Filter", () => {
  it("accepts inputs", async () => {
    const data = {
      tourn_ids: [
        "b620b32f-1261-451d-88c2-758e0df74d31",
        "2f9d7cd8-b892-4b88-960f-5d2a760e01cb"
      ],
      filters: ["total_kills", "total_deaths", "total_assists"]
    };

    const res = await gCall({
      source: statsByFilterQuery,
      variableValues: {
        data
      }
    });

    expect(res).toBeNull();
  });
});
