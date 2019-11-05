var dashboardPresenter = Vue.component('dashboard-presenter', {
	template: `
	<div class="warp">
		<nav-component></nav-component>
		<h2 class="mb-1">Dashboard</h2>
		<p>Welcome Back, when you come, i'm be happy</p>
		<div class="row mt-4 pt-2">
			<div class="col-6">
				<div class="card">
					<div class="card-header">
							<h5 class="card-title mb-0">
									API Stats
									<button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
										<small>
											<i class="fe fe-info text-muted"></i>
										</small>
									</button>
							</h5>
					</div>
					<ul class="list-group list-group-flush">
							<li class="list-group-item p-1 ">
									<ul class="nav nav-card" id="myTab" role="tablist">
											<li class="nav-item" @click="toggle_chart.api = 'tabFirst'" >
												<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Calls</a>
											</li>
											<li class="nav-item" @click="toggle_chart.api = 'tabSecond'" >
												<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Average Request Time</a>
											</li>
										</ul>
							</li>
							<li class="list-group-item pt-5 pb-4 pr-4">
							<transition
								name="custom-classes-transition"
								mode="out-in"
								enter-active-class="animated zoomIn faster"
							>
								<div class="chart-warpper">
										<line-chart-api-usage 
											:height="120" 
											:redraw="true"
											v-if=" toggle_chart.api == 'tabFirst' " 
											key="tabFirst"
										>
										</line-chart-api-usage>
										<line-chart-api-usage 
											:height="120" 
											:redraw="true"
											v-if=" toggle_chart.api == 'tabSecond' " 
											key="tabSecond"
										>
										</line-chart-api-usage>
										<div class="row">
											<div class="col">
													<p class="graph-legend purple" v-if=" toggle_chart.api == 'tabFirst' " >Calls</p>
													<p class="graph-legend purple" v-if=" toggle_chart.api == 'tabSecond' " >Average Request Time</p>
											</div>
										</div>
								</div>
							</transition>
							</li>
						</ul>
				</div>
			</div>
			<div class="col-6">
					<div class="card">
						<div class="card-header">
								<h5 class="card-title mb-0">
										API Stats
										<button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
											<small>
												<i class="fe fe-info text-muted"></i>
											</small>
										</button>
								</h5>
						</div>
						<ul class="list-group list-group-flush">
								<li class="list-group-item p-1 ">
										<ul class="nav nav-card" id="myTab" role="tablist">
												<li class="nav-item" @click="toggle_chart.api = 'tabFirst'" >
													<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Calls</a>
												</li>
												<li class="nav-item" @click="toggle_chart.api = 'tabSecond'" >
													<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Average Request Time</a>
												</li>
											</ul>
								</li>
								<li class="list-group-item pt-5 pb-4 pr-4">
								<transition
									name="custom-classes-transition"
									mode="out-in"
									enter-active-class="animated zoomIn faster"
								>
									<div class="chart-warpper">
											<line-chart-api-usage 
												:height="120" 
												:redraw="true"
												v-if=" toggle_chart.api == 'tabFirst' " 
												key="tabFirst"
											>
											</line-chart-api-usage>
											<line-chart-api-usage 
												:height="120" 
												:redraw="true"
												v-if=" toggle_chart.api == 'tabSecond' " 
												key="tabSecond"
											>
											</line-chart-api-usage>
											<div class="row">
												<div class="col">
														<p class="graph-legend purple" v-if=" toggle_chart.api == 'tabFirst' " >Calls</p>
														<p class="graph-legend purple" v-if=" toggle_chart.api == 'tabSecond' " >Average Request Time</p>
												</div>
											</div>
									</div>
								</transition>
								</li>
							</ul>
					</div>
				</div>
		</div>
	</div>
    `,
	data: function () {
		return {
			toggle_chart : {
				api : "tabFirst"
			},
		}
	},
	created: function () {
	},
	beforeDestroy: function () {
	},
	methods: {
	},
})