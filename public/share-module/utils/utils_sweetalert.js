const ALERT = {
	SUCCESS: "success",
	ERROR: "error",
	WARNNING: "warning",
	CONFIRM: "confirm",
	TOAST: "toast"
}

const swal2 = function (type, props, confirm=false) {
		
	let popup = {
		customClass : {
			confirmButton : ""
		}
	}

	switch (type) {
		case ALERT.SUCCESS :
			popup.icon = "success"
			popup.showCancelButton = false
			popup.customClass.confirmButton = "swal2--success"
			break;
		case ALERT.ERROR :
			popup.icon = "error"
			popup.showCancelButton = false
			popup.customClass.confirmButton = "swal2--error"
			break;
		case ALERT.WARNNING :
			popup.icon = "warning"
			popup.showCancelButton = true
			popup.customClass.confirmButton = "swal2--warning"
			popup.confirmButtonText = "confirm"
			break;
		case ALERT.CONFIRM :
			popup.icon = "question"
			popup.showCancelButton = true
			popup.customClass.confirmButton = "swal2--question"
			popup.confirmButtonText = "submit"
			break;
		case ALERT.TOAST :
			let TOAST = swal.mixin({
				toast: true, // toast is mini alert
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 2000,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter', swal.stopTimer)
					toast.addEventListener('mouseleave', swal.resumeTimer)
				}
			})
			props.icon ? popup.customClass.container = props.icon : true
			return TOAST.fire({
				...props,
				...popup,
			}).then((result) => {
				console.log(result)
				return result
			})
			break;
		default :
			popup.icon = "success"
			popup.showCancelButton = false
			popup.customClass.confirmButton = "swal2--success"
			break;
	}

	return swal.fire({
		...props,
		...popup,
	}).then((result) => {
		console.log(result)
		return result
	})

}

