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

    fetch(this.urlLetras)
      .then(res => res.json())
      .then(myjson => {
        const mix = []
        for(const i in myjson.categoria){
          for( const j of myjson.categoria[i]){
            mix.push(j);
          }
        }
        myjson.categoria.todas = mix; // añado una nueva categoría mezcla de todas
        this.data = myjson;
        const primeraCategoria = Object.keys(this.data.categoria)[0];
        // this.letras = desordena(this.data.categoria[primeraCategoria]).toString(); // por defecto está precargada una cadena perteneciente a la primera categoria (ckeckeada)
        this.letras = this.desordena(this.data.categoria[primeraCategoria]).toString(); // por defecto está precargada una cadena perteneciente a la primera categoria (ckeckeada)
        let evt = document.createEvent("CustomEvent");
        evt.initCustomEvent('json-loaded', false, false, this.data);
        window.dispatchEvent(evt);
      })
  },
  mounted() {
    this.$root.$on('categoria-modificada', this.updateLetras.bind(this));
    this.$root.$on('finish-time', this.soluciona.bind(this));
},

methods: {
  updateLetras(categoria){
    const categoriaSelect = categoria[0];
    if (categoriaSelect){
      this.categoriaSel = categoriaSelect.toLowerCase();
      const listado = this.data.categoria[this.categoriaSel]
      this.letras = this.desordena(listado).toString();
    }
  },
  soluciona(){
    this.solucion = true
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
        return desordenada.join("")
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
