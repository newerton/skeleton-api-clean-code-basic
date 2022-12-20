import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { HttpLoggingInterceptor } from '@app/@common/interceptors/http-logging.interceptor';

const mockAppLoggerService = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  log: jest.fn(),
};
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetRequest = jest.fn().mockImplementation(() => ({
  method: 'GET',
  path: '/',
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getRequest: mockGetRequest,
  getResponse: mockGetResponse,
}));
const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
  getClass: jest.fn(),
  getHandler: jest.fn(),
};

const mockHandle = jest.fn().mockImplementation(() => ({
  pipe: jest.fn(),
}));
const mockCallHandler = {
  handle: mockHandle,
};

describe('HttpLoggingInterceptor', () => {
  let service: HttpLoggingInterceptor;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpLoggingInterceptor,
        {
          provide: Logger,
          useValue: mockAppLoggerService,
        },
      ],
    }).compile();
    service = module.get<HttpLoggingInterceptor>(HttpLoggingInterceptor);
  });

  describe('All exception filter tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should call global HttpLoggingInterceptor', () => {
      service.intercept(mockArgumentsHost, mockCallHandler);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetRequest).toBeCalledTimes(1);
      expect(mockGetRequest).toBeCalledWith();
    });
  });
});
