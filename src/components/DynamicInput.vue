<template>
    <div class="col">
        <div :class="input.className">
            <input :id="_uid"
                   :type="input.type"
                   :name="input.name"
                   :class="inputClass"
                   :value="input.value"
                   @blur="validate"
                   @input="updateValue"
                   v-validate="input.rules">
            <label :for="_uid" v-text="input.label"></label>
        </div>

        <small class="form-text mb-4 error"
               v-if="input.hasError()"
               v-text="input.getError()">
        </small>
    </div>
</template>

<script>
  import Input from '../entities/Input';

  export default {
    name: 'DynamicInput',
    props: {
      input: {
        required: true,
        type: Input
      }
    },
    computed: {
      inputClass() {
        return [
          'form-control',
          {
            invalid: this.input.hasError()
          }
        ];
      }
    },
    methods: {
      updateValue($event) {
        this.input.value = $event.target.value;
      },
      validate() {
        this.input.validate();
      }
    },
    created() {
      this.input.validator = this.$validator;
    }
  };
</script>
