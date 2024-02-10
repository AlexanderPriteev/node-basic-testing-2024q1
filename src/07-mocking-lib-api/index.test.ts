// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';
import MockAdapter from 'axios-mock-adapter';

const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  const PATH = '/test-path';
  const DATA = 'Result';
  const mockAxios = new MockAdapter(axios);
  let promise: Promise<string>;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockAxios.onGet(PATH).reply(200, DATA);
    promise = throttledGetDataFromApi(PATH) as Promise<string>;
    jest.advanceTimersByTime(THROTTLE_TIME);
  });

  afterAll(() => {
    jest.useRealTimers();
    mockAxios.reset();
  });

  test('should create instance with provided base url', async () => {
    await promise;
    const result = mockAxios.history.get;
    expect(result && result[0]?.baseURL).toBe(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    await promise;
    const result = mockAxios.history.get;
    expect(result && result[0]?.url).toBe(PATH);
  });

  test('should return response data', async () => {
    const result = await promise;
    expect(result).toBe(DATA);
  });
});
