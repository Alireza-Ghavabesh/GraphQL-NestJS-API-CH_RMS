import { Food } from './../../foods/entities/food.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name?: string;
  
  @Field()
  @Column()
  date?: string;

  @Field()
  @Column()
  time?: string;
  
  @OneToMany((type) => Food, (food) => food.order)
  @Field(type => [Food], {nullable: true})
  foods?: Food[]
}
