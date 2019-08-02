<template>
  <div class="info-panel">
    <p id="parrafoInfo">{{ info }}</p>
    <!-- <div v-for="(item, index) in categorias" v-bind:key="item.id">
      <input type="checkbox"  :ref="'checkbox' + index" :id="`checkbox-${index}`" :value="item" v-model.lazy="checked" checked><label>{{item}}</label>
    </div>-->
    <span class='list' v-for="(item) in categorias" :key="item.id">
      <input type="checkbox" v-model="checked" :value="item" />{{item}}
    </span>
  </div>
</template>

<script src="./info-panel.js">
</script>

<style>

.list{
  display:flex;
  align-items:center;
}
input{
  margin:10px;
}

.info-panel {
  font-size: 12px;
  display: inline-block;
  width: 45%;
  margin: 0;
  padding: 0;
}

#parrafoInfo {
  font-size: 18px;
}
</style>
