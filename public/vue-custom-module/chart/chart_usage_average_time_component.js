export default Vue.component('line-chart-average-time-usage', {
	extends: VueChartJs.Line,
	mounted() {
		this.renderChart({
			labels: [['June', '1'], '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', ['June', '12']],
			datasets: [
				{
					label: "Average Request Time",
					pointRadius: 2,
					pointBackgroundColor: "#673AB7",
					pointBorderWidth: 2,
					fill: false,
					backgroundColor: "#673AB7",
					borderWidth: 2,
					borderColor: "#673AB7",
					lineTension: 0,
					data: [
						{ y: 0, date: "Sunday, June 1, 2019" },
						{ y: 30, date: "Monday, June 2, 2019" },
						{ y: 32, date: "Monday, June 2, 2019" },
						{ y: 65, date: "Monday, June 2, 2019" },
						{ y: 21, date: "Monday, June 2, 2019" },
						{ y: 13, date: "Monday, June 2, 2019" },
						{ y: 95, date: "Monday, June 2, 2019" },
						{ y: 4, date: "Monday, June 2, 2019" },
						{ y: 13, date: "Monday, June 2, 2019" },
						{ y: 95, date: "Monday, June 2, 2019" },
						{ y: 90, date: "Monday, June 2, 2019" },
						{ y: 90, date: "Monday, June 2, 2019" }
					]
				}
			],
		}, { 
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
							maxTicksLimit : 7
						}
					}
				],
				yAxes: [
					{	
						scaleLabel: {
							display: true,
							fontStyle: 'bold'
						},
						ticks: {
							beginAtZero: false,
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
				footerFontSize: 12,
				footerFontStyle: 'normal',
				footerFontColor: "#888",
				footerSpacing : 2,
				backgroundColor: "rgba(256,256,256,0.95)",
				displayColors: false,
				borderColor: "rgba(220, 220, 220, 0.9)",
				borderWidth: 2,
				
				callbacks: {
					title: function (it, data) {
						return data.datasets[0].label
					},
					label: function (it) {
						return Number(it.yLabel) + " ms";
					},
					footer: function (it, data) {
						return data.datasets[0].data[it[0].index].date;
					}
				}
			}
		})
	}
})