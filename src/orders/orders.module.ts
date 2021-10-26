import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { FoodsModule } from './../foods/foods.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), FoodsModule],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
