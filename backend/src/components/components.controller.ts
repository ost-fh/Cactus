import { Controller, Get } from '@nestjs/common';
import Component from './component.schema';
import { ComponentsService } from './components.service';

@Controller('api/components')
export class ComponentsController {
  constructor(private readonly componentService: ComponentsService) {}

  @Get()
  async findAll(): Promise<Component[]> {
    return this.componentService.findAll();
  }
}
