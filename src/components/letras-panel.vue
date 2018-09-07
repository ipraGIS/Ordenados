<template>
  <div id="letras-panel">
    <!-- <h1>{{ texto }}</h1> -->
    <span></span>
    <h1><span  v-for="letra in letras">
      <span id="letra" v-if="letra !== ','">{{letra}}</span>
      <span id="letraOculta" v-else></span>
      </span>

      </h1>
  </div>
</template>

<script src="./letras-panel.js">
</script>

<style>
#letras-panel {
  background-color: khaki;
  font-size: 10px;
  display: inline-block;
  height: auto;
  width: fit-content;
  padding: 10px;
  margin-top: 20px;

}

#letra {
  background-color: grey;
  padding: 10px;
  border: 1px solid #000;
  margin: 10px;
}
#letraOculta {
  background-color: transparent;
  padding: 10px;
  border: 0px solid #000;
  margin: 10px;
  margin-left: 20px;
  margin-right:20px;
}
</style>
