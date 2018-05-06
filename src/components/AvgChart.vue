<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: [ 'sortedStats', 'runningAverages' ],
  data () {
    return {
      datacollection: {
        labels: this.sortedStats.map((stat, i) => `S.${i + 1}`),
        datasets: [
          {
            label: 'Day-to-Day Average',
            borderColor: 'rgba(111, 38, 61, 1)',
            borderWidth: 4,
            backgroundColor: 'rgba(111, 38, 61, 0.4)',
            pointBackgroundColor: 'rgba(255, 184, 28, 1)',
            pointBorderColor: 'rgba(4, 30, 66, 1)',
            pointBorderWidth: 2,
            data: this.runningAverages
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
