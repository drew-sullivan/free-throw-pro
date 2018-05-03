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
            label: 'legit',
            fill: false,
            borderColor: '#FF0476',
            pointBackgroundColor: 'white',
            pointBorderColor: '#FF0476',
            pointBorderWidth: 2,
            data: this.getData('legit')
          },
          {
            label: 'short',
            fill: false,
            borderColor: '#FE9A00',
            pointBackgroundColor: 'white',
            pointBorderColor: '#FE9A00',
            pointBorderWidth: 2,
            data: this.getData('short')
          },
          {
            label: 'long',
            fill: false,
            borderColor: '#00D647',
            pointBackgroundColor: 'white',
            pointBorderColor: '#00D647',
            pointBorderWidth: 2,
            data: this.getData('long')
          },
          {
            label: 'left',
            fill: false,
            borderColor: '#006DD4',
            pointBackgroundColor: 'white',
            pointBorderColor: '#006DD4',
            pointBorderWidth: 2,
            data: this.getData('left')
          },
          {
            label: 'right',
            fill: false,
            borderColor: '#5D2E8C',
            pointBackgroundColor: 'white',
            pointBorderColor: '#5D2E8C',
            pointBorderWidth: 2,
            data: this.getData('right')
          }
        ]
      }
    }
  },
  methods: {
    getData: function (prop) {
      return this.sortedStats.map(stat => stat[prop]).reverse()
    }
  },
  mounted: function () {
    this.renderChart(this.datacollection)
  }
}
</script>
