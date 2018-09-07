import { TimePanel } from "./time-panel.ts";

export default {
    name: 'time-panel',
    data () {
      return {
        title: 'panel para mostrar el tiempo',
        time: 10,
        message: 'You loaded this page on ' + new Date().toLocaleString()
      }
    }, computed:{
      cuentaAtras(){
        let crono = setInterval(function(){
          this.time = this.time - 1 ;
          return (this.time);
        }.bind(this), 1000);

        let timeOut = setTimeout( function(){
          clearInterval(crono);
          this.title = "Se acabó tu tiempooooo";
          alert("Se acabó tu tiempooooo");
        }.bind(this),10500);

      }
    }
  }
