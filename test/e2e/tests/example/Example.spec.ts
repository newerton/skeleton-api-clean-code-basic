import { HttpStatus } from '@nestjs/common';
import supertest from 'supertest';
import { validate as uuidValidate, v4 } from 'uuid';

import { CreateExampleInputDto } from '@app/example/dto/create-example.dto';
import { GetExampleOutputDto } from '@app/example/dto/get-example.dto';
import { ListAllExampleOutputDto } from '@app/example/dto/list-all-example.dto';
import { Code } from '@core/@shared/domain/error/Code';
import { Example } from '@core/example/domain/entity/Example';
import { TestServer } from '@test/common/TestServer';
import { ResponseExpect } from '@test/e2e/expect/ResponseExpect';
import { ExampleFixture } from '@test/e2e/fixture/UserFixture';

describe('Example', () => {
  let testServer: TestServer;
  let exampleFixture: ExampleFixture;

  beforeAll(async () => {
    testServer = await TestServer.new();
    exampleFixture = ExampleFixture.new(testServer.testingModule);

    await testServer.serverApplication.init();
  });

  afterAll(async () => {
    if (testServer) {
      await testServer.serverApplication.close();
    }
  });

  describe('POST /example', () => {
    test('When example not already exists, expect it returns status 200', async () => {
      const payload: CreateExampleInputDto = {
        name: `name_${v4()}`,
        password: '123456',
      };

      const response: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .post('/example')
        .send(payload)
        .expect(HttpStatus.OK);

      ResponseExpect.data({ response: response.body }, response.body);
    });

    test('When example already exists, expect it returns "ENTITY_ALREADY_EXISTS_ERROR" response', async () => {
      const example = await exampleFixture.insertExample({
        name: 'name',
        password: '123456',
      });

      const payload: CreateExampleInputDto = {
        name: example.name,
        password: '123456',
        is_active: example.is_active,
      };

      const response: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .post('/example')
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      ResponseExpect.codeAndMessage(response.body, {
        code: Code.ENTITY_ALREADY_EXISTS_ERROR.code,
        error: Code.ENTITY_ALREADY_EXISTS_ERROR.error,
        message: 'Example already exists.',
      });
      ResponseExpect.data({ response: response.body }, response.body);
    });

    test('When body is not valid, expect it returns "JOI_VALIDATION_EXCEPTION" response', async () => {
      const payload: Record<string, unknown> = {
        name: 1337,
        password: 42,
      };

      const response: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .post('/example')
        .send(payload)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);

      expect(Object.keys(response.body.details[0])).toEqual([
        'message',
        'path',
        'type',
        'context',
      ]);

      ResponseExpect.codeAndMessage(response.body, {
        code: Code.UNPROCESSABLE_ENTITY_ERROR.code,
        error: 'JOI_VALIDATION_EXCEPTION',
        message: response.body.message,
      });
    });
  });

  describe('GET /example', () => {
    test(`When return all example list, validate the body of last example created`, async () => {
      const name = `name_${v4()}`;
      await exampleFixture.insertExample({
        name,
        password: '123456',
      });

      const response: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .get('/example')
        .expect(HttpStatus.OK);

      const body: ListAllExampleOutputDto = response.body;
      expect(uuidValidate(body[0].id)).toBeTruthy();
      expect(body[0].name).toBe(name);
      expect(body[0].is_active).toBeFalsy();
    });
  });

  describe('GET /example/:id', () => {
    test(`When return a example, validate the response body`, async () => {
      const name = `name_${v4()}`;
      const example: Example = await exampleFixture.insertExample({
        name,
        password: '123456',
      });

      const response: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .get(`/example/${example.id}`)
        .expect(HttpStatus.OK);

      const body: GetExampleOutputDto = response.body;
      expect(uuidValidate(body.id)).toBeTruthy();
      expect(body.name).toBe(name);
      expect(body.is_active).toBeFalsy();
    });
  });

  describe('PATCH /example/:id', () => {
    test('When update a example, validate if name has altered', async () => {
      const name = `name_${v4()}`;
      const example: Example = await exampleFixture.insertExample({
        name,
        password: '123456',
      });

      const responseCreated: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .get(`/example/${example.id}`)
        .expect(HttpStatus.OK);

      expect(responseCreated.body.name).toBe(name);

      const { id } = responseCreated.body;
      expect(id).toBe(example.id);

      await supertest(testServer.serverApplication.getHttpServer())
        .patch(`/example/${example.id}`)
        .send({ name: `${name} updated` })
        .expect(HttpStatus.OK);

      const responseUpdated: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .get(`/example/${example.id}`)
        .expect(HttpStatus.OK);

      expect(responseUpdated.body.name).toBe(`${name} updated`);
      expect(responseUpdated.body.is_active).toBeFalsy();
    });

    test('When update a example, validate if name and is_active has altered', async () => {
      const name = `name_${v4()}`;
      const example: Example = await exampleFixture.insertExample({
        name,
        password: '123456',
      });

      const responseCreated: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .get(`/example/${example.id}`)
        .expect(HttpStatus.OK);

      expect(responseCreated.body.name).toBe(name);

      const { id } = responseCreated.body;
      expect(id).toBe(example.id);

      await supertest(testServer.serverApplication.getHttpServer())
        .patch(`/example/${example.id}`)
        .send({ name: `${name} updated`, is_active: true })
        .expect(HttpStatus.OK);

      const responseUpdated: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .get(`/example/${example.id}`)
        .expect(HttpStatus.OK);

      expect(responseUpdated.body.name).toBe(`${name} updated`);
      expect(responseUpdated.body.is_active).toBeTruthy();
    });
  });

  describe('DELETE /example/:id', () => {
    test('When delete a example, validate if example exists', async () => {
      const name = `name_${v4()}`;
      const example: Example = await exampleFixture.insertExample({
        name,
        password: '123456',
      });

      const responseCreated: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      )
        .get(`/example/${example.id}`)
        .expect(HttpStatus.OK);

      expect(responseCreated.body.name).toBe(name);

      const { id } = responseCreated.body;
      expect(id).toBe(example.id);

      await supertest(testServer.serverApplication.getHttpServer())
        .delete(`/example/${example.id}`)
        .expect(HttpStatus.NO_CONTENT);

      const responseDeleted: supertest.Response = await supertest(
        testServer.serverApplication.getHttpServer(),
      ).get(`/example/${example.id}`);

      ResponseExpect.codeAndMessage(responseDeleted.body, {
        code: Code.ENTITY_NOT_FOUND_ERROR.code,
        error: Code.ENTITY_NOT_FOUND_ERROR.error,
        message: 'Example not exists.',
      });
      ResponseExpect.data(
        { response: responseDeleted.body },
        responseDeleted.body,
      );
    });
  });
});
