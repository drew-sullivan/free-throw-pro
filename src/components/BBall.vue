<template>
  <div>
    <div v-if="sortedStats.length">
      <p class="section-title top-label">Free Throw Average</p>
      <h1>{{ freeThrowAverage }}%</h1>
    </div>

    <h2>
      <i v-if="progress > 0" class="fa fa-arrow-up"></i>
      <i v-else class="fa fa-arrow-down"></i>
      {{ progress }}
      <span class="progress-desc">&nbsp;Baskets/Session</span>
    </h2>

    <p class="section-title">{{ getNumSessionsRemaining }}</p>

    <button v-show="!adding" @click="toggle" class="btn btn-success mobile-button util-margin-20">&#43; New Session</button>
    <div  v-show="adding" class="form-row">
      <div class="form-group col-md-2 col-xs-4">
        <label>Out of 10</label>
        <input class="form-control" type="number" placeholder="Out of 10" name="of10" value="num" v-model="of10">
      </div>
      <div class="form-group col-md-2 col-xs-4">
        <label>Short</label>
        <input class="form-control" type="number" placeholder="Short" name="short" value="num" v-model="short">
      </div>
      <div class="form-group col-md-2 col-xs-4">
        <label>Long</label>
        <input class="form-control" type="number" placeholder="Long" name="long" value="num" v-model="long">
      </div>
      <div class="form-group col-md-2 col-xs-4">
        <label>Left</label>
        <input class="form-control" type="number" placeholder="Left" name="left" value="num" v-model="left">
      </div>
      <div class="form-group col-md-2 col-xs-4">
        <label>Right</label>
        <input class="form-control" type="number" placeholder="Right" name="right" value="num" v-model="right">
      </div>
      <div class="form-group col-md-2 col-xs-4">
        <label>Legit</label>
        <input class="form-control" type="number" placeholder="Legit" name="legit" value="num" v-model="legit">
      </div>
      <button @click="cancel" class="btn btn-secondary mobile-button">Cancel</button>
      <button @click="add" class="btn btn-primary mobile-button">Submit</button>
    </div>

    <p class="section-title top-label">Skills to focus on:</p>
    <div class="focus-item" v-for="(item, i) in focusList" :key="i">
      <img class="mr-3" src="../../static/favicon.png">
      <span>{{ item | title }}</span>
    </div>

    <avg-chart v-if="sortedStats.length && runningAverages.length"
      v-bind:sortedStats="sortedStats" v-bind:runningAverages="runningAverages" class="stat-chart"></avg-chart>
    <helper-shots-chart v-if="sortedStats.length" v-bind:sortedStats="sortedStats" class="stat-chart"></helper-shots-chart>

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
</template>

<script>
import moment from 'moment'
import regression from 'regression'

import AvgChart from './AvgChart'
import HelperShotsChart from './HelperShotsChart.vue'

export default {
  name: 'BBall',
  props: ['stats'],
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
    runningAverages: function () {
      const of10Arr = Array.from(this.sortedStats, x => +x.of10).reverse()
      const runningAverages = []
      for (let i = 1; i <= of10Arr.length; i++) {
        let currentArray = of10Arr.slice(0, i)
        runningAverages.push(+(currentArray.reduce((acc, curr) => acc + curr) / currentArray.length).toFixed(2))
      }
      return runningAverages
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
    getNumSessionsRemaining: function () {
      const regObj = this.getRegressionObject('of10')
      const m = regObj.equation[0]
      const b = regObj.equation[1]
      const numSessionsRemaining = (10 - b) / m
      if (numSessionsRemaining < 1) {
        return 'Calculating - keep playing!'
      } else {
        return `Only ${numSessionsRemaining} sessions remaining!`
      }
    },
    progress: function () {
      const regObj = this.getRegressionObject('of10')
      const m = regObj.equation[0]
      return m
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
      this.$emit('add-new-data', newData)
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

label {
  float: left;
}

.top-label {
  margin: 20px auto -10px auto !important;
}

.section-title {
  font-size: 20px;
  color: #878787;
}

.util-margin-20 {
  margin: 20px auto;
}

.mobile-button {
  margin: 5px auto;
  width: 100%;
  height: 60px;
  font-size: 35px;
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
  margin: 15px auto;
}

.focus-item img {
  height: 20px;
  width: 20px;
  float: left;
  margin-left: 30%;
  margin-top: 16px;
}

.focus-item span {
  margin-right: 30%;
  font-size: 35px;
}

.fa-arrow-down {
  color: red;
}

.fa-arrow-up {
  color: #00D647;
}
</style>
