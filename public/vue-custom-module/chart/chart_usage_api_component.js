export default Vue.component('line-chart-api-usage', {
	extends: VueChartJs.Line,
	props: ['dataChart', 'dataLabel', 'title', 'point'],
	mounted() {
		this.$nextTick(() => {
			this.createChart()
		})
	},
	methods: {
		createChart() {
			
			//console.log("dataChart:", this.dataChart)
			//console.log("dataLabel:", this.dataLabel)
			this.renderChart({
				labels: this.dataLabel,
				datasets: [
					{
						label: this.title,
						pointRadius: !this.point ? 0 : 2,
						pointBackgroundColor: "#673AB7",
						pointBorderWidth: 2,
						fill: false,
						backgroundColor: "#673AB7",
						borderWidth: 2,
						borderColor: "#673AB7",
						lineTension: 0,
						data: this.dataChart
					}
				],
			},
			{
				plugins: {
					datalabels: {
						display: false
					}
				},
				responsive: true,
				maintainAspectRatio: true,
				bezierCurve: false,
				layout: {
					padding: {
						right: 10
					}
				},
				legend: {
					display: false
				},
				scales: {
					xAxes: [
						{
							scaleLabel: {
								display: false,
							},
							gridLines: {
								display: false,
							},
							ticks: {
								beginAtZero: false
							}
						}
					],
					yAxes: [
						{
							scaleLabel: {
								display: false,
							},
							ticks: {
								beginAtZero: true,
								maxTicksLimit: 3,
								minTicksLimit: 2
							}
						}
					]
				},
				tooltips: {
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
							console.log("it, data: ", it, data)
							return it[0].yLabel > 0 ? data.datasets[0].label : false
						},
						label: function (it) {
							return Number(it.yLabel);
						},
						footer: function (it, data) {
							return data.datasets[0].data[it[0].index].date;
						}
					}
				}
			})
		},
	},
	watch: {
		dataChart() {
			this.$nextTick(() => {
				this.createChart()
			})
		},
		dataLabel() {
			this.$nextTick(() => {
				this.createChart()
			})
		}
	}
})