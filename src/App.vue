<template>
  <div id="app">
    <div class="titulos">
      <h1>{{title}}</h1>
      <time-panel></time-panel>
      <button id="botonReset" v-on:click="reset">NUEVA PARTIDA</button>
      <h3>{{subtitle}}</h3>
      <info-panel></info-panel>
    </div>
    <letras-panel></letras-panel>
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
      subtitle: "Tiene 10 segundos para ordenar las letras",
      jsonData: {}
    };
  },
  created() {
    fetch("../src/assets/textos.json")
      .then(res => res.json())
      .then(myjson => {
        const mix = [];
        for (const i in myjson.categoria) {
          for (const j of myjson.categoria[i]) {
            mix.push(j);
          }
        }
        myjson.categoria.todas = mix; // añado una nueva categoría mezcla de todas
        let evt = document.createEvent("CustomEvent");
        evt.initCustomEvent("json-loaded", false, false, myjson);
        window.dispatchEvent(evt);
      });
  },
  mounted() {
    const that = this;
    addEventListener("json-loaded", jsonHandler, false);
    function jsonHandler(evt) {
      if (!evt.detail || !evt.detail.segundos) return;
      that.subtitle = `Tiene ${evt.detail.segundos} segundos para ordenar las letras`;
    }
  },
  methods: {
    reset(e) {
      this.$root.$emit("reset-game");
      if (e && e.target) e.target.style.display = "none";
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
#botonReset {
  position: relative;
  display: none;
  /* right: 15%; */
  background-color: orange; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  width: 80px;
  height: 80px;
  color: #fff;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  top: -10px;
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
