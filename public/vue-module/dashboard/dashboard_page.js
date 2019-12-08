export const dashboardPage = Vue.component('dashboard-page', {
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
												<h3 class="card-title mb-0 preload">
													<strong>{{ app_info.name }}</strong>
													<div class="linear-preload" v-bind:class="{ invisible: app_info.name }">
														<div class="indeterminate-preload"></div>
													</div>
													<div class="linear-preload span-next_warp" v-bind:class="{ invisible: app_info.name }">
														<div class="indeterminate-preload"></div>
													</div>
												</h3>
												<small class="text-muted" v-bind:class="{ invisible: !app_info.name }">App ID : <span class="position-relative"> {{ app_info.id.substr(0,20) }} </span> </small>
										</div>
								</div>
							<div class="d-flex">
									<div class="col-6">
											<small class="text-muted">Remaining Call</small>
											<h4 class="card-title text-purple dashboard-usage preload">
												<context v-bind:class="{ invisible: !app_info.name }" >{{ app_info.plan }}</context><span v-bind:class="{ invisible: !app_info.name }">(∞)</span>
												<div class="linear-preload" v-bind:class="{ invisible: app_info.name }">
													<div class="indeterminate-preload"></div>
												</div>
											</h4>
									</div>
									<div class="col-6">
											<small class="text-muted">Free Training Storage</small>
											<h4 class="card-title text-purple dashboard-usage preload">
												<context v-bind:class="{ invisible: !app_info.name }" >{{ app_info.record_limit }} Mb</context><span v-bind:class="{ invisible: !app_info.name }">(500 Mb)</span>
												<div class="linear-preload" v-bind:class="{ invisible: app_info.name }">
													<div class="indeterminate-preload"></div>
												</div>
											</h4>
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
											:data-chart="$dashboardPresenter.view.api_stat.call"
											:data-label="$dashboardPresenter.view.api_stat.label"
											:title="'Calls'"
											:point=true
											v-if=" toggle_chart.api == 'tabFirst' " 
											key="tabFirst"
										>
										</line-chart-api-usage>
										<line-chart-api-usage 
											:height="120" 
											:redraw="true"
											:data-chart="$dashboardPresenter.view.api_stat.avg_time"
											:data-label="$dashboardPresenter.view.api_stat.label"
											:title="'Avg. Time (ms)'"
											:point=true
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
				<div class="card mb-4">
						<div class="card-header">
								<h5 class="card-title mb-0">
										Activity
										<button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
											<small>
												<i class="fe fe-info text-muted"></i>
											</small>
										</button>
								</h5>
						</div>
						<div class="row p-3">
							<div class="col">
									<div class="media">
											<div class="media-icon align-self-start mr-3 rounded">
													<i class="fe fe-cpu"></i>
											</div>
											<div class="media-body">
												<h5 class="mt-0"><span>Upgrade Version To 1.0.4 Successfuly</span></h5>
												<p><span class="text-muted"><i class="fe fe-compass mr-1"></i>CONSOLE</span> • Today 2:28 PM</p>
											</div>
									</div>
									<div class="media">
											<div class="media-icon align-self-start mr-3 rounded">
													<i class="fe fe-database"></i>
											</div>
											<div class="media-body">
												<h5 class="mt-0"><span>Chanasit.b :</span> Upload Training Set</h5>
												<p><span class="text-muted"><i class="fe fe-link mr-1"></i>API</span> • Today 2:28 PM  </p>
											</div>
									</div>
									<div class="media">
											<div class="media-icon warning align-self-start mr-3 rounded">
													<i class="fe fe-user"></i>
											</div>
											<div class="media-body">
												<h5 class="mt-0"><span>Twatchai.c :</span> Set Role Teeraphat A. to Admin</h5>
												<p><span class="text-muted"><i class="fe fe-compass mr-1"></i>CONSOLE</span> • 6 Nov 2:28 PM</p>
											</div>
									</div>
									<div class="media">
											<div class="media-icon danger align-self-start mr-3 rounded">
													<i class="fe fe-cpu"></i>
											</div>
											<div class="media-body">
												<h5 class="mt-0"><span>Please Improve Your Training Set Now</span></h5>
												<p><span class="text-muted"><i class="fe fe-alert-triangle mr-1"></i>ALEART</span> • 6 Nov 2:28 PM</p>
											</div>
									</div>
							</div>
						</div>
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
								<bubble-chart-intent
								 :data-chart="$dashboardPresenter.view.bubble_chart.data"
								>
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
												:data-chart="$dashboardPresenter.view.training_stat.stacks"
												v-if=" toggle_chart.trainig == 'tabFirst' " 
												key="tabFirst"
											></stack-chart-training>
											<line-chart-api-usage 
												:height="120" 
												:redraw="true"
												:data-chart="$dashboardPresenter.view.training_stat.amount"
												:data-label="$dashboardPresenter.view.training_stat.label"
												:title="'Total Data'"
												:point=false
												v-if=" toggle_chart.trainig == 'tabSecond' " 
												key="tabFirst"
											>
											</line-chart-api-usage>
											<div class="row">
												<div class="col">
														<p class="graph-legend purple" v-if=" toggle_chart.trainig == 'tabFirst' " >Non Training Data</p>
														<p class="graph-legend purple" v-if=" toggle_chart.trainig == 'tabSecond' " >Amount Of Data Growth</p>
												</div>
											</div>
									</div>
								</transition>
								</li>
							</ul>
				</div>
				<div class="card mb-4">
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
							<li class="list-group-item pt-4 pb-4 pr-4">
							<transition
								name="custom-classes-transition"
								mode="out-in"
								enter-active-class="animated zoomIn faster"
							>
								<div class="chart-warpper dashboard-summary">
										<h3 class="mb-4 mt-1" v-if=" toggle_chart.model == 'tabFirst' " >{{ $dashboardPresenter.view.model_stat.ratio }}%<span>Answer Ratio In Period</span></h3>
										<line-chart-acc
											:height="175" 
											:redraw="true"
											:data-chart="$dashboardPresenter.view.model_stat.amount"
											:data-label="$dashboardPresenter.view.model_stat.label"
											v-if=" toggle_chart.model == 'tabFirst' " 
											key="tabFirst"
										>
										</line-chart-acc>
										<div class="row">
											<div class="col d-flex">
													<p class="graph-legend purple" v-if=" toggle_chart.model == 'tabFirst' " >All Transaction</p>
													<p class="graph-legend pink ml-5" v-if=" toggle_chart.model == 'tabFirst' " >Can Be Slove <span>(Conf : {{ $dashboardPresenter.view.model_stat.confidence }}%)</span></p>
													<p class="graph-legend purple" v-if=" toggle_chart.model == 'tabSecond' " >Answer</p>
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
	data: function() {
		//console.log(this.$dashboardPresenter.view)
		return this.$dashboardPresenter.view
	},
	mounted : function() {
		this.$dashboardPresenter.getInitialState() 
	}
})