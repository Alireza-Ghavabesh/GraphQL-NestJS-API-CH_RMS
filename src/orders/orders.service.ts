import { Order } from './entities/order.entity';
import { Food } from './../foods/entities/food.entity';
import { Connection, getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    private connection: Connection
  ){}

  async create(createOrderInput: CreateOrderInput) {
    const getRepositoryFood = getRepository(Food);
    const getRepositoryOrder = getRepository(Order);
    //================================ with transaction ===========================================
    console.log("(with transaction) Inserting a new order with its own foods into database.");
    const t1 = Date.now()
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const NewTempOrder = new Order();
      NewTempOrder.name = createOrderInput.name;
      NewTempOrder.date = createOrderInput.date;
      NewTempOrder.time = createOrderInput.time;
      const listTempFoods = [];
      for (const eachFoodFromGraphQl of createOrderInput.foods) {
        const NewTempFood = new Food();
        NewTempFood.name = eachFoodFromGraphQl.name;
        NewTempFood.price = eachFoodFromGraphQl.price;
        NewTempFood.is_subsidy = eachFoodFromGraphQl.is_subsidy;
        NewTempFood.subsidy_price = eachFoodFromGraphQl.subsidy_price;
        await queryRunner.manager.save(NewTempFood);
        listTempFoods.push(NewTempFood);
      }
      NewTempOrder.foods = listTempFoods;
      await queryRunner.manager.save(NewTempOrder);
      await queryRunner.commitTransaction();
      const t2 = Date.now()
      const delta_time = (t2-t1) / 1000;
      console.log(`=========== inserted after ${delta_time} sec ===============`);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
    //================================= without transaction =======================================
    // console.log("(without transaction) Inserting a new order with its own foods into database.");
    // const t1 = Date.now()
    // const NewTempOrder = new Order();
    // NewTempOrder.name = createOrderInput.name;
    // NewTempOrder.date = createOrderInput.date;
    // NewTempOrder.time = createOrderInput.time;
    // const listTempFoods = [];
    // for (const eachFoodFromGraphQl of createOrderInput.foods) {
    //   const NewTempFood = new Food();
    //   NewTempFood.name = eachFoodFromGraphQl.name;
    //   NewTempFood.price = eachFoodFromGraphQl.price;
    //   NewTempFood.is_subsidy = eachFoodFromGraphQl.is_subsidy;
    //   NewTempFood.subsidy_price = eachFoodFromGraphQl.subsidy_price;
    //   listTempFoods.push(NewTempFood);
    //   await getRepositoryFood.save(NewTempFood);
    // }
    // NewTempOrder.foods = listTempFoods;
    // const resultAfterSaveNewOrder = await getRepositoryOrder.save(NewTempOrder);
    // const t2 = Date.now()
    // const delta_time = (t2-t1) / 1000;
    // console.log(`=========== inserted after ${delta_time} sec ===============`);
    // return resultAfterSaveNewOrder;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
