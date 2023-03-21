import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import Component from './component.schema';
import * as fs from 'fs';

@Injectable()
export class ComponentsService {
  private components: Component[] = [];

  constructor() {
    const fullPath = join(__dirname);
    fs.readdir(fullPath, (error, files) => {
      if (error) console.log(error);
      files
        .filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'))
        .forEach((file) => {
          const component = yaml.load(
            readFileSync(join(__dirname, file), 'utf8'),
          ) as Component;
          const edited = {
            ...component,
            testModes: component.testModes.map((testMode) => {
              return {
                ...testMode,
                criteria: testMode.criteria.map((criterium) => {
                  return {
                    ...criterium,
                    _id: `${component.name
                      .toLowerCase()
                      .replace(' ', '')}-${testMode.testMode
                      .toLowerCase()
                      .replace(' ', '')}-${criterium._id}`,
                  };
                }),
              };
            }),
          };
          this.components.push(edited);
        });
    });
  }

  findAll(): Component[] {
    return this.components;
  }

  findOne(id: string): Component | undefined {
    return this.components.find(
      (c) => c.name.toLowerCase() === id.toLowerCase(),
    );
  }
}
