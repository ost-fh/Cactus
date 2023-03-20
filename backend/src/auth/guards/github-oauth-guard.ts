import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GitHubOauthGuard extends AuthGuard('github') {}
