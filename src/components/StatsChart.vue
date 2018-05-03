<script>
// https://github.com/apertureless/vue-chartjs

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: [ 'sortedStats' ],
  data () {
    return {
      datacollection: {
        labels: this.sortedStats.map(stat => stat.date).reverse(),
        datasets: [
          {
            label: 'Out of 10',
            fill: false,
            borderColor: 'rgba(111, 38, 61, 1)',
            backgroundColor: 'rgba(111, 38, 61, 0.4)',
            pointBackgroundColor: 'rgba(255, 184, 28, 1)',
            pointBorderColor: 'rgba(4, 30, 66, 1)',
            pointBorderWidth: 3,
            data: this.sortedStats.map(stat => stat.of10).reverse()
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection)
  }
}
</script>
