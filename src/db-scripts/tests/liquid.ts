import cheerio from 'cheerio'
import rp from 'request-promise'
import { createTypeormConn } from '../../utils/createTypeormConn';
import { Tournament } from '../../entity/Tournament';

const doit = async () => {

  await createTypeormConn();

  const dpc1718 = 'https://liquipedia.net/dota2/dota_Pro_Circuit/2017-18'
  const dpc1819 = 'https://liquipedia.net/dota2/Dota_Pro_Circuit/2018-19'
  const res = await rp(dpc1718)
  let $ = cheerio.load(res);

  let row = $('.divRow')

  const tournaments: any = []

  // @ts-ignore
  row.each((i, el) => {
    const name = $(el)
      .find('b')
      .find('a')
      .text()
    const links = $(el)
      .find('b')
      .find('a')
      .attr('href')
    const team1 = $(el)
      .find('.FirstPlace')
      .text()
      .replace(/\s/g, '')
      .replace(/\n/g, '')
    const team2 = $(el)
      .find('.SecondPlace')
      .text()
      .replace(/\s/g, '')
      .replace(/\n/g, '')

    if (team1 !== 'TBD') {


      tournaments.push({
        name,
        link: `https://liquipedia.net${links}`,
        team1,
        team2
      })

    }
  })

  for (var t of tournaments) {

    const game_ids = await scrapeMatchIds(t.link);

    await Tournament.create({
      name: t.name,
      season: 'dpc-1718',
      match_ids: game_ids
    }).save();

    await delay(3000)
  }


}

const delay = (time) => new Promise((res) => setTimeout(() => { res(true) }, time))

// https://liquipedia.net/dota2/EPICENTER/2018
// https://liquipedia.net/dota2/PGL/Bucharest_Minor/2019
const scrapeMatchIds = async (tournament) => {

  const res = await rp(tournament)
  let $ = cheerio.load(res);

  let links = $('.bracket-popup-footer')

  const game_ids: any = []

  links.each((i, el) => {
    // if (i == 0) console.log($(el).html())
    const txt = $(el).find('a');
    txt.each((y, el2) => {
      const thatsit = $(el2).html()
      // @ts-ignore
      if (thatsit.includes('DOTABUFF')) {
        // @ts-ignore
        const thats = thatsit.substr(thatsit.indexOf('DOTABUFF:'), thatsit.indexOf('s'))
        // @ts-ignore
        let numba = thats.replace(/[^0-9]/g, '');
        if (numba === '3593237994') {
          numba = '3593239494';
        }
        game_ids.push(numba)
      }
    })
  })

  return game_ids;
}
// scrapeMatchIds();
doit();