import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LibraryService } from 'src/libraries/libraries.service';
import { LibraryDocument } from 'src/common/models/library.schema';
import CreateTestDto from './create-test.dto';
import { ScoringService } from './scoring.service';
import { InjectModel } from '@nestjs/mongoose';
import TestResult, {
  TestResultDocument,
} from 'src/common/models/test-result.schema';
import { Model } from 'mongoose';
import TestFeedback, {
  TestFeedbackDocument,
} from 'src/common/models/test-feedback.schema';
import CreateTestFeedbackDto from './create-test-feedback.dto';

@Injectable()
export class TestsService {
  constructor(
    private readonly libraryService: LibraryService,
    private readonly scoringService: ScoringService,
    @InjectModel(TestResult.name)
    private testResultModel: Model<TestResultDocument>,
    @InjectModel(TestFeedback.name)
    private testFeedbackModel: Model<TestFeedbackDocument>,
  ) {}

  async createOrUpdate(
    dto: CreateTestDto,
    userId: string,
  ): Promise<LibraryDocument> {
    const criteria = dto.criteria.map((item: any) => {
      return {
        criterium_id: item._id,
        title: item.text,
        help: item.help,
        choice: item.choice,
        comment: item.comment,
      };
    });

    const library = await this.libraryService.findOne(
      dto.testData.libraryId,
      true,
    );

    if (!library) {
      throw new HttpException('Library not found', HttpStatus.NOT_FOUND);
    }

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
        exists: dto.testData.componentExists,
        linkDocs: dto.testData.componentLinkDocs,
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

    // update values
    component.linkDocs = dto.testData.componentLinkDocs;
    component.exists = dto.testData.componentExists;

    if (!dto.testData.componentExists) {
      await library.save();
      return library;
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

    if (!mode) {
      throw new HttpException('Test mode not found', HttpStatus.NOT_FOUND);
    }

    const index = mode.tests.findIndex((t) => t.testedBy === userId);
    if (index > -1) {
      const oldTest = mode.tests[index];
      mode.tests.splice(index, 1);
      await this.testResultModel.findByIdAndRemove(oldTest.id).exec();
    }

    const createdTestResult = new this.testResultModel({
      testedBy: userId,
      criteria: criteria,
      userBrowser: dto.testData.userBrowser,
      userOs: dto.testData.userOs,
      testMode: mode,
    });
    mode.tests.push(createdTestResult);

    await createdTestResult.save();
    await library.save();

    console.log(
      `POST testlab: added tests to library ${library.title} - ${library._id}`,
    );

    return this.scoringService.scoreLibrary(dto.testData.libraryId);
  }

  async findAllOwn(userId: string): Promise<TestResult[]> {
    return this.testResultModel.find({ testedBy: userId }).exec();
  }

  async createTestFeedback(
    dto: CreateTestFeedbackDto,
    userId: string,
  ): Promise<TestFeedback> {
    const createdTestFeedback = new this.testFeedbackModel({
      testedBy: userId,
      component: dto.testData.component,
      testMode: dto.testData.testMode,
      userOs: dto.testData.userOs,
      userBrowser: dto.testData.userBrowser,
      feedback: dto.feedback,
    });
    createdTestFeedback.save();
    return createdTestFeedback;
  }
}
