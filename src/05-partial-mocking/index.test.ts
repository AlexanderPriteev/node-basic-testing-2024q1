// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: () => null,
    mockTwo: () => null,
    mockThree: () => null,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const result = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(result).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const result = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(result).toHaveBeenCalledWith('I am not mocked');
  });
});
