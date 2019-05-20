<template>
<div>
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


    <!-- Material form register -->
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class SocialRegister extends Vue { }

</script>


