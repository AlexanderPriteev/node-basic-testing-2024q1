// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const values = ['value', 'next value'];
const list = {
  value: values[0],
  next: {
    value: values[1],
    next: { value: null, next: null },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values)).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
