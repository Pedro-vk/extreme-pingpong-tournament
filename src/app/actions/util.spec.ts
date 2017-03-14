import { type } from './util';

describe('Util type', () => {
  it('should return the input', () => {
    expect(type('test')).toBe('test');
  });

  it('should throw an error if is called more than one time with the same input', () => {
    type('repeat');
    expect(type.bind(null, 'repeat')).toThrow();
  });
});
