var navPresenter = Vue.component('nav-component', {
	template: `
	<div class="fixed-top navbar-warpper bg-light">
	
		<nav class="navbar navbar-expand-lg navbar-dark container justify-content-between">
			<a class="navbar-brand mr-auto mr-lg-0 visible" href="#"><img src="assets/logo-black.png" alt=""></a>
			<div class="btn-group">
				<button type="button" class="btn btn-link dropdown-toggle dropdown-toggle-no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="fe fe-menu"></i>
				</button>
				<div class="dropdown-menu dropdown-menu-right animated faster bounceIn">
					<router-link class="dropdown-item" href="#" :to="{ path: '/setting'}">SETTING</router-link>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" @click="$authPresenter.clientSignOut()">SIGN OUT</a>
				</div>
			</div>
		</nav>
		
		<nav class="nav nav-underline nav-sub container bg-light">
			<!-- <router-link class="nav-link active" to="/" exact> HOME </router-link> -->
			<router-link class="nav-link active" :to="{ path: '/dashboard'}" exact> DASHBOARD </router-link>
			<router-link class="nav-link" :to="{ path: '/nlp'}"> TRAINIG SET </router-link>
			<router-link class="nav-link" :to="{ path: '/logs'}"> LOGS </router-link>
			<router-link class="nav-link" :to="{ path: '/story'}"> STORY </router-link>
			<router-link class="nav-link" :to="{ path: '/logging'}"> LOGGING </router-link>
			<router-link class="nav-link" :to="{ path: '/setting'}"> SETTING </router-link>
		</nav>

	</div>
    `,
})