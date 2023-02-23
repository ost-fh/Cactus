import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    const accessTokenSecret = configService.get<EnvironmentVariables>(
      'ACCESS_TOKEN_SECRET',
      {
        infer: true,
      },
    );
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenSecret,
    });
  }

  async validate(payload: any) {
    // TODO define return
    return { userId: payload.sub, username: payload.username };
  }
}
