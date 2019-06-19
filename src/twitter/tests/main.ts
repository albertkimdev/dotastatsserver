import 'dotenv/config'
import Twit from 'twit'
import { createTypeormConn } from '../../utils/createTypeormConn';

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
  access_token: process.env.TWITTER_ACCESS_TOKEN as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
})


const doit = async () => {
  console.log('twit')
  T.post('statuses/update', { status: "hello world" }, (err, data, res) => {
    console.log(data)
    // console.log(res)

  })
}

const findTwitData = async () => {
  await createTypeormConn();


}

findTwitData();

// doit();