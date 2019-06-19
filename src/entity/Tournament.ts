import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("tournaments")
export class Tournament extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  season: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  match_ids: string[];
}
