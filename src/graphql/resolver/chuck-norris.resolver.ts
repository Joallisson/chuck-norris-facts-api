import { Args, Query, Resolver } from "@nestjs/graphql";
import { JokeObject } from "../objetcs/joke.object";
import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import * as deepl from 'deepl-node';
import { JokeInterface } from "../objetcs/joke.interface";
import { JokeArgs } from "../args/joke.args";

type PropsType = {
    jokeText: string
    targetLang?: string
}


@Injectable()
@Resolver()
export class ChuckNorrisResolver{

    private readonly logger = new Logger();

    constructor(private readonly httpService: HttpService) {}

    @Query(() => JokeObject)
    async jokeRandom(@Args() { data }: JokeArgs): Promise<JokeObject> {
        return await this.getJoke(data.targetLang, data.category)
    }

    async getJoke(@Args() targetLang?: string, category?: string): Promise<JokeObject> {
        const { data } = await firstValueFrom(
            this.httpService.get<JokeInterface>(`https://api.chucknorris.io/jokes/random${ category ? '?category=' + category : ''}`).pipe(
              catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
              }),
            ),
          );

          if(targetLang != 'en'){
            const jokeTranslated = await this.translateJoke({
              jokeText: data.value,
              targetLang
            })
  
            return new JokeObject({...data, value: jokeTranslated.toString()});
          }

          return new JokeObject(data)
    }

    async translateJoke({jokeText, targetLang = 'pt-BR'}: PropsType): Promise<String> {
        //return "Quando Chuck Norris olha para o sol, o sol pisca."

        try {
            const authKey = process.env.DEEPL_KEY;
            const translator = new deepl.Translator(authKey);

            const result = await translator.translateText(jokeText, 'en', targetLang as any);
            console.log(result.text)
            return result.text  
            
        } catch (error) {
            console.error('Error translating text:', error);
            return "Translation error";
        }
    }





    @Query(() => [String])
    async getCategories(): Promise<string[]>{

        return await this.getAllCategories();
    }

    async getAllCategories(): Promise<string[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<string[]>('https://api.chucknorris.io/jokes/categories').pipe(
              catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
              }),
            ),
          );

        return data
    }
}