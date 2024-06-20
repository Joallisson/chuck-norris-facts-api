import { Field, ObjectType } from "@nestjs/graphql"
import { JokeInterface } from "./joke.interface"


@ObjectType()
export class JokeObject {
    @Field(() => [String])
    categories: string[]

    @Field()
    createdAt: string

    @Field()
    iconUrl: string

    @Field()
    id: string

    @Field()
    updatedAt: string

    @Field()
    url: string

    @Field()
    value: string

    constructor(props: JokeInterface){
        this.categories = props.categories
        this.createdAt = props.created_at
        this.iconUrl = props.icon_url
        this.id = props.id
        this.updatedAt = props.updated_at
        this.url = props.url
        this.value = props.value
    }
}

