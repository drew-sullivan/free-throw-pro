<script>
// https://github.com/apertureless/vue-chartjs

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['sortedStats'],
  data () {
    return {
      datacollection: {
        labels: this.sortedStats.map(stat => stat.date).reverse(),
        datasets: [
          {
            label: 'legit',
            fill: false,
            borderColor: '#FF0476',
            pointBackgroundColor: 'white',
            pointBorderColor: '#FF0476',
            pointBorderWidth: 2,
            data: this.sortedStats.map(stat => stat.legit).reverse()
          },
          {
            label: 'short',
            fill: false,
            borderColor: '#FE9A00',
            pointBackgroundColor: 'white',
            pointBorderColor: '#FE9A00',
            pointBorderWidth: 2,
            data: this.sortedStats.map(stat => stat.short).reverse()
          },
          {
            label: 'long',
            fill: false,
            borderColor: '#00D647',
            pointBackgroundColor: 'white',
            pointBorderColor: '#00D647',
            pointBorderWidth: 2,
            data: this.sortedStats.map(stat => stat.long).reverse()
          },
          {
            label: 'left',
            fill: false,
            borderColor: '#006DD4',
            pointBackgroundColor: 'white',
            pointBorderColor: '#006DD4',
            pointBorderWidth: 2,
            data: this.sortedStats.map(stat => stat.left).reverse()
          },
          {
            label: 'right',
            fill: false,
            borderColor: '#5D2E8C',
            pointBackgroundColor: 'white',
            pointBorderColor: '#5D2E8C',
            pointBorderWidth: 2,
            data: this.sortedStats.map(stat => stat.right).reverse()
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
