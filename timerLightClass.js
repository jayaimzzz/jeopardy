class TimerLight {
    constructor(id){
        this.id = id;
        this.lightDiv = this.createLight();

    }
    createLight(){
        let light = document.createElement('div');
        light.id = this.id;
        light.className = 'light'
        // this.lightDiv = light
        return light;
    }

    turnOn(){
        this.lightDiv.style.backgroundColor = 'orange'
    }
    turnOff(){
        this.lightDiv.style.backgroundColor = 'grey'
    }
}