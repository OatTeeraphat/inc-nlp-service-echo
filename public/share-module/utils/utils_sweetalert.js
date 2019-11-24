const swals = function (type, props, confirm=false) {
	

	if (props.toast){

		const Toast = swal.mixin({
			toast: true, // toast is mini alert
			position: 'bottom-end',
			showConfirmButton: false,
			timer: 2000,
			onOpen: (toast) => {
				toast.addEventListener('mouseenter', swal.stopTimer)
				toast.addEventListener('mouseleave', swal.resumeTimer)
			}
		})

		return Toast.fire({
				icon: type,
				...props,
		}).then((result) => {
			console.log(result)
			return result
		})

	}

	return swal.fire({
		...props,
		icon: type,
		showCancelButton: confirm
	}).then((result) => {
		console.log(result)
		return result
	})

	
}

