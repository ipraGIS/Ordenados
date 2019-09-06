export default {
    name: 'info-panel',
    data () {
      return {
        info: 'Seleccione una categoría: ', 
        categorias:[],
        checked:[],
        selectedValue: 'animales',
      }
    },
    mounted(){
      // addEventListener('json-loaded', test.bind(this), false); // Asi el navegador hace una copia en memoria y en caso de querer eliminarlo con removeEventListener no 'funciona'
      const that = this;
      addEventListener('json-loaded', jsonHandlerInfo, false);
      function jsonHandlerInfo(evt) {
        that.$_infoPanel_addCategorias.apply(that, [evt]);
      }
  }, 
  watch:{
    checked: {
      handler: function(e) {
        this.$root.$emit('categoria-modificada', this.checked);
        if(this.checked.length > 1){
          this.checked.shift();
        }

    },
    deep: false
    },
    categorias:{
      handler:function(e){
        this.checked = [this.categorias[0]] // por defecto la primera categoría es la chequeada.
      }
    }
  },
  methods: {
    $_infoPanel_addCategorias(e){
      if(!e.detail || !e.detail.categoria || this.categorias.length > 0 ){
        return;
      }
        const listadoJson = e.detail.categoria;
        for (const i in listadoJson){
            this.categorias.push(i.toUpperCase());
        }
    }
  }
}
