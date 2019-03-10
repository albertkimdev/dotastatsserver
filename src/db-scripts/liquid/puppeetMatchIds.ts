import puppeteer from "puppeteer";

export const getMatchIds = async (link: string) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(link, { waitUntil: "load" });

  const newPage = await page.evaluate(() => {
    const popups = Array.from(
      document.getElementsByClassName("bracket-popup-footer plainlinks vodlink")
    );
    // popups: links from the popups from tournament info click
    let ids: [] = [];

    popups.forEach((p) => {
      const series = Array.from(p.children);
      series.forEach((s: any) => {
        if (typeof s.href != "undefined") {
          if (s.href !== null) {
            if (s.href.includes("dotabuff.com/matches")) {
              let idToPush = parseInt(s.href.match(/\d+/)[0]);
              if (idToPush === 3593237994) {
                idToPush = 3593239494;
              }
              //@ts-ignore
              ids.push(idToPush);
            }
          }
        }
      });
    });

    return ids;
  });
  return newPage;
};
