import { InputType, Field } from "type-graphql";

@InputType()
export class StatsByFilterInput {
  @Field(() => [String])
  tourn_ids: string[];

  @Field(() => [String])
  avgOptions: string[];

  @Field(() => [String])
  totalOptions: string[];
}
