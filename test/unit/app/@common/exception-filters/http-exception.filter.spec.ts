import {
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { HttpExceptionFilter } from '@app/@common/exception-filters/http-exception.filter';
import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';

const mockAppLoggerService = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
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
};

describe('HttpExceptionFilter', () => {
  let service: HttpExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpExceptionFilter,
        {
          provide: Logger,
          useValue: mockAppLoggerService,
        },
      ],
    }).compile();
    service = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  describe('All exception filter tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should call global HttpExceptionFilter, expected status code 404', () => {
      const mockHttpException = new HttpException(
        { message: 'Sample Exception' },
        HttpStatus.NOT_FOUND,
      );
      service.catch(mockHttpException, mockArgumentsHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(2);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(HttpStatus.NOT_FOUND);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        code: 404,
        error: 'Sample Exception',
        message: 'Internal error.',
        details: [],
      });
    });

    it('should call global HttpExceptionFilter, expected status 400 and status code 1000', () => {
      const mockHttpException = new HttpException(
        { message: 'Sample Exception' },
        Code.ENTITY_NOT_FOUND_ERROR.code,
      );
      service.catch(mockHttpException, mockArgumentsHost);

      expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toBeCalledWith({
        code: Code.ENTITY_NOT_FOUND_ERROR.code,
        error: 'Sample Exception',
        message: 'Internal error.',
        details: [],
      });
    });

    it('should call global HttpExceptionFilter with UnauthorizedException', () => {
      const mockHttpException = new UnauthorizedException({
        message: 'Sample Exception',
      });
      service.catch(mockHttpException, mockArgumentsHost);

      expect(mockStatus).toBeCalledWith(HttpStatus.UNAUTHORIZED);
      expect(mockJson).toBeCalledWith({
        code: 401,
        error: 'Unauthorized error.',
        message: 'Internal error.',
        details: [],
      });
    });

    it('should call global HttpExceptionFilter with Exception', () => {
      const mockHttpException = Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Bad Request Exception.',
      });
      service.catch(mockHttpException, mockArgumentsHost);

      expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toBeCalledWith({
        code: 400,
        error: 'BAD_REQUEST_ERROR',
        message: 'Bad Request Exception.',
        details: [],
      });
    });
  });
});
