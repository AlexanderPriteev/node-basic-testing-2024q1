// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

type TCase = {
  a: number;
  b: number;
  action: Action;
  expected: number;
};

const testCases: TCase[] = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 10, b: 10, action: Action.Subtract, expected: 0 },
  { a: 10, b: -10, action: Action.Subtract, expected: 20 },
  { a: 10, b: NaN, action: Action.Subtract, expected: NaN },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },
  { a: 10, b: -10, action: Action.Multiply, expected: -100 },
  { a: 10, b: NaN, action: Action.Multiply, expected: NaN },
  { a: 10, b: 10, action: Action.Divide, expected: 1 },
  { a: 10, b: -10, action: Action.Divide, expected: -1 },
  { a: 10, b: NaN, action: Action.Divide, expected: NaN },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 100, b: 0.5, action: Action.Exponentiate, expected: 10 },
  { a: -10, b: 0.5, action: Action.Exponentiate, expected: NaN },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should blah-blah', (item: TCase) => {
    expect(simpleCalculator(item)).toBe(item.expected);
  });
});
