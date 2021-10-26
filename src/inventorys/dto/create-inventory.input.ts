import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInventoryInput {
  @Field()
  name: string;

  @Field(type => Int)
  price: number;
}
