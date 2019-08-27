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
      data:{}
    }
  },
  created() {
    const that = this;
    addEventListener('mostrar-letras', letrasHandler, false);
    function letrasHandler(evt) {
      that.visible = true;
    }
  },
    // removeEventListener('mostrar-letras', letrasHandler, false);

  mounted(){
    this.$root.$on('categoria-modificada', this.updateLetras.bind(this));
    this.$root.$on('finish-time', this.soluciona.bind(this));
    this.$root.$on('reset-game', this.reset.bind(this));
    const that = this;
    addEventListener('json-loaded', jsonHandler, false);
    function jsonHandler(evt) {
      that.data = evt.detail;
      const primeraCategoria = Object.keys(evt.detail.categoria)[0];
        // this.letras = desordena(this.data.categoria[primeraCategoria]).toString(); // por defecto está precargada una cadena perteneciente a la primera categoria (ckeckeada)
        that.letras = that.desordena(evt.detail.categoria[primeraCategoria]).toString(); 
    }
},

methods: {
  updateLetras(categoria){
    const categoriaSelect = categoria? categoria[0] : this.categoriaSel ? this.categoriaSel : 'todas';
    if (categoriaSelect){
      this.categoriaSel = categoriaSelect.toLowerCase();
      const listado = this.data.categoria[this.categoriaSel]
      this.letras = this.desordena(listado).toString();
    }
  },
  soluciona(){
    this.solucion = true
  },
  reset(){
    this.updateLetras();
    this.solucion = false;
    this.visible = false;
  },

    desordena(json) {
      let opciones = [];
      for (let i in json) {
        opciones.push(json[i]);
      }
      let random = Math.floor(Math.random() * opciones.length - 1) + 1
      let cadena = opciones[random];
      console.log(cadena);
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

// function updateLetras(categoria){
//   const categoriaSelect = categoria[0];
//   if (categoriaSelect){
//     this.categoriaSel = categoriaSelect.toLowerCase();
//     const listado = this.data.categoria[this.categoriaSel]
//     this.letras = desordena(listado).toString();
//   }
// }
// function desordena(json) {
//   let opciones = [];
//   for (let i in json) {
//     opciones.push(json[i]);
//   }
//   let random = Math.floor(Math.random() * opciones.length - 1) + 1
//   let cadena = opciones[random];
//   console.log(cadena);
//   // this.letrasOrdenadas = cadena;
//   console.log(desordenaPalabras(cadena));
//   return desordenaPalabras(cadena);

// }


// function desordenaPalabras(frase) {
//   if(!frase)
//     return;
//   let palabras = frase.split(" ");
//   return palabras.map(function (palabra) {
//     let desordenada = [];
//     let salido = []

//     while (desordenada.length < palabra.length) {
//       let num = Math.floor(Math.random() * (palabra.length - 0) + 0); 
//       if (salido.indexOf(num) == -1) {
//         salido.push(num);
//         desordenada.push(palabra[num].toUpperCase());
//       }
//     }
//     return desordenada.join("")
//   });
// }
