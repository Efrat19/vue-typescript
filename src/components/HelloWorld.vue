<template>
    <div class="hello">
        <div class="card">

            <h5 class="card-header info-color white-text text-center py-4">
                <strong>Sign up</strong>
            </h5>

            <div class="card-body px-lg-5 pt-0">
                <form class="text-center" style="color: #757575;" @submit="submit">
                    <div class="form-row">
                        <dynamic-input :input="newForm.input('firstName')"></dynamic-input>
                        <dynamic-input :input="newForm.input('date')"></dynamic-input>
                    </div>

                    <dynamic-input :input="newForm.input('email')"></dynamic-input>
                    <dynamic-input :input="newForm.input('password')"></dynamic-input>
                    <dynamic-input :input="newForm.input('phone')"></dynamic-input>

                    <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 btn-signup"
                            type="submit" @click.prevent="submit">Sign in
                    </button>

                    <social-register></social-register>
                </form>
                <div class="msg" v-if="msg">{{msg}}</div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import inputField from './Input.vue';
    import SocialRegister from './SocialRegister.vue';
    import Form from '../entities/Form'
    import PhoneInput from '../entities/Inputs/PhoneInput';
    import TextInput from '../entities/Inputs/TextInput';
    import DateInput from '../entities/Inputs/DateInput';
    import EmailInput from '../entities/Inputs/EmailInput';
    import DynamicInput from "./DynamicInput.vue";

    @Component({
        components: {
            DynamicInput,
            inputField,
            SocialRegister
        },
    })

    export default class HelloWorld extends Vue {
        newForm = new Form({
            inputs: {
                firstName: new TextInput({
                    name: 'firstName',
                    rules: 'required|alpha',
                    className: 'md-form',
                    label: 'First name'
                }),
                date: new DateInput({
                    name: 'date',
                    rules: 'date_format:dd/MM/yyyy',
                    className: 'md-form',
                    label: 'Date of birth'
                }),
                email: new EmailInput({
                    name: 'email',
                    rules: 'required|email',
                    className: 'md-form',
                    label: 'Email'
                }),
                password: new TextInput({
                    name: 'password',
                    rules: 'required|min:8',
                    className: 'md-form',
                    label: 'Password'
                }),
                phone: new PhoneInput({
                    name: 'phone',
                    rules: {required: true, regex: /^(?=.*[0-9])[- +()0-9]+$/},
                    className: 'md-form',
                    label: 'Phone'
                })
            },
            endpoint : 'https://jsonplaceholder.typicode.com/posts',
            successCallback : () => {
                console.log("Hello world");
            }
        });

        async submit() {
            this.newForm
                .validate()
                .then((success) => {
                    if (success) {
                        this.newForm.submit();
                    }
                });
        }
    }
</script>

<style lang="scss" scoped>
    .btn-signup {
        &:hover {
            background-color: #33b5e5 !important;
            color: white !important;
        }
    }
</style>
