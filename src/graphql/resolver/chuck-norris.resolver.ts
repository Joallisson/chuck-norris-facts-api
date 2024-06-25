import { Args, Query, Resolver } from "@nestjs/graphql";
import { JokeObject } from "../objetcs/joke.object";
import { Injectable } from "@nestjs/common";
import { JokeArgs } from "../args/joke.args";
import { ApiChuckNorrisFactsService } from "../services/api-chuck-norris-facts.service";

@Injectable()
@Resolver()
export class ChuckNorrisResolver{

    constructor(private readonly apiChuckNorrisService: ApiChuckNorrisFactsService) {}

    @Query(() => JokeObject)
    async jokeRandom(@Args() { data }: JokeArgs): Promise<JokeObject> {
        return await this.apiChuckNorrisService.getJoke(data.targetLang, data.category)
    }

    @Query(() => [String])
    async getCategories(): Promise<string[]>{

        return await this.apiChuckNorrisService.getAllCategories();
    }
}