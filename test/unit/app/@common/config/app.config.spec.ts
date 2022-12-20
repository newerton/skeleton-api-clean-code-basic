import { ApiServerConfig } from '@app/@common/config/app.config';

describe('ApiServerConfig', () => {
  test('Should validate ENV config attribute', () => {
    const apiServerConfig = ApiServerConfig.ENV;
    expect(typeof apiServerConfig === 'string').toBeTruthy();
    expect(typeof apiServerConfig === 'string').not.toBeFalsy();
  });

  test('Should validate HOST config attribute', () => {
    const apiServerConfig = ApiServerConfig.HOST;
    expect(typeof apiServerConfig === 'string').toBeTruthy();
    expect(typeof apiServerConfig === 'string').not.toBeFalsy();
  });

  test('Should validate PORT config attribute', () => {
    const apiServerConfig = ApiServerConfig.PORT;
    expect(typeof apiServerConfig === 'number').toBeTruthy();
    expect(typeof apiServerConfig === 'number').not.toBeFalsy();
  });

  test('Should validate ACCESS_TOKEN_SECRET config attribute', () => {
    const apiServerConfig = ApiServerConfig.ACCESS_TOKEN_SECRET;
    expect(typeof apiServerConfig === 'string').toBeTruthy();
    expect(typeof apiServerConfig === 'string').not.toBeFalsy();
  });

  test('Should validate ACCESS_TOKEN_TTL_IN_MINUTES config attribute', () => {
    const apiServerConfig = ApiServerConfig.ACCESS_TOKEN_TTL_IN_MINUTES;
    expect(typeof apiServerConfig === 'number').toBeTruthy();
    expect(typeof apiServerConfig === 'number').not.toBeFalsy();
  });

  test('Should validate ACCESS_TOKEN_HEADER config attribute', () => {
    const apiServerConfig = ApiServerConfig.ACCESS_TOKEN_HEADER;
    expect(typeof apiServerConfig === 'string').toBeTruthy();
    expect(typeof apiServerConfig === 'string').not.toBeFalsy();
  });

  test('Should validate LOGIN_USERNAME_FIELD config attribute', () => {
    const apiServerConfig = ApiServerConfig.LOGIN_USERNAME_FIELD;
    expect(typeof apiServerConfig === 'string').toBeTruthy();
    expect(typeof apiServerConfig === 'string').not.toBeFalsy();
  });

  test('Should validate LOGIN_PASSWORD_FIELD config attribute', () => {
    const apiServerConfig = ApiServerConfig.LOGIN_PASSWORD_FIELD;
    expect(typeof apiServerConfig === 'string').toBeTruthy();
    expect(typeof apiServerConfig === 'string').not.toBeFalsy();
  });

  test('Should validate LOG_ENABLE config attribute', () => {
    const apiServerConfig = ApiServerConfig.LOG_ENABLE;
    expect(typeof apiServerConfig === 'boolean').toBeTruthy();
    expect(typeof apiServerConfig === 'boolean').not.toBeFalsy();
  });
});
