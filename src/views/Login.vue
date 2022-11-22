<template>
  <div class="area">
    <img src="../assets/logo.png" alt="Logo Groupomania" />
    <h1>Groupomania</h1>
    <LoginForm
      v-if="type === 'login'"
      @redirect-to-signup="setFormType('signup')"
    />
    <SignUpForm
      v-if="type === 'signup'"
      @redirect-to-login="setFormType('login')"
    />
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';

export default {
  name: 'HomePage',
  components: {
    LoginForm,
    SignUpForm,
  },
  data() {
    return {
      type: 'login',
    };
  },
  methods: {
    setFormType(type) {
      this.type = type;
    },
  },
};
</script>
<style lang="scss" scoped>
.area {
  background-color: #fff;
  width: 100%;
  height: 100vh;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 100px;
  width: 146px;
  z-index: 1;
}

h1 {
  font-family: 'lato', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
  padding-top: 50px;
  text-align: center;
}

@media (max-width: 768px) {
  img {
    padding-top: 50px;
  }
}
</style>
