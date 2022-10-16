<template>
  <div class="container">
    <HeaderSite />
  </div>
</template>
<script>
import HeaderSite from '@/components/HeaderSite.vue';

export default {
  name: 'HomePage',
  components: { HeaderSite },
};
</script>
<style lang="scss" scoped>
.container {
  background-image: linear-gradient(
    to right top,
    #fd2d01,
    #ff553b,
    #ff7664,
    #ff9489,
    #ffb1ac,
    #ffbebb,
    #ffcac9,
    #ffd7d7,
    #ffd7d7,
    #ffd7d7,
    #ffd7d7,
    #ffd7d7
  );
  width: 100%;
  height: 100vh;
}
</style>
