import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PasswordService } from './services/password.service';
import { AuthController } from './auth.controller';
import { GitHubOauthStrategy } from './strategies/github-oauth.strategy';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security', {
          infer: true,
        });
        const accessTokenSecret = configService.get<EnvironmentVariables>(
          'ACCESS_TOKEN_SECRET',
          {
            infer: true,
          },
        );
        return {
          secret: accessTokenSecret,
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    PasswordService,
    LocalStrategy,
    JwtStrategy,
    GitHubOauthStrategy,
    GoogleOauthStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
