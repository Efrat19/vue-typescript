<<template>
  <!-- First name -->
  <div class="col">
  <div :class="_class">
    <input :type="type" :id="_uid" :name="name"
           :value="value" @change="changeValue" v-validate="rules">
    <label :for="_uid">{{label}}</label>
  </div>
  <small class="form-text mb-4 error" v-if="errors.first(name)">{{ errors.first(name) }}</small>
    </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import VeeValidate from 'vee-validate';

  Vue.use(VeeValidate);

  @Component({
    props: {
      _class: String,
      type: String,
      rules: String,
      name: String,
      label: String,
    },
  })
  export default class App extends Vue {

    value = '';
    // computed
    changeValue(){

    }
  }
</script>

<style scoped lang="scss">
  .input {

  }
</style>
