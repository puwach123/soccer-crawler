import fs from 'fs';
import Importer from './importer';

export default class JSONImporter<T> implements Importer<T> {
  private ipath: string;

  constructor(ipath: string) {
    this.ipath = ipath;
  }

  import(): T {
    const idata = fs.readFileSync(this.ipath);
    return JSON.parse(String(idata)) as T;
  }
}
