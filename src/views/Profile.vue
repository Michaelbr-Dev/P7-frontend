<template>
  <div class="container">
    <HeaderSite />
    <UserProfile />
  </div>
</template>
<script>
import UserProfile from '@/components/UserProfile.vue';
import HeaderSite from '@/components/HeaderSite.vue';

export default {
  name: 'ProfileView',
  components: { HeaderSite, UserProfile },
};
</script>
<style lang="scss" scoped>
.container {
  width: 95%;
  max-width: 760px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 32px;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
    max-width: 760px;
  }
}
</style>
