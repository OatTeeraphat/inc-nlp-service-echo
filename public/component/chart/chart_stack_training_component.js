Vue.component('stack-chart-training', {
  extends: VueChartJs.HorizontalBar,
  beforeMount () {
    this.addPlugin(horizonalLinePlugin)
  },
  mounted () {
    this.renderChart({
      datasets: [{
					data: [17],
					backgroundColor: "rgba(63,103,126,1)",
					hoverBackgroundColor: "rgba(50,90,100,1)"
			},{
					data: [59],
					backgroundColor: "rgba(63,143,126,1)",
					hoverBackgroundColor: "rgba(63,143,126,1)"
			},{
					data: [72],
					backgroundColor: "rgba(63,203,226,1)",
					hoverBackgroundColor: "rgba(46,185,235,1)"
			}]
    }, {
			plugins: {
				datalabels: {
					 display: false
				}
			},
			tooltips: {
					enabled: false
			},
			hover :{
					animationDuration:0
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
							beginAtZero: false,
							maxTicksLimit : 7,
							display: false,
						},
							stacked: false
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
									fontFamily: "'Open Sans Bold', sans-serif",
									fontSize:11
							},
							stacked: true
					}]
			},
			legend:{
					display:false
			}	}
		)
  }
})

