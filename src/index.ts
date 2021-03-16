import axios from "axios";
import cheerio from "cheerio";

const url: string = "http://app.gooooal.com/odds.do?lid=17&sid=2020&lang=tr&l="
const coldef: { [key: string]: number } = { "rank": 0, "team": 1, "win": 2, "draw": 3, "lose": 4 };


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

const craw = (url: string, func: (root: cheerio.Root) => void) =>
  axios.get(url)
    .then((response) => {
      const html = response.data;
      const root = cheerio.load(html);
      func(root);
    })
    .catch(console.error);

axios.get(url)
  .then((response) => {
    const html = response.data;
    const root = cheerio.load(html);
    let records: Record[] = [];

    root("tbody > tr").each((_, tr) => {
      let record: Record = getDefaultRecord();
      root(tr).find("td").each((idx, td) => {
        switch (idx) {
          case coldef.rank:
            record.rank = Number(root(td).text());
            break;
          case coldef.team:
            record.team = root(td).find("a").text().replace(/(\r\n|\n|\r|\t)/gm, "");
            break;
          case coldef.win:
            record.win = Number(root(td).text());
            break;
          case coldef.draw:
            record.draw = Number(root(td).text());
            break;
          case coldef.lose:
            record.lose = Number(root(td).text());
            break;
        }
      })
      if (isValidRecord(record))
        records.push(record);
    })
    console.log(records)
  })
  .catch(error => console.error(error))