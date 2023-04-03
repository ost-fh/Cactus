import { Test, TestingModule } from '@nestjs/testing';
import { LibraryDocument } from 'src/libraries/models/library.schema';
import { testLibrary } from '../../test/testlibrary-unscored';
import { ScoringService } from './scoring.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { LibraryService } from 'src/libraries/libraries.service';
import { ComponentsService } from 'src/components/components.service';
const moduleMocker = new ModuleMocker(global);

describe('ScoringService', () => {
  let service: ScoringService;
  let componentsService: ComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoringService],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === LibraryService) {
          return { findOne: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<ScoringService>(ScoringService);
    componentsService = module.get<ComponentsService>(ComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should score library correctly', () => {
    const library: LibraryDocument = testLibrary as any as LibraryDocument;
    jest.spyOn(componentsService, 'findOne').mockImplementation((n: string) => {
      return {
        name: n,
        description: 'This is a component',
        imageUrl: '/image.png',
        testModes: [
          { testMode: '1', criteria: [] },
          { testMode: '2', criteria: [] },
        ],
      };
    });
    service.runScoring(library);
    expect(library.versions[0].accessibilityScore).toEqual(62.5);
    expect(library.versions[0].agreementScore).toEqual(0.8333333333333334);
  });
});
