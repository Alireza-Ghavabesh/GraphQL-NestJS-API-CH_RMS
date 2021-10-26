import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodInput {
  @Field({nullable: true})
  name?: string;

  @Field((type) => Int)
  price?: number;

  @Field({nullable: true})
  is_subsidy?: string;

  @Field((type) => Int, {nullable: true})
  subsidy_price?: number;
}
