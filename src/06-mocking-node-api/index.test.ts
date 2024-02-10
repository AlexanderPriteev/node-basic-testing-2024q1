// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

const time = 1000;
const fn = () => console.log(true);
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const result = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(fn, time);
    expect(result).toHaveBeenCalledWith(fn, time);
  });

  test('should call callback only after timeout', () => {
    const result = jest.spyOn(console, 'log');
    doStuffByTimeout(fn, time);
    jest.advanceTimersByTime(time);
    expect(result).toHaveBeenCalledWith(true);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const result = jest.spyOn(global, 'setInterval');
    doStuffByInterval(fn, time);
    expect(result).toHaveBeenCalledWith(fn, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const COUNT = 10;
    const result = jest.spyOn(console, 'log');
    doStuffByInterval(fn, time);
    jest.advanceTimersByTime(time);
    expect(result).toHaveBeenCalledWith(true);
    for (let i = 0; i < COUNT; i += 1) {
      jest.advanceTimersByTime(time);
    }
    expect(result).toHaveBeenCalledTimes(COUNT + 1);
  });
});

describe('readFileAsynchronously', () => {
  const PATH = 'file';

  test('should call join with pathToFile', async () => {
    const result = jest.spyOn(path, 'join');
    await readFileAsynchronously(PATH);
    expect(result).toHaveBeenCalledWith(__dirname, PATH);
  });

  test('should return null if file does not exist', async () => {
    await expect(readFileAsynchronously(PATH)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(PATH);
    await expect(readFileAsynchronously(PATH)).resolves.toBe(PATH);
  });
});
