import MessagesSchema from '@app/@common/schemas/joi/joi.messages.schema';
describe('MessagesSchema', () => {
  test('Should validate all attributes', () => {
    const messages = MessagesSchema;

    expect(messages['any.required']).toBeTruthy();
    expect(messages['date.base']).toBeTruthy();
    expect(messages['date.format']).toBeTruthy();
    expect(messages['number.min']).toBeTruthy();
    expect(messages['number.max']).toBeTruthy();
    expect(messages['number.greater']).toBeTruthy();
    expect(messages['number.less']).toBeTruthy();
    expect(messages['postalCode.invalid']).toBeTruthy();
    expect(messages['string.base']).toBeTruthy();
    expect(messages['string.email']).toBeTruthy();
    expect(messages['string.empty']).toBeTruthy();
    expect(messages['string.guid']).toBeTruthy();
    expect(messages['string.length']).toBeTruthy();
    expect(messages['string.creditCard']).toBeTruthy();
    expect(messages['string.min']).toBeTruthy();
    expect(messages['string.max']).toBeTruthy();
    expect(messages['string.pattern.base']).toBeTruthy();
  });
});
