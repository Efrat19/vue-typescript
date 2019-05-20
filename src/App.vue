<template>
  <div id="app">
    <HelloWorld class="form" msg="Join the community!"/>
      <!--<img alt="Vue logo" src="./assets/logo.png" height="100">-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
.form {
  width: 500px;
  margin: 0 auto;
}
}
</style>
