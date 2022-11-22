<template>
  <div class="header">
    <div class="logo">
      <img
        src="../assets/logo.png"
        alt="Logo Groupomania"
        class="header-logo"
      />
      <h1>Groupomania</h1>
    </div>
    <nav></nav>
    <div class="action">
      <a href="#" class="profile" @click.prevent.stop="menuToggle">
        <img
          :src="`${apiBaseImgUrl}${$store.state.authenticatedUser?.avatar}`"
          :alt="`${$store.state.authenticatedUser?.firstName} ${$store.state.authenticatedUser?.lastName}`"
        />
      </a>
      <div class="menu" :class="{ active: isMenuOpen }">
        <p>
          {{ $store.state.authenticatedUser?.firstName }}
          {{ $store.state.authenticatedUser?.lastName }}
        </p>
        <ul>
          <li>
            <i class="fas fa-home"></i><router-link to="/">Accueil</router-link>
          </li>
          <li>
            <i class="fas fa-user"></i
            ><router-link to="/profile">Mon profil</router-link>
          </li>
          <li>
            <i class="fas fa-sign-out-alt"></i
            ><a href="#" @click="logout">Déconnexion</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderSite',
  data: () => {
    return {
      isMenuOpen: false,
      apiBaseImgUrl: process.env.VUE_APP_API_BASE_IMG_URL,
    };
  },
  methods: {
    menuToggle() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    logout() {
      this.$store.dispatch('setToken', { token: null });
      this.$store.dispatch('setUserId', { userId: null });
      this.$store.dispatch('setIsAdmin', { isAdmin: null });
      this.$store.dispatch('setAuthenticatedUser', { user: null });
      this.$router.push({ name: 'Login' });
    },
  },
  created() {
    this.$store.dispatch('refreshUserData');
  },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  max-width: 760px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight: 900;
}

.header-logo {
  padding: 0.2rem;
  height: 65px;
}

.action {
  width: 65px;
  height: 65px;
  margin-right: 15px;
  position: relative;
  z-index: 2;
}

.action .profile {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  display: block;
}
.action .profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.action .menu {
  position: absolute;
  top: 120px;
  right: 0.3rem;
  padding: 10px 20px;
  background: #fff;
  width: 200px;
  box-sizing: 0 5px 25px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  transition: 0.5s;
  visibility: hidden;
  opacity: 0;
}
.action .menu.active {
  top: 80px;
  visibility: visible;
  opacity: 1;
  margin-right: 15px;
}

.active {
  position: absolute;
}

.action .menu::before {
  content: '';
  position: absolute;
  top: -5px;
  right: 28px;
  width: 20px;
  height: 20px;
  background: #fff;
  transform: rotate(45deg);
}
.action .menu p {
  width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 5px 0;
  font-weight: 500;
  color: #555;
  line-height: 1.2em;
}

.action .menu ul li {
  list-style: none;
  padding: 12px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: left;
  cursor: pointer;
}
.action .menu ul li i {
  max-width: 20px;
  margin-right: 20px;
  color: #555;
  transition: 0.3s;
}
.action .menu ul li:hover i {
  color: #ff5d94;
}
.action .menu ul li a {
  display: inline-block;
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: 0.3s;
}
.action .menu ul li:hover a {
  color: #ff5d94;
}

@media (max-width: 768px) {
  .header {
    width: 95%;
    max-width: 760px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .logo {
    margin-top: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-top: 0;
  }

  .action {
    margin-right: 0;
  }
}
</style>
