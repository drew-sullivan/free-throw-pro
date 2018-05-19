<template>
  <div>
    <div id="app" class="container">
      <img class="app-title-img" src="../static/favicon.png">
      <p class="app-title">Free Throw Pro</p>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TitleNavbar from './components/TitleNavbar'
import BBall from './components/BBall'

import { USERNAME, PASSWORD } from '../mySportsFeeds-config'

import $ from 'jquery'

export default {
  name: 'App',
  components: {
    bball: BBall,
    titleNavbar: TitleNavbar
  },
  mounted () {
    $.ajax({
      type: 'GET',
      url: 'https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/cumulative_player_stats.json?playerstats=FTA,FTM',
      dataType: 'json',
      async: true,
      headers: {
        'Authorization': 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`)
      },
      success: function (data) {
        // const stats = JSON.stringify(data, null, '\t')
        const playerStats = data['cumulativeplayerstats']['playerstatsentry']
        console.log(playerStats)
        const playersSortedByFreeThrowAverage = playerStats.sort(
          (a, b) => {
            const afreeThrowAttempts = +a.stats['FtAtt']['#text']
            const afreeThrowSuccesses = +a.stats['FtMade']['#text']
            const afreeThrowAvg = (afreeThrowSuccesses / afreeThrowAttempts * 100).toFixed(2)
            const bfreeThrowAttempts = +b.stats['FtAtt']['#text']
            const bfreeThrowSuccesses = +b.stats['FtMade']['#text']
            const bfreeThrowAvg = (bfreeThrowSuccesses / bfreeThrowAttempts * 100).toFixed(2)
            return bfreeThrowAvg - afreeThrowAvg
          }
        )
        playersSortedByFreeThrowAverage.forEach(item => {
          const player = item.player
          const freeThrowAttempts = +item.stats['FtAtt']['#text']
          const freeThrowSuccesses = +item.stats['FtMade']['#text']
          const freeThrowAvg = (freeThrowSuccesses / freeThrowAttempts * 100).toFixed(2)
          if (freeThrowAttempts) {
            console.log(`${player.FirstName} ${player.LastName} - ${freeThrowAvg}%`)
          }
        })
      }
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Permanent+Marker');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
