import { Injectable } from '@nestjs/common';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InventorysService {
  constructor(@InjectRepository(Inventory) private inventoryRepo: Repository<Inventory>) {}
  create(createInventoryInput: CreateInventoryInput) {
    const newInventory = this.inventoryRepo.create(createInventoryInput);
    return this.inventoryRepo.save(newInventory);
  }

  findAll() {
    return this.inventoryRepo.find();
  }

  async findOne(id: number) {
    return await this.inventoryRepo.findOne(id);
  }

  async update(updateInventoryInput: UpdateInventoryInput)
  {
    const foundInventory = await this.inventoryRepo.findOne(updateInventoryInput.id)
    if(updateInventoryInput.name){
      foundInventory.name = updateInventoryInput.name;
    }
    if(updateInventoryInput.price){
      foundInventory.price = updateInventoryInput.price;
    }
    return await this.inventoryRepo.save(foundInventory);
  }

  async remove(id: number) {
    const foundInventory = await this.inventoryRepo.findOne(id);
    return await this.inventoryRepo.remove(foundInventory);
  }
}
