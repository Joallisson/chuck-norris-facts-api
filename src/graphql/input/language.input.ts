import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class JokeInput{
    @Field()
    targetLang: string

    @Field({ nullable: true })
    category?: string
}