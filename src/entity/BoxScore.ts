import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("boxscores")
export class BoxScore extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "bigint" })
  match_id: number;

  @Field()
  @Column()
  tourn_id: string;

  @Field()
  @Column({ type: "bigint" })
  account_id: number;

  @Field()
  @Column()
  assists: number;

  @Field()
  @Column({ nullable: true })
  camps_stacked: number;

  @Field()
  @Column({ nullable: true })
  creeps_stacked: number;

  @Field()
  @Column()
  deaths: number;

  @Field()
  @Column()
  denies: number;

  @Field()
  @Column({ nullable: true })
  firstblood_claimed: number;

  @Field()
  @Column()
  gold: number;

  @Field()
  @Column()
  gold_per_min: number;

  @Field()
  @Column()
  gold_spent: number;

  @Field()
  @Column()
  hero_damage: number;

  @Field()
  @Column()
  hero_healing: number;

  @Field()
  @Column()
  hero_id: number;

  @Field()
  @Column()
  item_0: number;

  @Field()
  @Column()
  item_1: number;

  @Field()
  @Column()
  item_2: number;

  @Field()
  @Column()
  item_3: number;

  @Field()
  @Column()
  item_4: number;

  @Field()
  @Column()
  item_5: number;

  @Field()
  @Column({ nullable: true })
  kills: number;

  @Field()
  @Column({ nullable: true })
  last_hits: number;

  @Field()
  @Column({ nullable: true })
  level: number;

  @Field()
  @Column({ nullable: true })
  max_hero_hit: number;

  @Field()
  @Column({ nullable: true })
  obs_placed: number;

  @Field()
  @Column({ nullable: true })
  pings: number;

  @Field()
  @Column({ nullable: true })
  roshans_killed: number;

  @Field()
  @Column({ nullable: true })
  rune_pickups: number;

  @Field()
  @Column({ nullable: true })
  sens_placed: number;

  @Field()
  @Column({ type: "float", nullable: true })
  teamfight_participation: number;

  @Field()
  @Column({ nullable: true })
  tower_damage: number;

  @Field()
  @Column({ nullable: true })
  towers_killed: number;

  @Field()
  @Column({ nullable: true })
  xp_per_min: number;

  @Field()
  @Column({ nullable: true })
  personalname: string;

  @Field()
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column({ nullable: true })
  total_gold: number;

  @Field()
  @Column({ nullable: true })
  total_xp: number;

  @Field()
  @Column({ nullable: true })
  courier_kills: number;

  @Field()
  @Column({ nullable: true })
  observer_kills: number;

  @Field()
  @Column({ nullable: true })
  sentry_kills: number;

  @Field()
  @Column({ nullable: true })
  ancient_kills: number;

  @Field()
  @Column({ nullable: true })
  purchase_gem: number;
}

// assists
// camps_stacked
// creeps_stacked
// deaths
// denies
// firstblood_claimed
// gold
// gold_per_min
// gold_spent
// hero_damage
// hero_healing
// hero_id
// item_0
// item_1
// item_2
// item_3
// item_4
// item_5
// kills
// last_hits
// level
// max_hero_hit.value
// obs_placed
// pings
// roshans_killed
// rune_pickups
// sens_placed
// teamfight_participation
// tower_damage
// towers_killed
// xp_per_min
// personalname
// name
// total_gold
// total_xp
// courier_kills
// observer_kills
// sentry_kills
// ancient_kills
// purchase_gem
