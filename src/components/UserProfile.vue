<template>
  <div class="container">
    <h1 class="h1__title">{{ this.firstName }} {{ this.lastName }}</h1>
    <form @submit.prevent="userUpdate()">
      <label for="avatar"></label>
      <img
        class="avatar__img"
        :src="editTempAvatarImg"
        alt="New Avatar Preview"
        v-if="editTempAvatarImg !== ''"
      />
      <br />
      <label for="avatar" class="avatar__btn"
        >Envoyer une photo<i class="fa-solid fa-camera"></i
      ></label>
      <input
        ref="fileInput"
        class="user__upload__avatar"
        type="file"
        name="avatar"
        id="avatar"
        @change="onFileSelected"
        accept="image/*"
      />
      <br />
      <label for="first-name"></label>
      <input
        type="text"
        name="firstName"
        placeholder="Prénom"
        v-model="firstName"
        required="required"
      /><br /><span v-if="!isFirstNameValid">Prénom invalide !</span>
      <label for="last-name"></label>
      <input
        type="text"
        name="lastName"
        placeholder="Nom"
        v-model="lastName"
        required="required"
      /><br /><span v-if="!isLastNameValid">Nom invalide !</span>
      <label for="Email"></label>
      <input type="email" placeholder="Email" v-model="email" /><br /><span
        v-if="!isEmailValid"
        >Adresse email invalide !</span
      >
      <label for="Password"></label>
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        v-model="password"
      /><br /><span v-if="!isPasswordValid && password.length != 0"
        >Mot de passe invalide !</span
      >
      <label for="Password-confirmation"></label>
      <input
        type="password"
        name="passwordConfirm"
        placeholder="Confirmation mot de passe"
        v-model="passwordConfirm"
      /><br /><span
        v-if="!isPasswordConfirmValid && passwordConfirm.length != 0"
        >Mot de passe invalide !</span
      >
      <span v-if="isPasswordConfirmValid && !isMatchPasswordValid"
        >Les mots de passe ne correspondent pas !</span
      >
      <br />
      <button type="submit">Enregistrer</button><br />
    </form>
  </div>
</template>
<script>
import validator from 'validator';

export default {
  name: 'UserProfile',
  data() {
    return {
      avatar: this.$store.state.authenticatedUser?.avatar,
      firstName: this.$store.state.authenticatedUser?.firstName,
      lastName: this.$store.state.authenticatedUser?.lastName,
      email: this.$store.state.authenticatedUser?.email,
      password: '',
      passwordConfirm: '',
      editTempAvatarImg: `${process.env.VUE_APP_API_BASE_IMG_URL}${this.$store.state.authenticatedUser?.avatar}`,
      mimeTypesAuthorized: [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
      ],
    };
  },
  methods: {
    async userUpdate() {
      console.log(this.isFormValid, this.isFormChanged);
      if (!this.isFormValid || !this.isFormChanged) {
        return;
      }
      let body;
      let type = null;
      if (this.avatarImg) {
        body = new FormData();
        body.append('image', this.avatarImg);
        body.append(
          'user',
          JSON.stringify({
            firstName:
              this.firstName !== this.$store.state.authenticatedUser?.firstName
                ? this.firstName
                : undefined,
            lastName:
              this.lastName !== this.$store.state.authenticatedUser?.lastName
                ? this.lastName
                : undefined,
            email:
              this.email !== this.$store.state.authenticatedUser?.email
                ? this.email
                : undefined,
            password: this.password !== '' ? this.password : undefined,
          }),
        );
        type = 'formData';
      } else {
        body = JSON.stringify({
          firstName:
            this.firstName !== this.$store.state.authenticatedUser?.firstName
              ? this.firstName
              : undefined,
          lastName:
            this.lastName !== this.$store.state.authenticatedUser?.lastName
              ? this.lastName
              : undefined,
          email:
            this.email !== this.$store.state.authenticatedUser?.email
              ? this.email
              : undefined,
          password: this.password !== '' ? this.password : undefined,
        });
        type = 'json';
      }
      const reqObject = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
        body,
      };
      if (type === 'json') {
        reqObject.headers['Content-Type'] = 'application/json';
      }
      try {
        const res = await fetch(
          // eslint-disable-next-line no-underscore-dangle
          `${process.env.VUE_APP_API_BASE_URL}/users/${this.$store.state.userId}`,
          reqObject,
        );
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        }
        if (
          this.email !== this.$store.state.authenticatedUser?.email ||
          this.password !== ''
        ) {
          this.logout();
        } else {
          this.$router.push({ name: 'Home' });
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      }
    },

    onFileSelected(event) {
      [this.avatarImg] = event.target.files;
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.editTempAvatarImg = readerEvent.target.result;
      };
      reader.readAsDataURL(this.avatarImg);
    },
    logout() {
      this.$store.dispatch('setToken', { token: null });
      this.$store.dispatch('setUserId', { userId: null });
      this.$store.dispatch('setIsAdmin', { isAdmin: null });
      this.$store.dispatch('setAuthenticatedUser', { user: null });
      this.$router.push({ name: 'Login' });
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
      return (
        this.password === '' ||
        validator.isStrongPassword(this.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      );
    },
    isPasswordConfirmValid() {
      return (
        this.passwordConfirm === '' ||
        validator.isStrongPassword(this.passwordConfirm, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      );
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
    isFormChanged() {
      return (
        this.firstName !== this.$store.state.authenticatedUser?.firstName ||
        this.lastName !== this.$store.state.authenticatedUser?.lastName ||
        this.email !== this.$store.state.authenticatedUser?.email ||
        this.password !== this.$store.state.authenticatedUser?.password
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.h1__title {
  width: 90%;
  margin: 0.5rem auto;
  font-size: 1.5rem;
  font-weight: 900;
  text-align: center;
}
.avatar__img {
  width: auto;
  max-width: 150px;
  margin: 0.5rem auto;
}

.avatar__btn {
  margin: 0.5rem auto;
}

form {
  font-family: 'Lato', sans-serif;
  background: rgba(255, 255, 255, 0.2);
  padding: 1.5rem 0;
  height: 600px;
  border-radius: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  width: 95%;
  max-width: 500px;
  margin: 0 auto;
  z-index: 1;
}

input {
  font-family: 'Lato', sans-serif;
  background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.6rem;
  width: 90%;
  border-radius: 50px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  -moz-backdrop-filter: blur(5px);
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
  color: rgb(0, 0, 0);
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  margin-top: 0.7rem;
}

input:hover,
input[type='email']:focus,
input[type='password']:focus {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
}

.user__upload__avatar {
  display: none;
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
  font-weight: 700;
  cursor: pointer;
}

::placeholder {
  color: rgb(0, 0, 0);
}

.link {
  margin-top: 20px;
  widows: 100%;
}
</style>
