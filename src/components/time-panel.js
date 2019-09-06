export default {
    name: 'time-panel',
    data () {
      return {
        title: 'panel para mostrar el tiempo',
        time: 10,
        timeInicial: 10,
        message: 'You loaded this page on ' + new Date().toLocaleString(),
        isParpadea:false,
        hasError: false,
        cuenta: false,
      }
    },
    mounted(){
      const that = this;
      addEventListener('json-loaded', jsonHandlerTime, false);
      function jsonHandlerTime(evt) {
        if(evt.detail &&  evt.detail.segundos){
          that.time = evt.detail.segundos ;
          that.timeInicial = evt.detail.segundos ;
        }
      }
      this.$root.$on('reset-game', this.$_time_reset.bind(this));
      this.$root.$on('solve-word', this.$_time_finish.bind(this));
  },
    methods: {
      $_time_start() {
        this.cuenta = true;
        let evt = document.createEvent("CustomEvent");
        evt.initCustomEvent('mostrar-letras', false, false, {});
        document.getElementById('botonSolve').style.display = 'inline-flex';   
        window.dispatchEvent(evt);
        this.$_time_cuentaAtras();
      },
      $_time_cuentaAtras(){
        let crono = setInterval(function(){
          this.time = this.time - 1 ;
          this.isParpadea = (this.time === 5 || this.time === 3|| this.time === 1) ?  true : false;
          if(this.time === 0){
            this.$_time_finish();
          }
          return (this.time);
        }.bind(this), 1000);
        var that = this;
        const time2 = that.time * 1000 + 500;
        setTimeout(function(){
          clearInterval(crono);
          that.title = "Se acabó tu tiempo!";
        }, time2);

      },
      $_time_finish(){
        this.hasError = true;
        this.$root.$emit('finish-time', {});
         },
      $_time_reset(){
        this.hasError = false;
        this.time = this.timeInicial;
        this.cuenta = false;
      },

    }
  }

