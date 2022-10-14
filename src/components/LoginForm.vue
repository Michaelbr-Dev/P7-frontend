<template>
  <div class="container">
    <form>
      <p>Bienvenue</p>
      <label for="Email"></label>
      <input type="email" placeholder="Email" /><br />
      <label for="Password"></label>
      <input type="password" placeholder="Mot de passe" /><br />
      <input type="button" value="Connexion" /><br />
      <a href="#">Mot de passe oublié</a>
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
export default {
  name: 'LoginForm',
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  padding-top: 50px;
}

form {
  font-family: 'Roboto', sans-serif;
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
  width: 50%;
  max-width: 400px;
  margin: auto;
  z-index: 1;
}

p {
  color: rgb(0, 0, 0);
  font-family: 'Roboto', 'sans-serif';
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
  font-family: 'Roboto', sans-serif;
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

input[type='button'] {
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
  font-family: 'Roboto', 'sans-serif';
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  background: none;
  display: inline-block;
  cursor: pointer;
}
.link a {
  font-family: 'Roboto', 'sans-serif';
  font-size: 1.1rem;
  font-weight: 700;
}

.register {
  font-family: 'Roboto', 'sans-serif';
  font-size: 1.1rem;
  font-weight: 700;
}
</style>
