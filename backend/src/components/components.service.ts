import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import Component from './component.schema';

const YAML_COMPONENTS_FILENAME = 'components.yml';

@Injectable()
export class ComponentsService {
  private components: Component[] = [];

  constructor() {
    const ymlFileContent = yaml.load(
      readFileSync(join(__dirname, YAML_COMPONENTS_FILENAME), 'utf8'),
    ) as Record<'components', Component[]>;
    this.components = ymlFileContent.components;
  }

  async findAll(): Promise<Component[]> {
    return this.components;
  }

  async findOne(id: string): Promise<Component | undefined> {
    return this.components.find((c) => c.component === id);
  }
}
