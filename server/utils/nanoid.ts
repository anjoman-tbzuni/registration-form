import { customAlphabet } from 'nanoid';

export const authenticationCodeGenerator = customAlphabet('0123456789', 5);
