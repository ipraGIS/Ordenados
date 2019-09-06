export default {
  name: 'letras-panel',
  data() {
    return {
      texto: 'Ordena',
      visible: false,
      solucion: false,
      letras: "ABC", 
      letrasOrdenadas:'',
      categoriaSel:'',
      data:{}
    }
  },
  mounted(){
    this.$root.$on('categoria-modificada', this.$_letras_updateLetras.bind(this));
    this.$root.$on('finish-time', this.$_letras_soluciona.bind(this));
    this.$root.$on('solve-word', this.$_letras_soluciona.bind(this));
    this.$root.$on('reset-game', this.$_letras_reset.bind(this));
    const that = this;
    addEventListener('json-loaded', jsonHandlerLetras, false);
    function jsonHandlerLetras(evt) {
      that.data = evt.detail;
      that.categoriaSel = Object.keys(evt.detail.categoria)[0];
    }
    addEventListener('mostrar-letras', letrasHandler.bind(this), false);
    function letrasHandler() {
      this.letras = this.$_letras_desordena(this.data.categoria[this.categoriaSel]).toString(); 
      this.visible = true;
    }
},

methods: {
  $_letras_updateLetras(categoria){
    const categoriaSelect = categoria? categoria[0] : this.categoriaSel ? this.categoriaSel : 'todas';
    if (categoriaSelect){
      this.categoriaSel = categoriaSelect.toLowerCase();
      // this.letras = this.$_letras_desordena(this.data.categoria[this.categoriaSel]).toString();
    }
  },
  $_letras_soluciona(){
    this.solucion = true;
  },
  $_letras_reset(){
    this.solucion = false;
    this.visible = false;
  },

  $_letras_desordena(dataSelec) {
      let opciones = [];
      for (let i in dataSelec) {
        opciones.push(dataSelec[i]);
      }
      let random = Math.floor(Math.random() * opciones.length - 1) + 1;
      let cadena = opciones[random];
      if(!cadena){
        alert(`Ya has jugado con todas las palabras de la categoría ${this.categoriaSel}. Selecciona otra categoria`)
        return '';  // En caso de que se hayan acabado las palabras de esa categoria
      }
      console.log(cadena);
      // elimino esta cadena del json (this.data) para que no se repita
      this.data.categoria[this.categoriaSel].splice( random, 1 );
      var c = cadena.replace(/\s/g, ',');
      this.letrasOrdenadas = c.toUpperCase();
      console.log(this.$_letras_desordenaPalabras(cadena));
      return this.$_letras_desordenaPalabras(cadena);
    },

    $_letras_desordenaPalabras(frase) {
      if(!frase)
        return;
      let palabras = frase.split(" ");
      let desordenada = [];
      palabras.map(function (palabra) {
        let salido = []
        while (desordenada.length < palabra.length) {
          let num = Math.floor(Math.random() * (palabra.length - 0) + 0); 
          if (salido.indexOf(num) == -1) {
            salido.push(num);
            desordenada.push(palabra[num].toUpperCase());
          }
        }
      });
      return desordenada.join("") !== frase.toUpperCase() ?  desordenada.join("") : this.$_letras_desordenaPalabras(frase); // me aseguro qué devuelva una palabra desordenada
    }
}

}