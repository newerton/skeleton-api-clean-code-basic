import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { MainModule } from '../../src/main.module';

export class TestServer {
  constructor(
    public readonly serverApplication: NestExpressApplication,
    public readonly dataSource: DataSource,
    public readonly testingModule: TestingModule,
  ) {}

  public static async new(): Promise<TestServer> {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    const dataSource: DataSource = testingModule.get(DataSource);
    const serverApplication: NestExpressApplication =
      testingModule.createNestApplication();

    return new TestServer(serverApplication, dataSource, testingModule);
  }
}
