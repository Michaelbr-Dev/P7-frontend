<template>
  <div class="header">
    <div>
      <img
        src="../assets/icon-left-font-monochrome-black.png"
        alt="Logo Groupomania"
        class="header-logo"
      />
    </div>
    <nav></nav>
    <div class="action">
      <a href="#" class="profile" @click.prevent.stop="menuToggle">
        <img src="https://via.placeholder.com/52" alt="Image utilisateur" />
      </a>
      <div class="menu" :class="{ active: isMenuOpen }">
        <p>Prenom Nom</p>
        <ul>
          <li><i class="fas fa-user"></i><a href="#">Mon Profile</a></li>
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
    };
  },
  methods: {
    menuToggle() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="scss">
.header {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header-logo {
  padding: 0.2rem;
  height: 65px;
}

.action {
  width: 65px;
  height: 65px;
  margin-right: 15px;
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
</style>
