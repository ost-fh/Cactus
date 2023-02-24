import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LibraryService } from 'src/libraries/libraries.service';
import { LibraryDocument } from 'src/libraries/models/library.schema';
import CreateTestDto from './create-test.dto';
import UsersService from 'src/users/users.service';
import { ScoringService } from './scoring.service';

@Injectable()
export class TestsService {
  constructor(
    private readonly libraryService: LibraryService,
    private readonly usersService: UsersService,
    private readonly scoringService: ScoringService,
  ) {}

  async create(dto: CreateTestDto, userId: string): Promise<LibraryDocument> {
    const criteria = dto.criteria.map((item: any) => {
      return {
        criterium_id: item._id,
        text: item.text,
        help: item.help,
        choice: item.choice,
        comment: item.comment,
      };
    });

    const library = await this.libraryService.findOne(dto.testData.libraryId);

    if (!library) {
      throw new HttpException('Library not found', HttpStatus.NOT_FOUND);
    }

    /*
    if (
      library.versions.length === 0 ||
      !library.versions.find(
        (item) => item.version === dto.testData.libraryVersion,
      )
    ) {
      library.versions.push({
        version: dto.testData.libraryVersion,
        components: [],
      });
    }
    */

    const version = library.versions.find(
      (item) => item.version === dto.testData.libraryVersion,
    );

    if (!version) {
      throw new HttpException(
        'Library version not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      version.components.length === 0 ||
      !version.components.find((item) => item.name === dto.testData.component)
    ) {
      version.components.push({
        name: dto.testData.component,
        alternativeComponentNames: dto.testData.alternativeComponentNames,
        modes: [],
      });
    }

    const component = version.components.find(
      (item) => item.name === dto.testData.component,
    );

    if (!component) {
      throw new HttpException(
        'Library component not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      component.modes.length === 0 ||
      !component.modes.find((item) => item.name === dto.testData.testMode)
    ) {
      component.modes.push({
        name: dto.testData.testMode,
        tests: [],
      });
    }

    const mode = component.modes.find(
      (item) => item.name === dto.testData.testMode,
    );

    if (mode) {
      const userdata = await this.usersService.findById(userId);
      mode.tests.push({
        testedBy: userdata!.username,
        criteria: criteria,
        userBrowser: dto.testData.userBrowser,
        userOs: dto.testData.userOs,
      });
    }

    await library.save();
    console.log(
      `POST testlab: added tests to library ${library.title} - ${library._id}`,
    );

    return this.scoringService.scoreLibrary(dto.testData.libraryId);
  }
}
