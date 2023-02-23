import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import os from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hostname')
  @Get('host')
  getHostname(): string {
    return os.hostname();
  }
}
