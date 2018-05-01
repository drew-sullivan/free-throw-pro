<script>
// https://github.com/apertureless/vue-chartjs

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['sortedStats'],
  data () {
    return {
      datacollection: {
        // Data to be represented on x-axis
        labels: this.sortedStats.map(stat => stat.date).reverse(),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
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
