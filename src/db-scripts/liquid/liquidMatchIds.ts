// import { getTournamentInfo } from "./dpc1718";
import Nightmare from "nightmare";

export const getMatchIds = async (link: string) => {
  const nightmare = new Nightmare({
    show: false
  });

  try {
    console.log(`Scrapeing ${link}`);

    const result = await nightmare
      .goto(link)
      .wait(1500)
      .evaluate(() => {
        const popups = Array.from(
          document.getElementsByClassName(
            "bracket-popup-footer plainlinks vodlink"
          )
        );
        // popups: links from the popups from tournament info click
        let ids: [] = [];

        popups.forEach(p => {
          const series = Array.from(p.children);
          series.forEach((s: any) => {
            if (typeof s.href != "undefined") {
              if (s.href !== null) {
                if (s.href.includes("dotabuff.com/matches")) {
                  // @ts-ignore
                  ids.push(parseInt(s.href.match(/\d+/)[0]));
                }
              }
            }
          });
        });

        return ids;
      })
      .end();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// const doit = async () => {
//   const tournInfo: any = await getTournamentInfo();
//   //tourn info is an array of tourn objects of {name, link}
//   // loop thru? and get match ids
//   // create new funciton to do it...........
//   if (tournInfo) {
//     const ids = await getMatchIds(tournInfo[5].link);
//     console.log(ids);
//   }
// };

// doit();
