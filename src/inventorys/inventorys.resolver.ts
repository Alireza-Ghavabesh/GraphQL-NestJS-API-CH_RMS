import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InventorysService } from './inventorys.service';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';

@Resolver(() => Inventory)
export class InventorysResolver {
  constructor(private readonly inventorysService: InventorysService) {}

  @Mutation(() => Inventory)
  createInventory(@Args('createInventoryInput') createInventoryInput: CreateInventoryInput) {
    return this.inventorysService.create(createInventoryInput);
  }

  @Query(() => [Inventory], { name: 'inventorys' })
  findAll() {
    return this.inventorysService.findAll();
  }

  @Query(() => Inventory, { name: 'inventory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.inventorysService.findOne(id);
  }

  @Mutation(() => Inventory)
  updateInventory(@Args('updateInventoryInput') updateInventoryInput: UpdateInventoryInput) {
    return this.inventorysService.update(updateInventoryInput);
  }

  @Mutation(() => Inventory)
  removeInventory(@Args('id', { type: () => Int }) id: number) {
    return this.inventorysService.remove(id);
  }
}
