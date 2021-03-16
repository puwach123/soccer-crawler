import fs from 'fs';
import Exporter from './exporter';

export default class JSONExporter<T> implements Exporter<T> {
  private opath: string;

  constructor(opath: string) {
    this.opath = opath;
  }

  export(data: T): void {
    fs.writeFileSync(this.opath, JSON.stringify(data, null, 2));
  }
}
