import axios from "axios";
import cheerio from "cheerio";

abstract class BaseCrawler {
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

interface Record {
  rank: number;
  team: string;
  win: number;
  draw: number;
  lose: number;
  matches?: Match[];
}

interface Match {
  time: string;
  host: string;
  away: string;
  full: string;
  half: string;
  handicap: string;
}

const getDefaultRecord = (): Record => ({ rank: -1, team: "", win: -1, draw: -1, lose: -1 });
const isValidRecord = (record: Record): boolean => record.lose >= 0 && record.win >= 0 && record.draw >= 0 && record.rank >= 0 && record.team != "";


class RecordCrawler extends BaseCrawler {
  private coldef: { [key: string]: number } = {
    "rank": 0,
    "team": 1,
    "win": 2,
    "draw": 3,
    "lose": 4
  };
  public records: Record[];

  constructor(url: string) {
    super(url);
    this.records = [];
  }

  public fetch(root: cheerio.Root): void {
    root("tbody > tr").each((_, tr) => {
      let record: Record = getDefaultRecord();
      root(tr).find("td").each((idx, td) => {
        switch (idx) {
          case this.coldef.rank:
            record.rank = Number(root(td).text());
            break;
          case this.coldef.team:
            record.team = root(td).find("a").text().replace(/(\r\n|\n|\r|\t)/gm, "");
            break;
          case this.coldef.win:
            record.win = Number(root(td).text());
            break;
          case this.coldef.draw:
            record.draw = Number(root(td).text());
            break;
          case this.coldef.lose:
            record.lose = Number(root(td).text());
            break;
        }
      })
      if (isValidRecord(record)) this.records.push(record);
    })
  }
}