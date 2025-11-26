import * as crypto from 'crypto';

// Полифилл для global.crypto
if (typeof (global as any).crypto === 'undefined') {
  (global as any).crypto = {
    randomUUID: () => crypto.randomUUID(),
    getRandomValues: (array: any) => crypto.randomBytes(array.length),
  };
}
