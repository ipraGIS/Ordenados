<template>
  <div id="time-panel" v-bind:class="{ normal:(!isParpadea && !hasError), parpadea: isParpadea, 'finish-time': hasError   }">
    <button class="boton tooltip" v-show="!cuenta" v-on:click="start">INICIO
      <span class="tooltiptext">Inicia Juego</span>
    </button>
    <div v-show="cuenta">
      <div>{{time}}</div>
    </div>
  </div>
</template>

<script src="./time-panel.js">
</script>

<style>
.boton {
  background-color: #4caf50; /* Green */
  border: 1px solid  #4caf50 ;
  color: white;
  padding: 0;
  margin: 30px -10px;
  /* padding: 30px 15px; */
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}
#time-panel {
  display: inline-flex;
  position: relative;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 80px;
  height: 80px;
  color: #fff;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
}
.normal {
  background-color: #4caf50; /* Green */
}
.parpadea {
  background-color: rgb(51, 255, 0);
}
.finish-time {
  background-color: red;
}

.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  font-size: 12px;
  visibility: hidden;
  width: 120px;
  background-color: grey;
  color: #fff;
  text-align: center;
  padding: 8px 0px;
  border-radius: 6px;
  cursor: default;
  margin: 30px -30px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.boton:hover {
  cursor: pointer;
}
</style>
