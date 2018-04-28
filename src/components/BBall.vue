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
          <td>{{ b.of10 }} {{ getAvgOf10 }} {{ index }}</td>
          <td>{{ b.legit }} {{ getAvgLegit }}</td>
          <td>{{ b.short }} {{ getAvgShort }}</td>
          <td>{{ b.long }} {{ getAvgLong }}</td>
          <td>{{ b.left }} {{ getAvgLeft }}</td>
          <td>{{ b.right }} {{ getAvgRight }}</td>
        </tr>
      </tbody>
    </table>
	</div>
</template>

<script>
export default {
  name: 'BBall',
	data () {
		return {
			message: 'bball',
			stats: [
				{ date: '04/26/2018', legit: 12, of10: 4, short: 12, long: 14, left: 15, right: 6 },
        { date: '04/25/2018', legit: 13, of10: 3, short: 13, long: 12, left: 14, right: 7 },
				{ date: '04/24/2018', legit: 14, of10: 2, short: 14, long: 11, left: 13, right: 8 },
				{ date: '04/23/2018', legit: 15, of10: 1, short: 15, long: 10, left: 8, right: 8 },
				{ date: '04/22/2018', legit: 14, of10: 0, short: 16, long: 9, left: 9, right: 9 },
				{ date: '04/21/2018', legit: 13, of10: 2, short: 17, long: 8, left: 10, right: 12 },
				{ date: '04/20/2018', legit: 12, of10: 4, short: 18, long: 12, left: 10, right: 13 },
				{ date: '04/19/2018', legit: 11, of10: 5, short: 9, long: 13, left: 12, right: 9 },
				{ date: '04/18/2018', legit: 14, of10: 2, short: 8, long: 13, left: 11, right: 8 }
			]
		}
  },
  computed: {
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
    getClassObj(prop) {
      return {
        positive: this.stats[0][prop] < getAvg(this.stats, prop),
        negative: this.stats[0][prop] >= getAvg(this.stats, prop)
      }
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
