import { Module } from '@nestjs/common';
import { InventorysService } from './inventorys.service';
import { InventorysResolver } from './inventorys.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Inventory} from './entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  providers: [InventorysResolver, InventorysService]
})
export class InventorysModule {}
