import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { CreateFoodInput } from './../../foods/dto/create-food.input';
import { Food } from './../../foods/entities/food.entity';


@InputType()
export class CreateOrderInput implements Partial<Food>{
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  date?: string;

  @Field({ nullable: true})
  time?: string;

  @Field((type) => [CreateFoodInput], {nullable: true})
  foods: CreateFoodInput[]
}


