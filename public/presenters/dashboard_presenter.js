var dashboardPresenter = Vue.component('dashboard-presenter', {
	template: `
	<div class="warp">
		<nav-component></nav-component>
		<h2 class="mb-1 d-none">Dashboard</h2>
		<p class="d-none" >Welcome Back, when you come, i'm be happy</p>
		<div class="row">
			<div class="col-6">
				<div class="card mb-4">
						<div class="card-header">
								<h5 class="card-title mb-0">
										App Info
										<button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
											<small>
												<i class="fe fe-info text-muted"></i>
											</small>
										</button>
								</h5>
						</div>
						<div class="card-body">
								<div class="d-flex">
										<div class="col-12 pt-2 pb-4">
												<h3 class="card-title mb-0"><strong>Incommon Studio</strong></h3>
												<small class="text-muted">App ID : 632861333807100</small>
										</div>
								</div>
							<div class="d-flex">
									<div class="col-6">
											<small class="text-muted">Remaining Call</small>
											<h4 class="card-title text-purple dashboard-usage">Unlimited<span>(∞)</span></h4>
									</div>
									<div class="col-6">
											<small class="text-muted">Free Training Storage</small>
											<h4 class="card-title text-purple dashboard-usage">437 Mb<span>(500 Mb)</span></h4>
									</div>
							</div>
						</div>
				</div>
				<div class="card mb-4">
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
				<div class="card mb-5">
						<div class="card-header">
								<h5 class="card-title mb-0">
										Model Stats
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
												<li class="nav-item" @click="toggle_chart.model = 'tabFirst'" >
													<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Calls</a>
												</li>
												<li class="nav-item" @click="toggle_chart.model = 'tabSecond'" >
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
											<line-chart-acc
												:height="200" 
												:redraw="true"
												v-if=" toggle_chart.model == 'tabFirst' " 
												key="tabFirst"
											>
											</line-chart-acc>
											<line-chart-api-usage 
												:height="200" 
												:redraw="true"
												v-if=" toggle_chart.model == 'tabSecond' " 
												key="tabSecond"
											>
											</line-chart-api-usage>
											<div class="row">
												<div class="col">
														<p class="graph-legend purple" v-if=" toggle_chart.model == 'tabFirst' " >Calls</p>
														<p class="graph-legend purple" v-if=" toggle_chart.model == 'tabSecond' " >Average Request Time</p>
												</div>
											</div>
									</div>
								</transition>
								</li>
							</ul>
				</div>
			</div>
			<div class="col-6">
				<div class="card mb-4">
						<div class="card-header">
								<h5 class="card-title mb-0">
										Top Intent
										<button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
											<small>
												<i class="fe fe-info text-muted"></i>
											</small>
										</button>
								</h5>
						</div>
						<div class="card-body">
								<bubble-chart-intent >
								</bubble-chart-intent>
						</div>
				</div>
				<div class="card mb-4">
						<div class="card-header">
								<h5 class="card-title mb-0">
										Training Stats
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
												<li class="nav-item" @click="toggle_chart.trainig = 'tabFirst'" >
													<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Summary</a>
												</li>
												<li class="nav-item" @click="toggle_chart.trainig = 'tabSecond'" >
													<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Data Growth</a>
												</li>
											</ul>
								</li>
								<li class="list-group-item pt-5 pb-4 pr-4">
								<transition
									name="custom-classes-transition"
									mode="out-in"
									enter-active-class="animated zoomIn faster"
								>
									<div class="chart-warpper dashboard-summary">
											<h3 class="counter" v-if=" toggle_chart.trainig == 'tabFirst' " >1,453<span>Training Set</span></h3>
											<stack-chart-training
												:height="100" 
												:redraw="true"
												v-if=" toggle_chart.trainig == 'tabFirst' " 
												key="tabFirst"
											></stack-chart-training>
											<line-chart-api-usage 
												:height="120" 
												:redraw="true"
												v-if=" toggle_chart.trainig == 'tabSecond' " 
												key="tabSecond"
											>
											</line-chart-api-usage>
											<div class="row">
												<div class="col">
														<p class="graph-legend purple" v-if=" toggle_chart.trainig == 'tabFirst' " >Non Training Data</p>
														<p class="graph-legend purple" v-if=" toggle_chart.trainig == 'tabSecond' " >Average Request Time</p>
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
				api : "tabFirst",
				model : "tabFirst",
				trainig : "tabFirst"
			},
		}
	},
	beforeCreate : function (){
	},
	created: function () {

	},
	beforeDestroy: function () {
	},
	methods: {
	},
})