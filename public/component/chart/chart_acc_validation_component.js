Vue.component('line-chart-acc', {
	extends: VueChartJs.Line,
	mounted() {
		this.renderChart({
			labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
			datasets: [
				{
					label: "Accuracy",
					pointRadius: 2,
					pointBackgroundColor: "#673AB7",
					pointBorderWidth: 2,
					fill: false,
					backgroundColor: "#673AB7",
					borderWidth: 2,
					borderColor: "#673AB7",
					lineTension: 0,
					data: [82, 87, 80, 95, 91, 83, 87, 89, 85, 90]
				},
				{
					label: "Batch Size",
					fill: false,
					pointRadius: 2,
					pointBackgroundColor: "#e83e8c",
					pointBorderWidth: 2,
					fill: false,
					backgroundColor: "#e83e8c",
					borderWidth: 2,
					lineTension: 0,
					borderColor: "#e83e8c",
					data: [20, 40, 60, 90, 87, 91, 92, 95, 99, 100]
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