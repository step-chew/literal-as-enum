import { enumFrom, GetEnumType } from '../enum';

describe('enumFor()', () => {
  it('should', () => {
    const Status = enumFrom('ready', 'running', 'cancelling', 'terminated');
    type Status = GetEnumType<typeof Status>;

    const READY: Status = 'ready';
  });
});
