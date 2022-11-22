<template>
  <div class="container">
    <form @submit.prevent="userSignUp()">
      <p>Bienvenue</p>
      <label for="first-name"></label>
      <input
        type="text"
        name="firstName"
        placeholder="Prénom"
        v-model="firstName"
        required="required"
      /><br /><span v-if="!isFirstNameValid && this.firstName !== ''"
        >Prénom invalide !</span
      >
      <label for="last-name"></label>
      <input
        type="text"
        name="lastName"
        placeholder="Nom"
        v-model="lastName"
        required="required"
      /><br /><span v-if="!isLastNameValid && this.lastName !== ''"
        >Nom invalide !</span
      >
      <label for="Email"></label>
      <input type="email" placeholder="Email" v-model="email" /><br /><span
        v-if="!isEmailValid && this.email !== ''"
        >Adresse email invalide !</span
      >
      <label for="Password"></label>
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        v-model="password"
        required="required"
      /><br /><span v-if="!isPasswordValid && this.password !== ''"
        >Mot de passe invalide !</span
      >
      <label for="Password-confirmation"></label>
      <input
        type="password"
        name="passwordConfirm"
        placeholder="Confirmation mot de passe"
        v-model="passwordConfirm"
        required="required"
      /><br /><span
        v-if="!isPasswordConfirmValid && this.passwordConfirm !== ''"
        >Mot de passe invalide !</span
      >
      <span v-if="isPasswordConfirmValid && !isMatchPasswordValid"
        >Les mots de passe ne correspondent pas !</span
      >
      <button type="submit">Inscription</button><br />
      <div class="link">
        <span class="register">Vous avez un compte ? </span>
        <button
          type="button"
          class="btn-link"
          @click="this.$emit('redirect-to-login')"
        >
          Connectez-vous !
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import validator from 'validator';

export default {
  name: 'SignUpForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    userSignUp() {
      if (this.isFormValid) this.signUpRequest();
    },
    async signUpRequest() {
      const reqObject = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        }),
      };
      try {
        const res = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/auth/signup`,
          reqObject,
        );
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        }
        this.$emit('redirect-to-login');
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      }
    },
  },
  computed: {
    isFirstNameValid() {
      return this.firstName.length > 0;
    },
    isLastNameValid() {
      return this.lastName.length > 0;
    },
    isEmailValid() {
      return this.email.length > 0;
    },
    isPasswordValid() {
      return validator.isStrongPassword(this.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      });
    },
    isPasswordConfirmValid() {
      return validator.isStrongPassword(this.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      });
    },
    isMatchPasswordValid() {
      return this.password === this.passwordConfirm;
    },
    isFormValid() {
      return (
        this.isFirstNameValid &&
        this.isLastNameValid &&
        this.isEmailValid &&
        this.isPasswordValid &&
        this.isPasswordConfirmValid &&
        this.isMatchPasswordValid
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  padding-top: 50px;
}

form {
  font-family: 'Lato', sans-serif;
  background: rgba(255, 255, 255, 0.2);
  padding: 3rem 1.5rem;
  height: 540px;
  border-radius: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  width: 50%;
  max-width: 400px;
  margin: auto;
  z-index: 1;
}

p {
  color: rgb(0, 0, 0);
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  opacity: 0.7;
  font-size: 1.4rem;
  margin-top: 0;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 12px;
}

a:hover {
  text-shadow: 2px 2px 6px #00000040;
}

a:active {
  text-shadow: none;
}

input {
  font-family: 'Lato', sans-serif;
  background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.6rem;
  width: 100%;
  border-radius: 50px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  -moz-backdrop-filter: blur(5px);
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
  color: rgb(0, 0, 0);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  margin-bottom: 1.5em;
}

input:hover,
input[type='email']:focus,
input[type='password']:focus {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
}

button[type='submit'] {
  font-family: 'Lato', sans-serif;
  background: transparent;
  border: 1px solid #ffbcbc;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.6rem;
  width: 100%;
  border-radius: 50px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  -moz-backdrop-filter: blur(5px);
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
  color: #fd2d01;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  margin-top: 10px;
  margin-bottom: 15px;
  width: 120px;
  font-size: 1rem;
  cursor: pointer;
}

::placeholder {
  color: rgb(0, 0, 0);
}

.link {
  margin-top: 20px;
  widows: 100%;
}

.btn-link {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  background: none;
  display: inline-block;
  cursor: pointer;
  color: #fd2d01;
}

.link a {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
}

.register {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  form {
    width: 90%;
    max-width: 400px;
  }
}
</style>
