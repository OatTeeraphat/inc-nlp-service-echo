const colorByStory = {
	GREETING  : "#673AB7",
	CHITCHAT  : "#e83e8c",
	FAQ       : "#224367",
	PRODUCT   : "#ffb43b",
}

export default Vue.component('stack-chart-training', {
	extends: VueChartJs.HorizontalBar,
	props: {
		dataChart: Object
	},
  	mounted () {
		this.$nextTick(() => {
			this.createChart()
		})
	},
	methods : {
		createChart(){
			//console.log(this.dataChart)
			this.renderChart({
				datasets: this.dataChart
			}, {
					plugins: {
						datalabels: {
							display: false
						}
					},
					hover: {
						animationDuration: 0
					},
					layout: {
						padding: {
							left: -7.5,
							right: 5,
							top: 20,
							bottom: -10
						}
					},
					scales: {
						xAxes: [{
							scaleLabel: {
								display: false,
							},
							gridLines: {
								display: false,
								drawBorder: false
							},
							ticks: {
								beginAtZero: true,
								max : 100,
								display: false
							},
							stacked: true
						}],
						yAxes: [{
							scaleLabel: {
								display: false,
							},
							gridLines: {
								display: false,
								drawBorder: false
							},
							ticks: {
								display: false
							},
							stacked: true
						}]
					},
					legend: {
						display: false
					},
					tooltips: {
						mode: 'single',
						position: 'average',
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
								return data.datasets[it[0].datasetIndex].label
							},
							label: function (it, data) {
								console.log(it, data)
								return data.datasets[it.datasetIndex].percentage + '%'
							},
							footer: function (it, data) {
								//console.log(it, data)
								return data.datasets[it[0].datasetIndex].amount + ' Training Set'
							}
						}
					}
				}
			)
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

