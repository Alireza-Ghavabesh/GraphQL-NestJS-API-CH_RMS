import { InventorysService } from './inventorys/inventorys.service';
import { FoodsService } from './foods/foods.service';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { FoodsModule } from './foods/foods.module';
import { InventorysModule } from './inventorys/inventorys.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import {join} from 'path'

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'rms.db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    OrdersModule, FoodsModule, InventorysModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
