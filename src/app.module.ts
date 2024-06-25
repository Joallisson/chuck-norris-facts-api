import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChuckNorrisResolver } from './graphql/resolver/chuck-norris.resolver';
import { HttpModule } from '@nestjs/axios';
import { ApiChuckNorrisFactsService } from './graphql/services/api-chuck-norris-facts.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [ChuckNorrisResolver, ApiChuckNorrisFactsService],
})
export class AppModule {}
