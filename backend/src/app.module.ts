import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { CoreModule } from './core/core.module';
import { PlaylistModule } from './playlist/playlist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }),
      inject: [ ConfigService ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
        PORT: Joi.number().default(9001),
        DB_URL: Joi.string().default('mongodb://localhost/tracksplayer'),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    UserModule,
    PlaylistModule,
    CoreModule,
  ],
})
export class AppModule {
}
