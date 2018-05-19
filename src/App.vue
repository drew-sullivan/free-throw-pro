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
        const getFreeThrowAvg = (player) => {
          const freeThrowAttempts = +player.stats['FtAtt']['#text']
          const freeThrowSuccesses = +player.stats['FtMade']['#text']
          return (freeThrowSuccesses / freeThrowAttempts * 100).toFixed(2)
        }
        const playersSortedByFreeThrowAverage = playerStats.sort(
          (playerA, playerB) => {
            const playerAFreeThrowAvg = getFreeThrowAvg(playerA)
            const playerBFreeThrowAvg = getFreeThrowAvg(playerB)
            return playerBFreeThrowAvg - playerAFreeThrowAvg
          }
        )
        playersSortedByFreeThrowAverage.forEach(item => {
          const player = item.player
          const freeThrowAvg = getFreeThrowAvg(item)
          if (+item.stats['FtAtt']['#text']) {
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
