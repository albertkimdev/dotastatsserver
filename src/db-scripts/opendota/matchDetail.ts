import axios from "axios";

export const matchDetail = (match_id: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.opendota.com/api/matches/${match_id}`)
      .then(res => {
        const { data } = res;
        const { players } = data;

        resolve(players);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

// const doit = async () => {
//   await matchDetail(3593471736);
//   // console.log
// };
// doit();
