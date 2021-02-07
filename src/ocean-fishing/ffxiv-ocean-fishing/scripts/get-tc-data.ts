import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import oceanFishingFishingSpots from '../data/fishing-spots.json'
import oceanFishingBaits from '../data/baits.json'

const BEARER_TOKEN = require('./tc-bearer-token.json') // eslint-disable-line @typescript-eslint/no-var-requires

const BAIT_IDS = Object.keys(oceanFishingBaits).map(Number)
  .concat([
    29722, // Ghoul Barracuda
    29761, // Hi-aetherlouse
    29718, // Tossed Dagger
    32107 // Rothlyt Mussel
  ])
const FISHING_SPOTS = Object.keys(oceanFishingFishingSpots).map(Number)

async function getTCData (spotId: number, baitId: number): Promise<any> {
  const res = await fetch(
    'https://us-central1-ffxivteamcraft.cloudfunctions.net/gubal-proxy',
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en',
        authorization: BEARER_TOKEN,
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
      body: `{"operationName":"BiteTimesPerFishPerSpotPerBaitQuery","variables":{"spotId":${spotId},"baitId":${baitId}},"query":"query BiteTimesPerFishPerSpotPerBaitQuery($fishId: Int, $spotId: Int, $baitId: Int) {\\n  biteTimes: bite_time_per_fish_per_spot_per_bait(where: {spot: {_eq: $spotId}, itemId: {_eq: $fishId}, baitId: {_eq: $baitId}, biteTime: {_gt: 1}, occurences: {_gte: 1}}) {\\n    itemId\\n    spot\\n    baitId\\n    biteTime\\n    occurences\\n    __typename\\n  }\\n}\\n"}`,
      method: 'POST'
    }
  )

  const json = await res.json()
  json.data.biteTimes = json.data.biteTimes
    .map((datum: any) => ({
      itemId: datum.itemId,
      baitId: datum.baitId,
      biteTime: datum.biteTime,
      occurrences: datum.occurences // Rename this variable...
    }))

  // Aggregate data
  for (let i = 0; i < json.data.biteTimes.length; ++i) {
    const curr = json.data.biteTimes[i]
    for (let j = i + 1; j < json.data.biteTimes.length; ++j) {
      const check = json.data.biteTimes[j]
      if (curr.itemId === check.itemId && curr.baitId === check.baitId && curr.biteTime === check.biteTime) {
        (curr.occurrences as number) += check.occurrences as number
        json.data.biteTimes.splice(j--, 1)
      }
    }
  }

  return json.data.biteTimes
}

;(async () => {
  for (const fishingSpot of FISHING_SPOTS) {
    const allData: any[] = []
    for (const baitId of BAIT_IDS) {
      if (fishingSpot === 0 || baitId === 0) {
        continue
      } else {
        console.log('Fetching:', { spot: fishingSpot, baitId })
        allData.push(...await getTCData(fishingSpot, baitId))
      }
    }
    fs.writeFileSync(path.resolve(__dirname, `../data/tc/spot-${fishingSpot}.json`), JSON.stringify(allData))
  }

  console.log('Done!')
})().then(null, null)
