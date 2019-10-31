var dashboardPresenter = Vue.component('dashboard-presenter', {
	template: `
	<div class="warp">
		<nav-presenter></nav-presenter>
		<h1>Home</h1>
		<p>This is home page</p>
		<div class="row">
			<div class="col-6">
			<p>Bash Accuracy</p>
			<line-chart></line-chart>
			</div>
		</div>
	</div>
    `,
	data: function () {
		return {
		}
	},
	created: function () {

	},
	beforeDestroy: function () {
	},
	methods: {
	},
})