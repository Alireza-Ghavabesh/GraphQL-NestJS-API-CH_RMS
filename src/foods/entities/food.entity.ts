import { Order } from './../../orders/entities/order.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Food {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => Int)
  @Column()
  price: number;

  @Field()
  @Column()
  is_subsidy: string;

  @Field((type) => Int)
  @Column()
  subsidy_price: number;

  @ManyToOne((type) => Order, order => order.foods)
  @Field((type) => Order, { nullable: true })
  order: Order;
}
