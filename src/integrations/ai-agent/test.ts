import { htmlToMarkdown } from "../scraping/html-to-markdown";
import { ExtractCss, scrapeUrl, downloadImagesFromHtml } from "../scraping/scrape-url";
import { CreateMarpTheme } from "./question";



async function main() {
  const url = 'https://marpit.marp.app/theme-css';
  const html = await scrapeUrl(url);
  const content = htmlToMarkdown(html);
  const cssContent = await ExtractCss(html, url);

  let marpTheme = await CreateMarpTheme(content + cssContent);
  console.log(marpTheme);
  // const images = await downloadImagesFromHtml(html, url);

  // // write images to /tmp/test
  // for (let i = 0; i < images.length; i++) {
  //   const image = images[i]; // Uint8Array
  //   const path = `/tmp/test/${i}.png`;
  //   await fs.writeFile(path, image);
  // }
  // console.log(images);
}

main();
