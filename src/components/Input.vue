<<template>
  <div class="col">

    <div :class="_class">
      <input :type="type" :id="_uid" :name="name"
             :class="['form-control',{invalid: errors.first(name)}]"
             v-model="value" @change="changeValue" v-validate="rules">
      <label  :for="_uid" >{{label}}</label>
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
      sharedValidator: {
        required: false,
        type : Array
      },
      _class: String,
      type: String,
      rules: {
        type: [String, Object],
        default: '',
      },
      name: String,
      label: String,
      adjust: {
        type: Function,
        default: value => value,
      },
    },
  })
  export default class Input extends Vue {

    value = '';

    async changeValue() {
      const isOk = await this.$validator.validate();

      return (isOk && this.$emit('change', this.adjust(this.value))) || this.$emit('error', this.name);
    }

    created(){
      if(this.sharedValidator){
        this.sharedValidator.push(this.$validator);
      }

      console.log(this.sharedValidator);
    }
  }
</script>

<style scoped lang="scss">
  .input {

  }
</style>
