export default Vue.component('bubble-chart-intent', {
  extends: VueChartJs.Bubble,
  props: ['dataChart'],
  created() {
    Chart.defaults.global.plugins.datalabels.color = "#fff";
    //console.log(Chart.defaults.global.plugins.datalabels)
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.dataChart)
      this.createChart()
    })
  },
  methods : {
    createChart() {
      this.renderChart({
        labels: ['Data'],
        datasets: this.dataChart
      }, 
      {
          plugins: {
            datalabels: {
              anchor: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value.r < 30 ? 'end' : 'center';
              },
              align: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value.r < 30 ? 'end' : 'center';
              },
              color: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value.r < 30 ? colorByStory[value.story_name] : 'white';
              },
              font: {
                weight: 'bold',
                family: "'Poppins', 'Bai Jamjuree'",
                textAlign: 'center'
              },
              formatter: function (value, context) {
                var value = context.dataset.data[context.dataIndex];
                return value.r > 10 ? value.intent + '\n' + value.calls : '';
              },
              offset: 2,
              padding: 0
            }
          },
          scales: {
            yAxes: [{
              angleLines: {
                display: false
              },
              ticks: {
                display: false,
                maxTicksLimit: 2,
                max: 100
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }],
            xAxes: [{
              ticks: {
                display: false,
                maxTicksLimit: 2
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true,
            mode: 'single',
            titleFontColor: "#888",
            titleFontSize: 12,
            bodyFontColor: "#673AB7",
            bodyFontSize: 16,
            bodyFontStyle: 'bold',
            footerFontSize: 10,
            footerFontStyle: 'bold',
            footerFontColor: "#888",
            footerSpacing: 2,
            backgroundColor: "rgba(256,256,256,0.95)",
            displayColors: false,
            borderColor: "rgba(220, 220, 220, 0.9)",
            borderWidth: 2,
            callbacks: {
              title: function (it, data) {
                //console.log(it, data)
                return data.datasets[it[0].datasetIndex].data[it[0].index].intent
              },
              label: function (it, data) {
                console.log(it, data)
                return data.datasets[it.datasetIndex].data[it.index].calls
              },
              footer: function (it, data) {
                return data.datasets[it[0].datasetIndex].label;
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          height: 150
      })
    }
  },
  watch: {
    dataChart() {
      this.$nextTick(() => {
        this.createChart()
      })
    }
  }
})