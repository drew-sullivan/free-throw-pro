<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: [ 'sortedStats', 'lineOfBestFit' ],
  data () {
    return {
      datacollection: {
        labels: this.sortedStats.map((stat, i) => `S.${i + 1}`),
        datasets: [
          {
            label: 'Day-to-Day Average',
            borderColor: 'rgba(105, 28, 43, 1)',
            borderWidth: 4,
            backgroundColor: 'rgba(105, 28, 43, .4)',
            pointBackgroundColor: 'rgba(250, 169, 22, 1)',
            pointBorderColor: 'rgba(4, 30, 66, 1)',
            pointBorderWidth: 2,
            data: this.sortedStats.map(stat => stat['of10']).reverse()
          },
          {
            label: 'Line of Best Fit',
            fill: false,
            borderColor: 'rgba(4, 30, 66, 1)',
            borderWidth: 4,
            backgroundColor: 'rgba(4, 30, 66, .4)',
            pointBackgroundColor: 'rgba(4, 30, 66, 1)',
            pointBorderColor: 'rgba(250, 169, 22, 1)',
            pointBorderWidth: 2,
            data: this.lineOfBestFit
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection)
  },
  methods: {
    shortDate: function (dateString) {
      const dateItems = dateString.split('T')
      const monthDay = dateItems[0].split('-')
      return monthDay.slice(1).join('/')
    }
  }
}
</script>
