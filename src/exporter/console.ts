import Exporter from './exporter';

export default class ConsoleExporter<T> implements Exporter<T> {
  export(data: T): void {
    console.log(data);
  }
}
