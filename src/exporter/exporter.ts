export default interface Exporter<T> {
  export(data: T): void;
}
