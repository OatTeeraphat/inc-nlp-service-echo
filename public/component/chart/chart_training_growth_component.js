Vue.component('line-chart-training-growth', {
	extends: VueChartJs.Line,
	mounted() {
		this.renderChart({
			labels: [['June', '1'], '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', ['June', '12']],
			datasets: [
				{
					label: "Calls",
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
							maxTicksLimit : 7
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
				mode: 'dataset',
				titleFontColor: "#888",
				titleFontSize: 12,
				bodyFontColor: "#673AB7",
				bodyFontSize: 16,
				bodyFontStyle: 'bold',
				footerFontSize: 10,
				footerFontStyle: 'bold',
				footerFontColor: "#888",
				footerSpacing : 2,
				backgroundColor: "rgba(256,256,256,0.95)",
				displayColors: false,
				borderColor: "rgba(220, 220, 220, 0.9)",
				borderWidth: 2,
				callbacks: {
					title: function (it, data) {
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
	}
})