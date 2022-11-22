<template>
  <div class="container">
    <form @submit.prevent="userLogin()">
      <p>Bienvenue</p>
      <label for="Email"></label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        required="required"
        v-model="email"
      /><br />
      <label for="Password"></label>
      <input
        type="password"
        placeholder="Mot de passe"
        name="password"
        required="required"
        v-model="password"
      /><br />
      <button type="submit" class="btn-cnx">Connexion</button><br />
      <div class="link">
        <span class="register">Pas de compte ? </span>
        <button
          type="button"
          class="btn-link"
          @click="this.$emit('redirect-to-signup')"
        >
          Inscrivez-vous !
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    ...mapActions(['setToken']),
    userLogin() {
      if (this.email === '' || this.password === '') {
        this.error = true;
        this.errorMsg = 'Merci de renseigner tous les champs du formulaire.';
      } else {
        this.error = false;
        this.errorMsg = '';
        this.loginRequest();
      }
    },
    async loginRequest() {
      const reqObject = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      };
      try {
        const res = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/auth/login`,
          reqObject,
        );
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        }
        this.$store.dispatch('setToken', { token: data.token });
        this.$store.dispatch('setUserId', { userId: data.userId });
        this.$store.dispatch('setIsAdmin', { isAdmin: data.isAdmin });
        this.$store.dispatch('refreshUserData');
        this.$router.push({ name: 'Home' });
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      }
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
  height: 400px;
  border-radius: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
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
  margin-top: 40px;
  width: 100%;
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

.btn-cnx {
  background-color: #ffd7d7;
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
