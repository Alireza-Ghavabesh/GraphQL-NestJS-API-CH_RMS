import { CreateInventoryInput } from './create-inventory.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryInput extends PartialType(CreateInventoryInput) {
  @Field(type => Int)
  id: number;
  
  @Field({nullable: true})
  name: string;

  @Field(type => Int, {nullable: true})
  price: number;
}
