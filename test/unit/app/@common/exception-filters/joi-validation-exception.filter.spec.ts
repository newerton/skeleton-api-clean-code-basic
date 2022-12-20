import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { JoiValidationExceptionFilter } from '@app/@common/exception-filters/joi-validation-exception.filter';
import {
  JoiValidationException,
  ValidationType,
} from '@app/@common/pipes/joi-validation.pipe';

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

describe('JoiValidationExceptionFilter', () => {
  let service: JoiValidationExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoiValidationExceptionFilter],
    }).compile();
    service = module.get<JoiValidationExceptionFilter>(
      JoiValidationExceptionFilter,
    );
  });

  describe('All exception filter tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should call global JoiValidationExceptionFilter, expected status code 404', () => {
      const errors: ValidationType = {
        message: 'Invalid name',
        details: [{ key: 'name', message: 'Invaldi name' }],
      };
      const mockHttpException = new JoiValidationException(errors);
      service.catch(mockHttpException, mockArgumentsHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        code: 422,
        error: 'JOI_VALIDATION_EXCEPTION',
        message: errors.message,
        details: errors.details,
      });
    });
  });
});
