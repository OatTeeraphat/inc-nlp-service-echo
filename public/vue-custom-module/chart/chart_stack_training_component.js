Vue.component('stack-chart-training', {
	extends: VueChartJs.HorizontalBar,
	
  beforeMount () {
    //this.addPlugin(horizonalLinePlugin)
  },
  mounted () {
    this.renderChart({
      datasets: [
			{	
					label : 'GREETING',
					data: [21],
					backgroundColor: colorByStory.GREETING ,
			},
			{		
					label : 'FAQ',
					data: [39],
					backgroundColor: colorByStory.FAQ,
			},
			{		
					label : 'CHITCHAT',
					data: [55],
					backgroundColor: colorByStory.CHITCHAT,
			},
			{		
					label : 'PRODUCT',
					data: [85],
					backgroundColor: colorByStory.PRODUCT,
			},
			{	
					label : 'Non-Training',
					data: [100],
					backgroundColor: '#aaaaaa',
			}
		]}, {
			plugins: {
				datalabels: {
						display: false
					}
				},
			hover :{
					animationDuration:0
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
							display: false,
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
			legend:{
					display:false
			},
			tooltips: {
				mode: 'single',
				position : 'average',
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
						return data.datasets[it[0].datasetIndex].label
					},
					label: function (it) {
						return it.xLabel + '.00 %'
					},
					footer: function (it, data) {
						//console.log(it, data)
						return it[0].x + ' Training Set'
					}
				}
			}
		}
		)
	},
})

