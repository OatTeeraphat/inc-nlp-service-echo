Vue.component('line-chart-acc', {
	extends: VueChartJs.Line,
	mounted() {
		this.renderChart({
			labels: [['June', '1'], '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', ['June', '12']],
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
					data: [0, 30, 89, 85, 87, 90, 80, 95, 91, 96, 90, 100]
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
					data: [0, 12, 30, 45, 48, 62, 72, 90, 80, 85, 73, 90]
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
				mode: 'single',
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
					title: function () {
						return "Answer Ratio"
					},
					label: function (it, data) {
						let transaction = data.datasets[0].data[it.index]
						let answer = data.datasets[1].data[it.index]
						let answer_rate =  parseFloat(answer/transaction * 100).toFixed(2);
						return  !isNaN(answer_rate) ? answer_rate + "%" : "No Data"
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
})