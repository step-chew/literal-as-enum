import { enumFrom, GetEnumType } from '../enum';

describe('enumFor()', () => {
  it('should convert given string to string literal', () => {
    const Status = enumFrom('ready', 'running', 'cancelling', 'terminated');
    type Status = GetEnumType<typeof Status>;

    const READY: Status = 'running';

    expect(READY).toBe('running');
  });

  it('should convert given invalid string to undefined when no fallback is configured', () => {
    const Status = enumFrom('ready', 'running', 'cancelling', 'terminated');
    type Status = GetEnumType<typeof Status>;

    const state = Status.of('test');

    expect(state).toBeUndefined();
  });

  it('should convert given invalid string to undefined when no fallback is configured', () => {
    const Status = enumFrom(
      'ready',
      'running',
      'cancelling',
      'terminated'
    ).fallback('ready');
    type Status = GetEnumType<typeof Status>;

    const state = Status.of('test');

    expect(state).toBe('ready');
  });
});
