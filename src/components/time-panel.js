import { TimePanel } from "./time-panel.ts";

export default {
    name: 'time-panel',
    data () {
      return {
        title: 'panel para mostrar el tiempo',
        time: 10,
        message: 'You loaded this page on ' + new Date().toLocaleString(),
        isParpadea:false,
        hasError: false
      }
    }, computed:{
      cuentaAtras(){
        let crono = setInterval(function(){
          this.time = this.time - 1 ;
          this.isParpadea = (this.time === 5 || this.time === 3|| this.time === 1) ?  true : false;

          if(this.time === 0){
            this.hasError = true;
          }
          return (this.time);
        }.bind(this), 1000);


        let timeOut = setTimeout( function(){
          clearInterval(crono);
          this.title = "Se acabó tu tiempooooo";
          //alert("Se acabó tu tiempooooo");
        }.bind(this),10500);

      }
    }
  }
