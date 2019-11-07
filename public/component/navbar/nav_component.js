var navPresenter = Vue.component('nav-component', {
	template: `
	<div class="fixed-top navbar-warpper bg-light">
	
		<nav class="navbar navbar-expand-lg navbar-dark container">
			<a class="navbar-brand mr-auto mr-lg-0 visible" href="#"><img src="assets/logo-black.png" alt=""></a>
			<button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
				<span class="navbar-toggler-icon"></span>
			</button>
		</nav>
		
		<nav class="nav nav-underline nav-sub container bg-light">
			<!-- <router-link class="nav-link active" to="/" exact> HOME </router-link> -->
			<router-link class="nav-link active" :to="{ path: '/dashboard'}" exact> DASHBOARD </router-link>
			<router-link class="nav-link" :to="{ path: '/nlp'}"> NLP SET </router-link>
			<router-link class="nav-link" :to="{ path: '/logs'}"> NLP LOGS </router-link>
			<router-link class="nav-link" :to="{ path: '/story'}"> STORY </router-link>
			<router-link class="nav-link" :to="{ path: '/webchat'}"> DEBUGGER </router-link>
			<router-link class="nav-link" :to="{ path: '/setting'}"> SETTING </router-link>
			<a class="nav-link" @click="signOut"> SIGN OUT </a>
		</nav>

	</div>
    `,
	methods: {
		signOut: function () {
			this.$authService.signOut()
			this.$router.replace("/")
		} 
	},
})