<template>
  <div class="block">
    <p class="block--parrafo">{{ info }}</p>
    <!-- <div v-for="(item, index) in categorias" v-bind:key="item.id">
      <input type="checkbox"  :ref="'checkbox' + index" :id="`checkbox-${index}`" :value="item" v-model.lazy="checked" checked><label>{{item}}</label>
    </div>-->
    <span class="block--list" v-for="(item) in categorias" :key="item.id">
      <input class="block--list--input" type="checkbox" v-model="checked" :value="item" />
      {{item}}
    </span>
  </div>
</template>

<script src="./info-panel.js"></script>

<style scoped>
/* BEM: block Element Modifier */
.block {
  font-size: 12px;
  display: inline-block;
  width: 30%;
  margin: 0;
  padding: 0;
  left:10%;
  position: absolute;
}

.block--parrafo {
  margin-top: 20px;
  font-size: 18px;
  text-align: initial;
}

.block--list {
  display: flex;
  align-items: center;
}
.block--list--input {
  margin: 10px;
}

</style>
