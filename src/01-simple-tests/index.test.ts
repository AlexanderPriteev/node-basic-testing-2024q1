// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const check1 = simpleCalculator({ a: 10, b: 10, action: Action.Add });
    const check2 = simpleCalculator({ a: 10, b: -10, action: Action.Add });
    const check3 = simpleCalculator({ a: 10, b: NaN, action: Action.Add });

    expect(check1).toBe(20);
    expect(check2).toBe(0);
    expect(check3).toBe(NaN);
  });

  test('should subtract two numbers', () => {
    const check1 = simpleCalculator({ a: 10, b: 10, action: Action.Subtract });
    const check2 = simpleCalculator({ a: 10, b: -10, action: Action.Subtract });
    const check3 = simpleCalculator({ a: 10, b: NaN, action: Action.Subtract });

    expect(check1).toBe(0);
    expect(check2).toBe(20);
    expect(check3).toBe(NaN);
  });

  test('should multiply two numbers', () => {
    const check1 = simpleCalculator({ a: 10, b: 10, action: Action.Multiply });
    const check2 = simpleCalculator({ a: 10, b: -10, action: Action.Multiply });
    const check3 = simpleCalculator({ a: 10, b: NaN, action: Action.Multiply });

    expect(check1).toBe(100);
    expect(check2).toBe(-100);
    expect(check3).toBe(NaN);
  });

  test('should divide two numbers', () => {
    const check1 = simpleCalculator({ a: 10, b: 10, action: Action.Divide });
    const check2 = simpleCalculator({ a: 10, b: -10, action: Action.Divide });
    const check3 = simpleCalculator({ a: 10, b: NaN, action: Action.Divide });
    const check4 = simpleCalculator({ a: 10, b: 0, action: Action.Divide });

    expect(check1).toBe(1);
    expect(check2).toBe(-1);
    expect(check3).toBe(NaN);
    expect(check4).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    const check1 = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Exponentiate,
    });
    const check2 = simpleCalculator({
      a: 100,
      b: 0.5,
      action: Action.Exponentiate,
    });
    const check3 = simpleCalculator({
      a: 10,
      b: NaN,
      action: Action.Exponentiate,
    });
    const check4 = simpleCalculator({
      a: -10,
      b: 0.5,
      action: Action.Exponentiate,
    });

    expect(check1).toBe(100);
    expect(check2).toBe(10);
    expect(check3).toBe(NaN);
    expect(check4).toBe(NaN);
  });

  test('should return null for invalid action', () => {
    const check = simpleCalculator({ a: 5, b: 3, action: Action });
    expect(check).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const check1 = simpleCalculator({ a: 1, b: null, action: Action.Add });
    const check2 = simpleCalculator({ a: false, b: 1, action: Action.Add });
    const check3 = simpleCalculator({ a: 1, b: [], action: Action.Add });
    const check4 = simpleCalculator({ a: {}, b: 1, action: Action.Divide });
    const check5 = simpleCalculator({ a: 1, b: '1', action: Action.Multiply });
    const check6 = simpleCalculator({ a: true, b: 1, action: Action.Multiply });
    const check7 = simpleCalculator({ a: 1, b: null, action: Action.Subtract });
    const check8 = simpleCalculator({ a: null, b: 1, action: Action.Subtract });
    const check9 = simpleCalculator({
      a: undefined,
      b: NaN,
      action: Action.Exponentiate,
    });
    const check10 = simpleCalculator({
      a: 1,
      b: undefined,
      action: Action.Exponentiate,
    });

    expect(check1).toBe(null);
    expect(check2).toBe(null);
    expect(check3).toBe(null);
    expect(check4).toBe(null);
    expect(check5).toBe(null);
    expect(check6).toBe(null);
    expect(check7).toBe(null);
    expect(check8).toBe(null);
    expect(check9).toBe(null);
    expect(check10).toBe(null);
  });
});
