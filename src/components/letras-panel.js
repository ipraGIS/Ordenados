export default {
  name: 'letras-panel',
  data() {
    return {
      texto: 'Ordena',
      visible: false,
      solucion: false,
      urlLetras: '../src/assets/textos.json',
      letras: "ABC", 
      letrasOrdenadas:'',
      categoriaSel:'',
      data:{}
    }
  },

    // removeEventListener('mostrar-letras', letrasHandler, false);

  mounted(){
    this.$root.$on('categoria-modificada', this.updateLetras.bind(this));
    this.$root.$on('finish-time', this.soluciona.bind(this));
    this.$root.$on('solve-word', this.soluciona.bind(this));
    this.$root.$on('reset-game', this.reset.bind(this));
    const that = this;
    addEventListener('json-loaded', jsonHandlerLetras, false);
    function jsonHandlerLetras(evt) {
      that.data = evt.detail;
      that.categoriaSel = Object.keys(evt.detail.categoria)[0];
    }
    addEventListener('mostrar-letras', letrasHandler, false);
    function letrasHandler(evt) {
      that.letras = that.desordena(that.data.categoria[that.categoriaSel]).toString(); 
      that.visible = true;
    }
},

methods: {
  updateLetras(categoria){
    const categoriaSelect = categoria? categoria[0] : this.categoriaSel ? this.categoriaSel : 'todas';
    if (categoriaSelect){
      this.categoriaSel = categoriaSelect.toLowerCase();
      this.letras = this.desordena(this.data.categoria[this.categoriaSel]).toString();
    }
  },
  soluciona(){
    this.solucion = true;
  },
  reset(){
    this.solucion = false;
    this.visible = false;
  },

  desordena(dataSelec) {
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
      console.log(this.desordenaPalabras(cadena));
      return this.desordenaPalabras(cadena);
    },

    desordenaPalabras(frase) {
      if(!frase)
        return;
      let palabras = frase.split(" ");
      return palabras.map(function (palabra) {
        let desordenada = [];
        let salido = []
        while (desordenada.length < palabra.length) {
          let num = Math.floor(Math.random() * (palabra.length - 0) + 0); 
          if (salido.indexOf(num) == -1) {
            salido.push(num);
            desordenada.push(palabra[num].toUpperCase());
          }
        }
        return desordenada.join !== frase ?  desordenada.join("") : desordenaPalabras(frase); // me aseguro qué devuelva una palabra desordenada
      });
    }
}

}