import { Storage } from '@google-cloud/storage';
import path from 'path';

const keyPath = path.join(process.cwd(), 'keys', 'futbolinapp-72fdfad32904.json');

const storage = new Storage({
  keyFilename: keyPath,
  projectId: 'futbolinapp'
});

export const bucket = storage.bucket('futbolin');
