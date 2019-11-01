class CookieRepository {
    
    constructor(key) {
        this.key = key
        this.value = new Subject()
        this.synchronize()
    }

    synchronize = () => {
        this.getValue().subscribe((value) => { Cookies.set(this.key, value); });
    }

    getValue = () => {
        return this.value;
    }

    setValue = (value) => {
        this.value.next(value);
    }
    

}