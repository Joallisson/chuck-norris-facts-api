import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LanguageInput{
    @Field()
    targetLang: string
}