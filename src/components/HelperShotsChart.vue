<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['sortedStats'],
  data: function () {
    return {
      datacollection: {
        labels: this.getData('date'),
        datasets: [
          {
            label: 'short',
            fill: false,
            borderColor: '#4392f1',
            pointBackgroundColor: 'white',
            pointBorderColor: '#4392f1',
            pointBorderWidth: 2,
            data: this.getData('short')
          },
          {
            label: 'long',
            fill: false,
            borderColor: '#3BCD07',
            pointBackgroundColor: 'white',
            pointBorderColor: '#3BCD07',
            pointBorderWidth: 2,
            data: this.getData('long')
          }
        ]
      }
    }
  },
  methods: {
    getData: function (prop) {
      if (prop === 'date') {
        return this.sortedStats.map((stat, i) => `S.${i + 1}`)
      }
      return this.sortedStats.map(stat => stat[prop]).reverse()
    },
    shortDate: function (dateString) {
      const dateItems = dateString.split('T')
      const monthDay = dateItems[0].split('-')
      return monthDay.slice(1).join('/')
    }
  },
  mounted: function () {
    this.renderChart(this.datacollection)
  }
}
</script>
