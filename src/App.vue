<template>
  <div id="app">
    <div class="titulos">
    <h1>{{ title }}</h1>
    <h3>{{ subtitle }}</h3>
    </div>
      <button> new game </button>
    <div>
      <info-panel></info-panel>
      <time-panel></time-panel>
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
      subtitle: "Tiene 10 segundos para ordenar las letras"
    };
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
.titulos{
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
