import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-google-oauth2';
import UsersService from 'src/users/users.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    readonly configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get<EnvironmentVariables>(
        'GOOGLE_OAUTH_CLIENT_ID',
        {
          infer: true,
        },
      ),
      clientSecret: configService.get<EnvironmentVariables>(
        'GOOGLE_OAUTH_CLIENT_SECRET',
        {
          infer: true,
        },
      ),
      callbackURL: configService.get<EnvironmentVariables>(
        'GOOGLE_OAUTH_CALLBACK_URL',
        {
          infer: true,
        },
      ),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    console.log('profile', profile);

    if (!name || !emails) {
      throw new UnauthorizedException();
    }

    const email = emails[0].value;

    const user = await this.usersService.findOrCreate(
      id,
      'google',
      `${name.givenName} ${name.familyName}`,
      email,
    );
    if (!user) {
      // TODO Depending on the concrete implementation of findOrCreate(), throwing the
      // UnauthorizedException here might not make sense...
      throw new UnauthorizedException();
    }
    return user;
  }
}
