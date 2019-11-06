Vue.component('bubble-chart-intent', {
	extends: VueChartJs.Bubble,
	data: function () {
		return {
			datacollection: {
          labels: ['Data'],
          datasets: [
            { 
              label: 'Data One',
              backgroundColor: '#673AB7',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#673AB7',
              data: [
                {
                  x: 100,
                  y: 0,
                  r: 10
                },
                {
                  x: 60,
                  y: 30,
                  r: 20
                },
                {
                  x: 40,
                  y: 60,
                  r: 25
                },
                {
                  x: 80,
                  y: 80,
                  r: 50
                },
                {
                  x: 20,
                  y: 30,
                  r: 25
                },
                {
                  x: 0,
                  y: 100,
                  r: 5
                }
              ]
            }
          ]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: function(context) {
							var value = context.dataset.data[context.dataIndex];
							return value.r < 50 ? 'end' : 'center';
						},
						align: function(context) {
							var value = context.dataset.data[context.dataIndex];
							return value.r < 50 ? 'end' : 'center';
						},
						color: function(context) {
							var value = context.dataset.data[context.dataIndex];
							return value.r < 50 ? context.dataset.backgroundColor : 'white';
						},
						font: {
							weight: 'bold'
						},
						formatter: function(value) {
							return Math.round(value.r);
						},
						offset: 2,
						padding: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItems, data) {
              return '$' + tooltipItems.yLabel;
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200
      },
		}
  },
  created () {
    Chart.defaults.global.plugins.datalabels.color = "#fff";
    //console.log(Chart.defaults.global.plugins.datalabels)
  },
	mounted () {
		// this.chartData is created in the mixin
    this.renderChart(this.datacollection, this.options)
	}
})