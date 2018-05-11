<template>
  <div>

    <img class="app-title-img" src="../../static/favicon.png">

    <p class="app-title">Free Throw Pro</p>

    <div v-if="sortedStats.length">
      <h1>{{ freeThrowAverage }}%</h1>
    </div>

    <h2>
      <i v-if="progress > 0" class="fa fa-arrow-up"></i>
      <i v-else class="fa fa-arrow-down"></i>
      {{ progress }}
      <span class="progress-desc">&nbsp;Baskets/Session</span>
    </h2>

    <p>{{ numSessionsRemaining }}</p>

    <button v-show="!adding" @click="toggle" class="ftp-btn colored-btn success-btn util-margin-10"><i class="fa fa-plus" aria-hidden="true"></i>
&nbsp;New Session</button>
    <div v-show="adding" class="form-row shot-form util-margin-top-30">
      <div class="form-group col-md-2 col-xs-4 input-shot-count">
        <label>Out of 10</label>
        <input class="form-control" type="number" placeholder="Out of 10" name="of10" value="num" v-model="of10">
      </div>
      <div class="form-group col-md-2 col-xs-4 input-shot-count">
        <label>Short</label>
        <input class="form-control" type="number" placeholder="Short" name="short" value="num" v-model="short">
      </div>
      <div class="form-group col-md-2 col-xs-4 input-shot-count">
        <label>Long</label>
        <input class="form-control" type="number" placeholder="Long" name="long" value="num" v-model="long">
      </div>
      <div class="form-group col-md-2 col-xs-4 input-shot-count">
        <label>Left</label>
        <input class="form-control" type="number input-shot-count" placeholder="Left" name="left" value="num" v-model="left">
      </div>
      <div class="form-group col-md-2 col-xs-4 input-shot-count">
        <label>Right</label>
        <input class="form-control" type="number" placeholder="Right" name="right" value="num" v-model="right">
      </div>
      <div class="form-group col-md-2 col-xs-4 input-shot-count">
        <label>Legit</label>
        <input class="form-control" type="number" placeholder="Legit" name="legit" value="num" v-model="legit">
      </div>
      <button @click="cancel" class="ftp-btn light-btn cancel-btn util-margin-top-30">Cancel</button>
      <button @click="add" class="ftp-btn colored-btn submit-btn util-margin-10">Submit</button>
    </div>

    <div v-if="sortedStats[0]">
      <p class="section-title top-label">Shots to Focus On:</p>
      <div class="focus-item" v-for="(item, i) in focusList" :key="i">
        <img src="../../static/favicon.png">
        <span>{{ item | title }}</span>
      </div>
    </div>

    <div id="accordion">
      <div class="card">
        <div class="card-header" id="avgChartHeading">
          <h5 class="mb-0">
            <button class="ftp-btn data-btn collapsed util-margin-top-30" data-toggle="collapse" data-target="#avgChart">
              Average
            </button>
          </h5>
        </div>
        <div id="avgChart" class="collapse" data-parent="#accordion">
          <div class="card-body">
            <avg-chart v-if="sortedStats.length && lineOfBestFit.length"
                       v-bind:sortedStats="sortedStats"
                       v-bind:lineOfBestFit="lineOfBestFit"
                       class="stat-chart">
            </avg-chart>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="helperShotsChartHeading">
          <h5 class="mb-0">
            <button class="ftp-btn data-btn llapsed" data-toggle="collapse" data-target="#helperShotsChart">
              Helper Shots
            </button>
          </h5>
        </div>
        <div id="helperShotsChart" class="collapse" data-parent="#accordion">
          <div class="card-body">
            <helper-shots-chart v-if="sortedStats.length"
                                v-bind:sortedStats="sortedStats"
                                class="stat-chart"></helper-shots-chart>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="historyTableHeading">
          <h5 class="mb-0">
            <button class="ftp-btn data-btn collapsed"
                    data-toggle="collapse" data-target="#historyTable">
              History
            </button>
          </h5>
        </div>
        <div id="historyTable" class="collapse" data-parent="#accordion">
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(shotType, i) in shotTypes" :key="i" class="title">{{ shotType | title }}</th>
                </tr>
                <tr>
                  <th class="title">Avg</th>
                  <th v-for="(shotType, i) in shotTypes" :key="i">{{ getAvg(shotType) }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="sortedStats.length">
                  <td>S.{{ sortedStats.length }}</td>
                  <td v-for="(shotType, i) in shotTypes" :key="i" v-bind:class="getColorStatus(shotType)">
                    {{ sortedStats[0][shotType] }}
                  </td>
                </tr>
                <tr v-for="(stat, index) in sortedStats.slice(1)" :key="index">
                  <td>S.{{ sortedStats.length - 1 - index }}</td>
                  <td v-for="(shotType, i) in shotTypes" :key="i">{{ stat[shotType] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import regression from 'regression'

import AvgChart from './AvgChart'
import HelperShotsChart from './HelperShotsChart.vue'

import firebase from 'firebase'

import { statsRef } from '../../firebase-config'

export default {
  name: 'BBall',
  firebase: {
    stats: statsRef
  },
  components: {
    avgChart: AvgChart,
    helperShotsChart: HelperShotsChart
  },
  data () {
    return {
      shotTypes: ['of10', 'short', 'long', 'left', 'right', 'legit'],
      adding: false,
      date: '',
      legit: 0,
      of10: 0,
      short: 0,
      long: 0,
      left: 0,
      right: 0
    }
  },
  computed: {
    freeThrowAverage: function () {
      return (this.getAvg('of10') * 10).toFixed(2)
    },
    statsLen: function () {
      return this.stats.length - 1
    },
    sortedStats: function () {
      return this.stats.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    focusList: function () {
      const focusList = []
      for (let i = 0; i < this.shotTypes.length; i++) {
        let shotType = this.shotTypes[i]
        if (shotType !== 'of10' && +this.sortedStats[0][shotType] >= +this.getAvg(shotType)) {
          focusList.push(shotType)
        }
      }
      return focusList
    },
    numSessionsRemaining: function () {
      const regObj = this.getRegressionObject('of10')
      const m = regObj.equation[0]
      const b = regObj.equation[1]
      const numSessionsRemaining = Math.ceil((10 - b) / m)
      if (numSessionsRemaining < 1) {
        return 'Calculating number of sessions remaining'
      } else {
        return `${numSessionsRemaining} Sessions Remaining`
      }
    },
    progress: function () {
      const regObj = this.getRegressionObject('of10')
      const m = regObj.equation[0]
      return m
    },
    lineOfBestFit: function () {
      const regObj = this.getRegressionObject('of10')
      const lineOfBestFit = this.stats.map((stat, i) => regObj.predict(i)[1])
      return lineOfBestFit
    }
  },
  methods: {
    add: function () {
      this.date = moment().format()
      const newData = {
        date: this.date,
        legit: this.legit,
        of10: this.of10,
        short: this.short,
        long: this.long,
        left: this.left,
        right: this.right
      }
      this.toggle()
      this.addNewData(newData)
      location.reload()
    },
    cancel: function () {
      this.toggle()
    },
    toggle: function () {
      this.adding = !this.adding
    },
    getColorStatus: function (prop) {
      const stat = this.sortedStats[0][prop]
      const avg = this.getAvg(prop)
      if (prop === 'of10') {
        return {
          positive: +stat > +avg,
          negative: +stat <= +avg
        }
      } else {
        return {
          positive: +stat < +avg,
          negative: +stat >= +avg
        }
      }
    },
    getAvg: function (prop) {
      const arr = this.stats
      return (arr.reduce((acc, stat) => acc + +stat[prop], 0) / arr.length).toFixed(2)
    },
    getRegressionObject: function (prop) {
      const regressionObj = regression.linear(this.stats.map((stat, index) => [index, +stat[prop]]))
      return regressionObj
    },
    addNewData: function (newStats) {
      statsRef.push(newStats)
    },
    logout: function () {
      firebase.auth().signOut().then(
        () => this.$router.replace('login')
      )
    }
  },
  filters: {
    title: function (str) {
      if (str === 'of10') {
        return 'Of 10'
      }
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    shortDate: function (dateString) {
      const dateItems = dateString.split('T')
      const monthDay = dateItems[0].split('-')
      return monthDay.slice(1).join('/')
    }
  }
}
</script>
<style scoped>
h1 {
  font-size: 100px;
  margin-top: 10px;
  margin-bottom: 20px;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

.positive {
  background-color: #D0E7D0;
}

.negative {
  background-color: #FFD0D0;
}

.top-label {
  margin: 20px auto 30px auto;
}

input[type="date"] {
  display: block;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  min-height: 1.2em;
}

select, textarea, input[type="text"], input[type="password"],
input[type="datetime"], input[type="datetime-local"],
input[type="date"], input[type="month"], input[type="time"],
input[type="week"], input[type="number"], input[type="email"],
input[type="url"], input[type="search"], input[type="tel"],
input[type="color"] {
  font-size: 16px;
}

.stat-chart {
  margin: 30px auto;
}

ul {
  list-style-image: url('../../static/favicon.png');
}

.focus-item {
  margin: 7px 30%;
  float: left;
  padding-left: 25px;
}

.focus-item img {
  height: 20px;
  width: 20px;
  margin: 0 10px 7px 0;
}

.focus-item span {
  font-size: 22px;
  color: white;
}

.fa-arrow-down {
  color: red;
}

.fa-arrow-up {
  color: #00D647;
}

.nav {
  border: 1px solid black;
  padding: 10px;
}

.logout {
  cursor: pointer;
}

.accordian {
  margin-top: 30px;
}

.input-shot-count {
  color: white;
}
</style>
