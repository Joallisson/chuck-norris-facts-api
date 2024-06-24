import { ArgsType, Field } from "@nestjs/graphql";
import { JokeInput } from "../input/language.input";

@ArgsType()
export class JokeArgs{
    @Field()
    data: JokeInput
}