<script>
import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: '#e0e0e0',
                tickMarkLength: 4,
                zeroLineColor: '#e0e0e0'
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: '#e0e0e0',
                drawOnChartArea: false,
                tickMarkLength: 4,
                zeroLineColor: '#e0e0e0'
              }
            }
          ]
        }
        // tooltips: {
        //   callbacks: {
        //     title: (value) => {
        //       const [tooltip] = value
        //       return tooltip.label
        //     }
        //   }
        // }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
