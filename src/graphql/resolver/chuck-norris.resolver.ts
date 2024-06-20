import { Query, Resolver } from "@nestjs/graphql";
import { JokeObject } from "../objetcs/joke.object";
import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import * as deepl from 'deepl-node';
import { JokeInterface } from "../objetcs/joke.interface";

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
    async jokeRandom(targetLang?: string){
        return await this.getJoke(targetLang)
    }

    async getJoke(targetLang?: string): Promise<JokeObject> {
        const { data } = await firstValueFrom(
            this.httpService.get<JokeInterface>('https://api.chucknorris.io/jokes/random').pipe(
              catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
              }),
            ),
          );

        const jokeTranslated = await this.translateJoke({
            jokeText: data.value,
            targetLang
        })

        return new JokeObject({...data, value: jokeTranslated.toString()});
        
    }

    async translateJoke({jokeText, targetLang = 'pt-BR'}: PropsType): Promise<String> {
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
}