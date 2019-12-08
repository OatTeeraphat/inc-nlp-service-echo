export default Vue.component('line-chart-acc', {
	extends: VueChartJs.Line,
	props: ['dataChart', 'dataLabel', 'title', 'point'],
	mounted() {
		this.$nextTick(() => {
			this.createChart()
		})
	},
	methods: {
		createChart() {
			//console.log(this.dataChart)
			this.renderChart({
				labels: this.dataLabel,
				datasets: [
					{
						label: "Transaction",
						pointRadius: 2,
						pointBackgroundColor: "#673AB7",
						pointBorderWidth: 2,
						fill: false,
						backgroundColor: "#673AB7",
						borderWidth: 2,
						borderColor: "#673AB7",
						data: this.dataChart.transaction_amount
					},
					{
						label: "Can Be Slove",
						fill: false,
						pointRadius: 2,
						pointBackgroundColor: "#e83e8c",
						pointBorderWidth: 2,
						fill: false,
						backgroundColor: "#e83e8c",
						borderWidth: 2,
						borderColor: "#e83e8c",
						data: this.dataChart.slove_amount
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
									beginAtZero: false,
									maxTicksLimit: 7
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
									maxTicksLimit: 4,
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
							title: function () {
								return "Answer Ratio"
							},
							label: function (it, data) {
								let transaction = data.datasets[0].data[it.index]
								let answer = data.datasets[1].data[it.index]
								let answer_rate = parseFloat(answer / transaction * 100).toFixed(2);
								return !isNaN(answer_rate) ? answer_rate + "%" : "No Data"
							},
							footer: function (it, data) {
								let transaction = data.datasets[0].data[it[0].index]
								let answer = data.datasets[1].data[it[0].index]
								return transaction > 0 ? 'Can Be Slove ' + answer + ' From ' + transaction : "Can't Be Slove"
							}
						}
					}
				})
		}
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