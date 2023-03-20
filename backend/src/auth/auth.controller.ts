import { Controller, Req, Res, Get, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { GitHubOauthGuard } from './guards/github-oauth-guard';
import { Request, Response } from 'express';
import User from 'src/users/user';
import { GoogleOauthGuard } from './guards/google-oauth-guard';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(GitHubOauthGuard)
  async gitHubAuth() {
    // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('github/callback')
  @UseGuards(GitHubOauthGuard)
  async gitHubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as User;

    const test = await this.authService.getAccessToken(user);
    res.redirect(
      `${this.configService.get<EnvironmentVariables>('FRONTEND_ORIGIN', {
        infer: true,
      })}/login?accessToken=${test.token}`,
    );
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const test = await this.authService.getAccessToken(req.user as User);

    res.redirect(
      `${this.configService.get<EnvironmentVariables>('FRONTEND_ORIGIN', {
        infer: true,
      })}/login?accessToken=${test.token}`,
    );
  }
}
