import axios from 'axios';
import cheerio from 'cheerio';

export default abstract class BaseCrawler {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  abstract fetch(root: cheerio.Root): void;

  public preFetch() {
    console.log(`Fetching data from ${this.url} ...`);
  }
  public postFetch() {}

  public async run(): Promise<void> {
    try {
      const resp = await axios.get(this.url);
      const html = resp.data;
      const root = cheerio.load(html);
      this.preFetch();
      this.fetch(root);
      this.postFetch();
    } catch (error) {
      console.error(error);
    }
  }
}
