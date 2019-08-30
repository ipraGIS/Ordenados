<template>
  <div id="app">
    <div class="titulos">
      <h1>{{title}}</h1>
      <h3>{{subtitle}}</h3>
      <time-panel></time-panel>
      <button class="boton reset" id="botonReset" v-on:click="$_reset">NUEVA PARTIDA</button>
      <info-panel></info-panel>
      <button class="boton solve" id="botonSolve" v-on:click="$_solve">RESOLVER</button>
    </div>
    <letras-panel></letras-panel>
    <div></div>
  </div>
</template>

<script>
import infoPanel from "./components/info-panel.vue";
import timePanel from "./components/time-panel.vue";
import letrasPanel from "./components/letras-panel.vue";

export default {
  components: {
    "info-panel": infoPanel,
    "time-panel": timePanel,
    "letras-panel": letrasPanel
  },

  name: "app",
  data() {
    return {
      title: "Ordenando",
      subtitle: "Tiene X segundos para adivinar de qué se trata...",
      jsonData: {}
    };
  },
  created() {
    fetch("../src/assets/textos.json")
      .then(res => res.json())
      .then(myjson => {
        if (myjson.todas) {
          // si tiene configurado, todas == true => añado una nueva categoría mezcla de todas
          const mix = [];
          for (const i in myjson.categoria) {
            for (const j of myjson.categoria[i]) {
              mix.push(j);
            }
          }
          myjson.categoria.todas = mix;
        }
        let evt = document.createEvent("CustomEvent");
        evt.initCustomEvent("json-loaded", false, false, myjson);
        window.dispatchEvent(evt);
      });
  },
  mounted() {
    const that = this;
    addEventListener("json-loaded", jsonHandler, false);
    let subtitleInicio;
    function jsonHandler(evt) {
      if (!evt.detail || !evt.detail.segundos) return;
      that.subtitle = `Tiene ${evt.detail.segundos} segundos para adivinar de qué se trata...`;
      subtitleInicio = that.subtitle;
    }
    that.$root.$on("finish-time", function() {
      that.subtitle = "¿ Quieres jugar de Nuevo ?";
      document.getElementById("botonReset").style.display = "inline-flex";
      document.getElementById("botonSolve").style.display = "none";
    });
    that.$root.$on("reset-game", function() {
      that.subtitle = subtitleInicio;
    });
  },
  methods: {
    $_reset(e) {
      if (e && e.target) e.target.style.display = "none";
      this.$root.$emit("reset-game");
    },
    $_solve(e) {
      this.$root.$emit("solve-word");
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 22px;
}

.boton {
  position: relative;
  display: none;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  width: 100px;
  height: 100px;
  color: #fff;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
}

.reset {
  background-color: #4caf50; /* Green */
  border: 1px solid #4caf50;
  top: -10px;
}

.solve {
  background-color: #cd5c5c;
  border: 1px solid #cd5c5c;
  bottom: 1px;
}

.titulos {
  text-align: center;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
