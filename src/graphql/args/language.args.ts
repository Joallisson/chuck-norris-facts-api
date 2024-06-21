import { ArgsType, Field } from "@nestjs/graphql";
import { LanguageInput } from "../input/language.input";

@ArgsType()
export class LanguageArgs{
    @Field()
    data: LanguageInput
}