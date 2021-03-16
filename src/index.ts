import RecordCrawler from "./crawler/record";
import ConsoleExporter from "./exporter/console";

async function main() {
  const url: string =
    'http://app.gooooal.com/odds.do?lid=17&sid=2020&lang=tr&l=';
  const crawler: RecordCrawler = new RecordCrawler(url);
  await crawler.run();
  crawler.exporto(new ConsoleExporter());
}

main();
