import { HttpService } from "@nestjs/axios";
import { JokeObject } from "../objetcs/joke.object";
import { catchError, firstValueFrom } from "rxjs";
import { JokeInterface } from "../objetcs/joke.interface";
import { AxiosError } from "axios";
import { Logger } from "@nestjs/common";
import { TranslatorFactsService } from "./translator-facts.service";

export class ApiChuckNorrisFactsService{

    private readonly logger = new Logger();
    private readonly httpService = new HttpService();
    private readonly translatorService = new TranslatorFactsService();

    async getJoke(targetLang?: string, category?: string): Promise<JokeObject> {
        const { data } = await firstValueFrom(
            this.httpService.get<JokeInterface>(`https://api.chucknorris.io/jokes/random${ category ? '?category=' + category : ''}`).pipe(
              catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
              }),
            ),
          );

          if(targetLang != 'en'){
            const jokeTranslated = await this.translatorService.translateJoke({
              jokeText: data.value,
              targetLang
            })
  
            return new JokeObject({...data, value: jokeTranslated.toString()});
          }

          return new JokeObject(data)
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