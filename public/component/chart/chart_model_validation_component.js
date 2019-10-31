Vue.component('line-chart', {
	extends: VueChartJs.Line,
	mounted() {
		this.renderChart({
			labels: ['10', '20', '30', '40', '50', '60', '70'],
			datasets: [
				{
					label: "Accuracy",
					pointRadius: 4,
					pointBackgroundColor: "rgba(255,255,255,1)",
					pointBorderWidth: 2,
					fill: false,
					backgroundColor: "transparent",
					borderWidth: 2,
					borderColor: "#673AB7",
					data: [0, 19, 27, 35, 60, 87, 100]
				},
				{
					label: "Batch Size",
					fill: false,
					pointRadius: 4,
					pointBackgroundColor: "rgba(255,255,255,1)",
					pointBorderWidth: 2,
					backgroundColor: "transparent",
					borderWidth: 2,
					borderColor: "#e83e8c",
					data: [0, 20, 30, 42, 50, 75, 83]
				}
			],
		}, { 
			responsive: true, 
			maintainAspectRatio: false,
			maintainAspectRatio: false,
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
							display: true,
							labelString: 'Batch Size',
							fontStyle: 'bold'
						},
						gridLines: {
							display: false,
						},
						ticks: {
							beginAtZero: true,
							maxTicksLimit : 7
						}
					}
				],
				yAxes: [
					{	
						scaleLabel: {
							display: true,
							labelString: 'Accuracy',
							fontStyle: 'bold'

						},
						ticks: {
							beginAtZero: true,
							maxTicksLimit: 7
						}
					}
				]
			},
			tooltips: {
				mode: 'label',
				titleFontColor: "#888",
				bodyFontColor: "#555",
				titleFontSize: 12,
				bodyFontSize: 14,
				backgroundColor: "rgba(256,256,256,0.95)",
				displayColors: false,
				borderColor: "rgba(220, 220, 220, 0.9)",
				borderWidth: 2,
				callbacks: {
					title: function (it) {
						return "Batch Size " + it[0].xLabel
					},
					label: function (tooltipItem, data) {
						let label = data.datasets[tooltipItem.datasetIndex].label
						return label + " : " + Number(tooltipItem.yLabel);
					}
				}
			}
		})
	}
})