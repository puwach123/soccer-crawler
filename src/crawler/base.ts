import axios from 'axios';
import cheerio from 'cheerio';

export default abstract class BaseCrawler {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  abstract fetch(root: cheerio.Root): void;

  public async run(): Promise<void> {
    try {
      const resp = await axios.get(this.url);
      const html = resp.data;
      const root = cheerio.load(html);
      this.fetch(root);
    } catch (error) {
      console.error(error);
    }
  }
}
