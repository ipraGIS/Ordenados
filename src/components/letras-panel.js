import {
  LetrasPanel
} from "./letras-panel.ts";

export default {
  name: 'letras-panel',
  data() {
    return {
      texto: 'Ordena',
      urlLetras: '../src/assets/textos.json',
      letras: "ABC"
    }
  },
  created() {
    fetch(this.urlLetras)
      .then(res => res.json())
      .then(myjson => {
        this.letras = desordena(myjson).toString();

      })
  },

}


function desordena(json) {
  let opciones = [];
  for (let i in json) {
    opciones.push(json[i]);
  }
  let random = Math.floor(Math.random() * opciones.length - 1) + 1
  let cadena = opciones[random];
  console.log(cadena);
  console.log(desordenaPalabras(cadena));
  return desordenaPalabras(cadena);

}


function desordenaPalabras(frase) {
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
