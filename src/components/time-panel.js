export default {
    name: 'time-panel',
    data () {
      return {
        title: 'panel para mostrar el tiempo',
        time: 10,
        message: 'You loaded this page on ' + new Date().toLocaleString(),
        isParpadea:false,
        hasError: false,
        cuenta: false,
      }
    },
    mounted(){
      const that = this;
      addEventListener('json-loaded', jsonHandler, false);
      function jsonHandler(evt) {
        if( evt.detail &&  evt.detail.segundos)
          that.time = evt.detail.segundos ;
      }
  },
    methods: {
      start() {
        this.cuenta = true;
        let evt = document.createEvent("CustomEvent");
        evt.initCustomEvent('mostrar-letras', false, false, {});
        window.dispatchEvent(evt);
        this.cuentaAtras();
      },
      cuentaAtras(){
        let crono = setInterval(function(){
          this.time = this.time - 1 ;
          this.isParpadea = (this.time === 5 || this.time === 3|| this.time === 1) ?  true : false;
          if(this.time === 0){
            this.finishTime();
          }
          return (this.time);
        }.bind(this), 1000);
        
        var that = this;
        const time2 = that.time*1000 + 500;
        setTimeout(function(time2){
          clearInterval(crono);
          that.title = "Se acabó tu tiempooooo";
          //alert("Se acabó tu tiempooooo");
        }, time2);

      },
      finishTime(){
        this.hasError = true;
        this.$root.$emit('finish-time', {});
      },

    }
  }

function setTime(e){
  if( !e.detail || !e.detail.segundos){
    return;
  }
      this.time = e.detail.segundos;
}
