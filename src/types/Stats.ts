import { ObjectType, Field } from "type-graphql";

@ObjectType()
class TotalField {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  total: number;
}

@ObjectType()
class TotalClass {
  @Field({ nullable: true })
  name: string;
  @Field(() => [TotalField])
  scores: [TotalField];
}

@ObjectType()
class AverageField {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  average: string;
  @Field({ nullable: true })
  games_played: string;
}

@ObjectType()
class AverageClass {
  @Field({ nullable: true })
  name: string;
  @Field(() => [AverageField])
  scores: [AverageField];
}

@ObjectType()
export class StatsResultReturn {
  @Field(() => [AverageClass])
  average: AverageClass[];

  @Field(() => [TotalClass])
  total: TotalClass[];
}
