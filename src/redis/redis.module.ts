import { Module, Global } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Global() 
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT', 
      useFactory: async () => {
        const client = createClient({
          username: '',
          password: '',
          socket: {
            host: '',
            port:0 ,
          },
        });

        client.on('error', (err) => {
          console.log('Redis Client Error', err);
        });


        await client.connect();

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'], 
})
export class RedisModule {}
