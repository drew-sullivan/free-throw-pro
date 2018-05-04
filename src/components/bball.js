import AvgChart from './AvgChart'
import HelperShotsChart from './HelperShotsChart.vue'

export default {
  name: 'BBall',
  props: ['stats'],
  components: {
    avgChart: AvgChart,
    helperShotsChart: HelperShotsChart
  },
  data () {
    return {
      shotTypes: ['of10', 'short', 'long', 'left', 'right', 'legit'],
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
    freeThrowAverage: function () {
      return this.getAvg(this.stats, 'of10') * 10
    },
    statsLen: function () {
      return this.stats.length - 1
    },
    sortedStats: function () {
      return this.stats.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    runningAverages: function () {
      const of10Arr = Array.from(this.sortedStats, x => +x.of10).reverse()
      const runningAverages = []
      for (let i = 1; i <= of10Arr.length; i++) {
        let currentArray = of10Arr.slice(0, i)
        runningAverages.push(+(currentArray.reduce((acc, curr) => acc + curr) / currentArray.length).toFixed(2))
      }
      return runningAverages
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
      location.reload()
    },
    cancel: function () {
      this.toggle()
    },
    toggle: function () {
      this.adding = !this.adding
    },
    getColorStatus: function (prop) {
      const stat = this.sortedStats[0][prop]
      const avg = this.getAvg(this.stats, prop)
      if (prop === 'of10') {
        return {
          positive: +stat > +avg,
          negative: +stat <= +avg
        }
      } else {
        return {
          positive: +stat < +avg,
          negative: +stat >= +avg
        }
      }
    },
    getAvg: function (arr, prop) {
      return (arr.reduce((acc, stat) => acc + +stat[prop], 0) / arr.length).toFixed(2)
    }
  },
  filters: {
    caps: function (str) {
      if (str === 'of10') {
        return 'OF 10'
      }
      return str.toUpperCase()
    },
    shortDate: function (dateString) {
      const dateItems = dateString.split('-')
      return dateItems.slice(1).join('/')
    }
  }
}
