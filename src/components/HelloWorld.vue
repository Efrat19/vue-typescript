<template>
  <div class="hello">
    <div class="card">

      <h5 class="card-header info-color white-text text-center py-4">
        <strong>Sign up</strong>
      </h5>

      <div class="card-body px-lg-5 pt-0">

        <form class="text-center" style="color: #757575;">

          <div class="form-row">
            <input-field @error="onError" @change="setValue($event,'firstName')" name="firstName" rules="required|alpha" _class="md-form" type="text" label="First name"></input-field>
            <input-field @error="onError"  @change="setValue($event,'date')" name="date" rules="date_format:dd/MM/yyyy" _class="md-form" type="text"
                         label="Date Of Birth" :adjust="dateToUnix"></input-field>
          </div>
          <input-field @error="onError"  @change="setValue($event,'email')" name="email" rules="required|email" _class="md-form mt-0" type="email" label="E mail"></input-field>
          <input-field @error="onError"  @change="setValue($event,'password')" name="password" rules="required|min:8" _class="md-form" type="password" label="Password"></input-field>
          <input-field @error="onError"  @change="setValue($event,'phone')" name="phone" :rules="{ required: true, regex: /^(?=.*[0-9])[- +()0-9]+$/ }"
                       _class="md-form" type="text" label="Phone" :adjust="removePoneSpecialChars"></input-field>
          <input-field @error="onError"  @change="setValue($event,'subscribe')" name="subscribe" _class="form-check" type="checkbox" label="Subscribe to our newsletter"></input-field>

          <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 btn-signup" :disabled="!isOk" type="submit" @click.prevent="signup">Sign in</button>

          <social-register></social-register>

        </form>
        <div class="msg" v-if="msg">{{msg}}</div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import inputField from './Input.vue';
import SocialRegister from './SocialRegister.vue';

@Component({
  components: {
    inputField,
    SocialRegister
  },
})
export default class HelloWorld extends Vue {
  form:object = {
    firstName: '',
    date: '',
    email: '',
    password: '',
    phone: '',
    subscribe: false,
  };

  onError(field){
    this.invalids.push(field);
  }

  setValid(okField){
    this.invalids = this.invalids.filter(field => field!==okField);
  }

  invalids = ['firstName', 'date', 'email', 'password', 'phone'];

  msg:string = '';

  removePoneSpecialChars(phone) {
    const phoneAllowedChars = ['-', '+', '(', ')', ' '];
    let clean = phone;
    phoneAllowedChars.forEach(char =>
            clean = clean.split(char).join(''));
    return clean;
  }

  dateToUnix(date){
    return new Date(date).getTime() / 1000;
  }

  setValue(value, key) {
    this.form[key] = value;
    this.setValid(key);
  }

  async signup(){
    try {
      const rawResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(this.form),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const Response = await rawResponse.json();
      console.log(Response);
      this.msg = 'success!';
    }
    catch (e) {
      this.msg = e;
    }
  }

  get isOk() {
    return !this.invalids.length;
  }
}
</script>

<style lang="scss" scoped>
  .error {
    color: red;
  }
  .invalid {
    border-color: red;
  }
  .btn-signup {
    &:hover {
      background-color: #33b5e5 !important;
      color: white !important;
    }
  }
</style>
