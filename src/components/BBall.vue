<template>
  <div>
    <div v-if="sortedStats.length">
      <p class="top-label">Free Throw Average</p>
      <h1>{{ freeThrowAverage }}%</h1>
    </div>

    <stats-chart v-if="sortedStats.length" v-bind:sortedStats="sortedStats" class="stat-chart"></stats-chart>
    <helper-shots-chart v-if="sortedStats.length" v-bind:sortedStats="sortedStats" class="stat-chart"></helper-shots-chart>

    <button v-show="!adding" @click="toggle" class="btn btn-success mobile-button util-margin-20">&#43; New Session</button>
    <div  v-show="adding" class="form-row">
      <div class="form-group col-md-2">
        <label>Date</label>
        <input type="date" placeholder="date" name="date" value="date" v-model="date" class="form-control">
      </div>
      <div class="form-group col-md-2">
        <label>Out of 10</label>
        <input class="form-control" type="number" placeholder="Out of 10" name="of10" value="num" v-model="of10">
      </div>
      <div class="form-group col-md-2">
        <label>Legit</label>
        <input class="form-control" type="number" placeholder="Legit" name="legit" value="num" v-model="legit">
      </div>
      <div class="form-group col-md-2">
        <label>Short</label>
        <input class="form-control" type="number" placeholder="Short" name="short" value="num" v-model="short">
      </div>
      <div class="form-group col-md-2">
        <label>Long</label>
        <input class="form-control" type="number" placeholder="Long" name="long" value="num" v-model="long">
      </div>
      <div class="form-group col-md-2">
        <label>Left</label>
        <input class="form-control" type="number" placeholder="Left" name="left" value="num" v-model="left">
      </div>
      <div class="form-group col-md-2">
        <label>Right</label>
        <input class="form-control" type="number" placeholder="Right" name="right" value="num" v-model="right">
      </div>
      <button @click="cancel" class="btn btn-secondary mobile-button">Cancel</button>
      <button @click="add" class="btn btn-primary mobile-button">Submit</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>of 10</th>
          <th>Legit</th>
          <th>Short</th>
          <th>Long</th>
          <th>Left</th>
          <th>Right</th>
        </tr>
        <tr>
          <th>Average</th>
          <th>{{ getAvg(this.sortedStats, 'of10') }}</th>
          <th>{{ getAvg(this.sortedStats, 'legit') }}</th>
          <th>{{ getAvg(this.sortedStats, 'short') }}</th>
          <th>{{ getAvg(this.sortedStats, 'long') }}</th>
          <th>{{ getAvg(this.sortedStats, 'left') }}</th>
          <th>{{ getAvg(this.sortedStats, 'right') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sortedStats.length">
          <td>{{ sortedStats[0].date }}</td>
          <td v-bind:class="getColorStatus('of10')">{{ sortedStats[0].of10 }}</td>
          <td v-bind:class="getColorStatus('legit')">{{ sortedStats[0].legit }}</td>
          <td v-bind:class="getColorStatus('short')">{{ sortedStats[0].short }}</td>
          <td v-bind:class="getColorStatus('long')">{{ sortedStats[0].long }}</td>
          <td v-bind:class="getColorStatus('left')">{{ sortedStats[0].left }}</td>
          <td v-bind:class="getColorStatus('right')">{{ sortedStats[0].right }}</td>
        </tr>
        <tr v-for="(stat, index) in sortedStats.slice(1)" :key="index">
          <td>{{ stat.date }}</td>
          <td>{{ stat.of10 }}</td>
          <td>{{ stat.legit }}</td>
          <td>{{ stat.short }}</td>
          <td>{{ stat.long }}</td>
          <td>{{ stat.left }}</td>
          <td>{{ stat.right }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import StatsChart from './StatsChart'
import HelperShotsChart from './HelperShotsChart.vue'

export default {
  name: 'BBall',
  props: ['stats'],
  components: {
    statsChart: StatsChart,
    helperShotsChart: HelperShotsChart
  },
  data () {
    return {
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
      return this.getAvg(this.stats, 'of10') * 10
    },
    statsLen: function () {
      return this.stats.length - 1
    },
    sortedStats: function () {
      return this.stats.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  methods: {
    add: function () {
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
    },
    cancel: function () {
      this.toggle()
    },
    toggle: function () {
      this.adding = !this.adding
    },
    getColorStatus: function (prop) {
      const stat = this.sortedStats[0][prop]
      const avg = this.getAvg(this.stats, prop)
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
    getAvg: function (arr, prop) {
      return (arr.reduce((acc, stat) => acc + +stat[prop], 0) / arr.length).toFixed(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
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
  font-size: 20px;
  color: #878787;
  margin: 20px auto -10px auto !important;
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
  display:block;
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
</style>
