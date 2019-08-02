<template>
  <div class="letrasPanel">
    <div v-if="visible" id="letrasDesord">
      <br />
      <h1>
        <span v-for="letra in letras" :key="letra.id">
          <span id="letra" v-if="letra !== ','">{{letra}}</span>
          <span class="letraOculta" v-else></span>
        </span>
      </h1>
      <br />
    </div>
    <div v-if="visible" id="letrasOrd">
      <h1 class="solucion" v-if="solucion">
        <span v-for="letra in letrasOrdenadas" :key="letra.id">
          <span id="letraSolucion" v-if="letra !== ','">{{letra}}</span>
          <span class="letraOculta" v-else></span>
        </span>
      </h1>
    </div>
  </div>
</template>

<script src="./letras-panel.js">
</script>

<style>

.letrasPanel {
  margin: 0;
  position: absolute;
  bottom: 10%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
} 
#letrasDesord {
  /* background-color: khaki; */
  font-size: 10px;
  height: auto;
  padding: 10px;
  margin-top: 20px;
  margin-right: 25%;
}

#letrasOrd {
  /* background-color: khaki; */
  font-size: 10px;
  height: auto;
  padding: 10px;
  margin-top: 20px;
  margin-right: 25%;
}

#letrasDesord h1 {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

#letrasOrd h1 {
  margin: 0;
  position: absolute;
  top: 100%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}



#letra {
  background-color: #000;
  padding: 10px;
  border: 0px solid grey;
  margin: 10px;
  color: #fff;
}

#letraSolucion {
  background-color: indianred;
  padding: 10px;
  border: 0px solid grey;
  margin: 10px;
  color: #fff;
}

.letraOculta {
  background-color: transparent;
  padding: 10px;
  border: 0px solid #000;
  margin: 10px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
