import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from './controller/user.controller';
import { JwtGuard } from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';
import { UserModel } from './model/user.model';
import { JwtStrategy } from './service/jwt.strategy';
import { LocalStrategy } from './service/local.strategy';
import { UserService } from './service/user.service';

@Module({
  imports: [
    TypegooseModule.forFeature([ UserModel ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h', issuer: 'tracksplayer' },
        verifyOptions: { issuer: 'tracksplayer' },
      }),
      inject: [ ConfigService ],
      imports: [ ConfigModule ],
    }),
    PassportModule,
  ],
  providers: [ UserService, LocalStrategy, JwtStrategy, LocalGuard, JwtGuard ],
  controllers: [ UserController ],
})
export class UserModule {
}
