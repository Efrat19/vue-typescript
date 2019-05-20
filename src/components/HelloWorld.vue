<template>
  <div class="hello">
    <!-- Material form register -->
    <div class="card">

      <h5 class="card-header info-color white-text text-center py-4">
        <strong>Sign up</strong>
      </h5>

      <!--Card content-->
      <div class="card-body px-lg-5 pt-0">

        <!-- Form -->
        <form class="text-center" style="color: #757575;">

          <div class="form-row">
            <div class="col">
              <!-- First name -->
              <!--<input-field name="firstName" rules="required|alpha" _class="md-form" type="text" label="First name"></input-field>-->
              <div class="md-form">
                <input type="text" id="materialRegisterFormFirstName" name="firstName"
                       :class="['form-control',{invalid: errors.first('firstName')}]"
                       v-model="form.firstName" v-validate="'required|alpha'">
                <label for="materialRegisterFormFirstName">First name</label>
              </div>
              <small class="form-text mb-4 error" v-if="errors.first('firstName')">{{ errors.first('firstName') }}</small>
            </div>
            <div class="col">
              <!-- Last name -->
              <div class="md-form">
                <input type="text" id="materialRegisterFormLastName" name="date"
                       :class="['form-control',{invalid: errors.first('date')}]" v-model="form.date" v-validate="'date_format:dd/MM/yyyy'">
                <label for="materialRegisterFormLastName">date og birth</label>
                <small class="error" v-if="errors.first('date')">{{ errors.first('date') }}</small>
              </div>
            </div>
          </div>

          <!-- E-mail -->
          <div class="md-form mt-0">
            <input type="email" id="materialRegisterFormEmail" name="email"
                   v-validate="'required|email'" :class="['form-control',{invalid: errors.first('email')}]" v-model="form.email">
            <label for="materialRegisterFormEmail">E-mail</label>
            <small class="form-text mb-4 error" v-if="errors.first('email')">{{ errors.first('email') }}</small>
          </div>

          <!-- Password -->
          <div class="md-form">
            <input type="password" id="materialRegisterFormPassword" name="password"
                   :class="['form-control',{invalid: errors.first('password')}]"
                   v-validate="'required|min:8'" aria-describedby="materialRegisterFormPasswordHelpBlock" v-model="form.password">
            <label for="materialRegisterFormPassword">Password</label>
            <small class="form-text mb-4 error" v-if="errors.first('email')">{{ errors.first('password') }}</small>
          </div>

          <!-- Phone number -->
          <div class="md-form">
            <input type="text" id="materialRegisterFormPhone" name="phone"
                   :class="['form-control',{invalid: errors.first('phone')}]" v-validate="{ required: true, regex: /^(?=.*[0-9])[- +()0-9]+$/ }"
                   aria-describedby="materialRegisterFormPhoneHelpBlock" v-model="form.phone">
            <label for="materialRegisterFormPhone">Phone number</label>
            <small class="form-text mb-4 error" v-if="errors.first('phone')">{{ errors.first('phone') }}</small>
          </div>

          <!-- Newsletter -->
          <div class="form-check">
            <input type="checkbox" name="subscribe"
                   :class="['form-control',{invalid: errors.first('subscribe')}]" v-validate="''" id="materialRegisterFormNewsletter" v-model="form.subscribe">
            <label class="form-check-label" for="materialRegisterFormNewsletter">Subscribe to our newsletter</label>
            <small class="form-text mb-4 error" v-if="errors.first('phone')">{{ errors.first('subscribe') }}</small>
          </div>

          <!-- Sign up button -->
          <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 btn-signup" type="submit" @click.prevent="attemptSignup">Sign in</button>

          <!-- Social register -->
          <p>or sign up with:</p>

          <a type="button" class="btn-floating btn-fb btn-sm">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a type="button" class="btn-floating btn-tw btn-sm">
            <i class="fab fa-twitter"></i>
          </a>
          <a type="button" class="btn-floating btn-li btn-sm">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a type="button" class="btn-floating btn-git btn-sm">
            <i class="fab fa-github"></i>
          </a>

          <hr>

          <!-- Terms of service -->
          <p>By clicking
            <em>Sign up</em> you agree to our
            <a href="" target="_blank">terms of service</a></p>

        </form>
        <!-- Form -->
        <div class="msg" v-if="msg">{{msg}}</div>
      </div>

    </div>
    <!-- Material form register -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VeeValidate from 'vee-validate';
import inputField from './Input.vue';
Vue.use(VeeValidate);

@Component({
  components: {
    inputField,
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

  msg:string = '';
  async attemptSignup(){
    const isOk = await this.$validator.validate();
    return isOk && this.signup();
  }

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

  async signup(){
    const sentForm = {
      ...this.form,
      date: this.dateToUnix(this.form.date),
      phone: this.removePoneSpecialChars(this.form.phone),
    }
    try {
      const rawResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(sentForm),
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
