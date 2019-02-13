import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("tournaments")
export class Tournament extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  date: string;

  @Field(() => [Int])
  @Column("simple-array", { nullable: true })
  match_ids: number[];
}
