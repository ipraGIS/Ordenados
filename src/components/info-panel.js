export default {
    name: 'info-panel',
    data () {
      return {
        info: 'Seleccione una categoría: ', 
        categorias:[],
        checked:[]
      }
    },
    mounted(){
      // addEventListener('json-loaded', test.bind(this), false); // Asi el navegador hace una copia en memoria y en caso de querer eliminarlo con removeEventListener no 'funciona'
      const that = this;
      addEventListener('json-loaded', jsonHandler, false);
      function jsonHandler(evt) {
        addCategorias.apply(that, [evt]);
      }
  }, 
  watch:{
    checked: {
      handler: function() {
        this.$root.$emit('categoria-modificada', this.checked);
        console.log(this.checked);
        if(this.checked.length > 1){
          this.checked.shift();
        }
    },
    deep: false
    }

  },
  methods: {
  }
}

function addCategorias(e){
    if( !e.detail || !e.detail.categoria){
      return;
    }
    const listadoJson = e.detail.categoria;
    for (const i in listadoJson){
        this.categorias.push(i.toUpperCase());
    }
}
