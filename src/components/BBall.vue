<template>
	<div>
    <table class="table table-striped table-dark">
      <tbody>
        <tr>
          <td>Lifetime</td>
          <td>{{ avgOf10 }}%</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-striped table-dark">
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
        <tr v-for="(b, index) in stats" :key="index">
          <td>{{ b.date }}</td>
          <td>{{ b.of10 }}</td>
          <td>{{ b.legit }}
            <span>{{ isHigherThanLegit }}</span>
          </td>
          <td>{{ b.short }}</td>
          <td>{{ b.long }}</td>
          <td>{{ b.left }}</td>
          <td>{{ b.right }}</td>
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
        { date: '04/26/2018', legit: 13, of10: 3, short: 13, long: 12, left: 14, right: 7 },
				{ date: '04/26/2018', legit: 14, of10: 2, short: 14, long: 11, left: 13, right: 8 },
				{ date: '04/26/2018', legit: 15, of10: 1, short: 15, long: 10, left: 8, right: 8 },
				{ date: '04/26/2018', legit: 14, of10: 0, short: 16, long: 9, left: 9, right: 9 },
				{ date: '04/26/2018', legit: 13, of10: 2, short: 17, long: 8, left: 10, right: 12 },
				{ date: '04/26/2018', legit: 12, of10: 4, short: 18, long: 12, left: 10, right: 13 },
				{ date: '04/26/2018', legit: 11, of10: 5, short: 9, long: 13, left: 12, right: 9 },
				{ date: '04/26/2018', legit: 14, of10: 2, short: 8, long: 13, left: 11, right: 8 }
			]
		}
  },
  computed: {
    avgOf10: function () {
      return (this.stats.reduce((acc, stat) => acc + stat.of10, 0) / this.stats.length * 10).toFixed(2)
    },
    isHigherThanLegit: function () {
      return this.stats.reduce((min, curr) => curr.legit < min.val ? curr.legit : min, this.stats[0].legit)
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
</style>
