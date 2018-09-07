<template>
  <div id="time-panel">
    <span>{{ cuentaAtras }}</span>
    <h1>{{time}}</h1>
<!--     <div v-if="time === 0">
      <h2>tiempo agotado!</h2>
    </div> -->

  </div>
</template>

<script src="./time-panel.js">

</script>

<style>
#time-panel{
  background-color: lightcoral;
  font-size: 12px;
  display:inline-block;
  width:45%;  
  margin:0;
  padding: 0;
}
</style>
