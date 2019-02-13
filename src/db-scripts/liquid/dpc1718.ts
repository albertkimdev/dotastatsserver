import Nightmare from "nightmare";

export const getTournamentInfo = async () => {
  const url = "https://liquipedia.net/dota2/Dota_Pro_Circuit/2017-18";
  const nightmare = new Nightmare({
    show: false
  });

  try {
    console.log(`Scrapeing ${url}`);

    const result = await nightmare
      .goto(url)
      .wait(1500)
      .evaluate(() => {
        const elements = Array.prototype.slice.call(
          document.getElementsByClassName("divRow")
        );

        //return elements[0].children[0].children[1].children[0].href

        // @ts-ignore
        return elements.map(e => {
          // const child = e.children[0];
          return {
            name: e.children[0].innerText.trim(),
            link: e.children[0].children[1].children[0].href,
            date: e.children[1].innerText
          };
        });
      })
      .end();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
// const doit = async () => {
//   const x: any = await getTournamentInfo();
//   console.log(x);
// };
// doit();
