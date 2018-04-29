<template>
  <div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Date</th>
          <th>of 10</th>
          <th>Legit</th>
          <th>Short</th>
          <th>Long</th>
          <th>Left</th>
          <th>Right</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lifetime</td>
          <td>{{ avgOf10 }}%</td>
        </tr>
        <tr>
          <td>{{ stats[0].date }}</td>
          <td v-bind:class="classObject_of10">{{ stats[0].of10 }}</td>
          <td v-bind:class="classObject_legit">{{ stats[0].legit }}</td>
          <td v-bind:class="classObject_short">{{ stats[0].short }}</td>
          <td v-bind:class="classObject_long">{{ stats[0].long }}</td>
          <td v-bind:class="classObject_left">{{ stats[0].left }}</td>
          <td v-bind:class="classObject_right">{{ stats[0].right }}</td>
        </tr>
        <tr v-for="(b, index) in stats.slice(1)" :key="index">
          <td>{{ b.date }}</td>
          <td>{{ b.of10 }} {{ getAvgOf10 }}</td>
          <td>{{ b.legit }} {{ getAvgLegit }}</td>
          <td>{{ b.short }} {{ getAvgShort }}</td>
          <td>{{ b.long }} {{ getAvgLong }}</td>
          <td>{{ b.left }} {{ getAvgLeft }}</td>
          <td>{{ b.right }} {{ getAvgRight }}</td>
        </tr>
      </tbody>
    </table>
    <button v-show="!adding" @click="toggle">+</button>
    <div v-show="adding" class="ui form">
      <div class="fields">
        <div class="field">
          <label>Date</label>
          <input type="date" placeholder="date" name="date" value="date" v-model="date">
        </div>
        <div class="field">
          <label>Out of 10</label>
          <input type="number" placeholder="Out of 10" name="of10" value="num" v-model="of10">
        </div>
        <div class="field">
          <label>Legit</label>
          <input type="number" placeholder="Legit" name="legit" value="num" v-model="legit">
        </div>
        <div class="field">
          <label>Short</label>
          <input type="number" placeholder="Short" name="short" value="num" v-model="short">
        </div>
        <div class="field">
          <label>Long</label>
          <input type="number" placeholder="Long" name="long" value="num" v-model="long">
        </div>
        <div class="field">
          <label>Left</label>
          <input type="number" placeholder="Left" name="Left" value="num" v-model="left">
        </div>
        <div class="field">
          <label>Right</label>
          <input type="number" placeholder="Right" name="right" value="num" v-model="right">
        </div>
      </div>
      <button @click="add">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BBall',
  created: function () {
    this.stats.sort(byDate)
  },
  data () {
    return {
      adding: false,
      stats: [
        { date: '2018-04-26', legit: 12, of10: 4, short: 12, long: 14, left: 15, right: 6 },
        { date: '2018-04-24', legit: 13, of10: 3, short: 13, long: 12, left: 14, right: 7 },
        { date: '2018-04-25', legit: 14, of10: 2, short: 14, long: 11, left: 13, right: 8 },
        { date: '2018-04-23', legit: 15, of10: 1, short: 15, long: 10, left: 8, right: 8 },
        { date: '2018-04-24', legit: 14, of10: 0, short: 16, long: 9, left: 9, right: 9 },
        { date: '2018-04-22', legit: 13, of10: 2, short: 17, long: 8, left: 10, right: 12 },
        { date: '2018-04-18', legit: 12, of10: 4, short: 18, long: 12, left: 10, right: 13 },
        { date: '2018-04-23', legit: 11, of10: 5, short: 9, long: 13, left: 12, right: 9 },
        { date: '2018-04-20', legit: 14, of10: 2, short: 8, long: 13, left: 11, right: 8 }
      ],
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
    avgOf10: function () {
      return getAvg(this.stats, 'of10') * 10
    },
    classObject_legit: function () {
      return {
        positive: this.stats[0].legit < getAvg(this.stats, 'legit'),
        negative: this.stats[0].legit >= getAvg(this.stats, 'legit')
      }
    },
    classObject_of10: function () {
      return {
        positive: this.stats[0].of10 < getAvg(this.stats, 'of10'),
        negative: this.stats[0].of10 >= getAvg(this.stats, 'of10')
      }
    },
    classObject_short: function () {
      return {
        positive: this.stats[0].short < getAvg(this.stats, 'short'),
        negative: this.stats[0].short >= getAvg(this.stats, 'short')
      }
    },
    classObject_long: function () {
      return {
        positive: this.stats[0].long < getAvg(this.stats, 'long'),
        negative: this.stats[0].long >= getAvg(this.stats, 'long')
      }
    },
    classObject_left: function () {
      return {
        positive: this.stats[0].left < getAvg(this.stats, 'left'),
        negative: this.stats[0].left >= getAvg(this.stats, 'left')
      }
    },
    classObject_right: function () {
      return {
        positive: this.stats[0].right < getAvg(this.stats, 'right'),
        negative: this.stats[0].right >= getAvg(this.stats, 'right')
      }
    }
  },
  methods: {
    add: function () {
      this.stats.push({
        date: this.date,
        legit: this.legit,
        of10: this.of10,
        short: this.short,
        long: this.long,
        left: this.left,
        right: this.right
      })
      this.toggle()
      this.stats.sort(byDate)
    },
    toggle: function () {
      this.adding = !this.adding
    }
  }
}
const byDate = (a, b) => new Date(b.date) - new Date(a.date)
const getAvg = (arr, prop) => (arr.reduce((acc, stat) => acc + stat[prop], 0) / arr.length).toFixed(0)
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
</style>
