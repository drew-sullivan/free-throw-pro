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
          <td>{{ avgOf10 }}</td>
        </tr>
        <tr>
          <td>{{ sortedStats[0].date }}</td>
          <td v-bind:class="classObject_of10">{{ sortedStats[0].of10 }}</td>
          <td v-bind:class="classObject_legit">{{ sortedStats[0].legit }}</td>
          <td v-bind:class="classObject_short">{{ sortedStats[0].short }}</td>
          <td v-bind:class="classObject_long">{{ sortedStats[0].long }}</td>
          <td v-bind:class="classObject_left">{{ sortedStats[0].left }}</td>
          <td v-bind:class="classObject_right">{{ sortedStats[0].right }}</td>
        </tr>
<<<<<<< HEAD
        <tr v-for="(b, index) in sortedStats.slice(1)" :key="index">
          <td>{{ b.date }}</td>
          <td>{{ b.of10 }}</td>
          <td>{{ b.legit }}</td>
          <td>{{ b.short }}</td>
          <td>{{ b.long }}</td>
          <td>{{ b.left }}</td>
          <td>{{ b.right }}</td>
=======
        <tr v-for="(stat, index) in sortedStats.slice(1)" :key="index">
          <td>{{ stat.date }}</td>
          <td>{{ stat.of10 }}</td>
          <td>{{ stat.legit }}</td>
          <td>{{ stat.short }}</td>
          <td>{{ stat.long }}</td>
          <td>{{ stat.left }}</td>
          <td>{{ stat.right }}</td>
>>>>>>> ae2bb8e7a093cfd8ec43cc9f9613dfac855946d9
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
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BBall',
  props: ['stats'],
  created: function () {
    console.log(this.stats)
    this.stats = this.stats.sort(byDate)
    console.log(this.stats)
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
    avgOf10: function () {
      return `${getAvg(this.stats, 'of10') * 10}%`
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
    },
    sortedStats: function () {
      return this.stats.sort((a, b) => new Date(b.date) - new Date(a.date))
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
    }
  }
}
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
