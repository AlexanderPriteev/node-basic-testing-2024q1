// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const value = 1000;
  let newBank: BankAccount;
  beforeEach(() => {
    newBank = getBankAccount(value);
  });
  test('should create account with initial balance', () => {
    expect(newBank.getBalance()).toBe(value);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const fn = () => newBank.withdraw(value * 2);
    expect(fn).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const tmpBank = getBankAccount(0);
    const fn = () => newBank.transfer(value * 2, tmpBank);
    expect(fn).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const fn = () => newBank.transfer(value, newBank);
    expect(fn).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    newBank.deposit(value);
    expect(newBank.getBalance()).toBe(value * 2);
  });

  test('should withdraw money', () => {
    newBank.withdraw(value);
    expect(newBank.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const tmpBank = getBankAccount(0);
    newBank.transfer(value, tmpBank);
    expect(newBank.getBalance()).toBe(0);
    expect(tmpBank.getBalance()).toBe(value);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    let result = await newBank.fetchBalance();
    if (result !== null) {
      const bool = result >= 0 && result <= 100;
      expect(typeof result).toBe('number');
      expect(bool).toBe(true);
      result = null;
    }
    expect(result).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(newBank, 'fetchBalance').mockResolvedValue(1);
    await newBank.synchronizeBalance();
    expect(newBank.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(newBank, 'fetchBalance').mockResolvedValue(null);
    await expect(newBank.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
