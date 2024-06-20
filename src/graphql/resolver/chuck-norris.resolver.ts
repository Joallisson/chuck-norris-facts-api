import { Query, Resolver } from "@nestjs/graphql";
import { JokeObject } from "../objetcs/joke.object";
import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosError, AxiosResponse } from "axios";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
@Resolver()
export class ChuckNorrisResolver{

    private readonly logger = new Logger();
    constructor(private readonly httpService: HttpService) {}

    @Query(() => JokeObject)
    async jokeRandom(){
        return await this.getJoke()
    }

    async getJoke(): Promise<JokeObject> {
        const { data } = await firstValueFrom(
            this.httpService.get<any>('https://api.chucknorris.io/jokes/random').pipe(
              catchError((error: AxiosError) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
              }),
            ),
          );
        
        return new JokeObject(data);
      }
}