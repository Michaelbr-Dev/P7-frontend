<template>
  <div class="container">
    <HeaderSite />
    <CreatePost @post-created="getAllPosts()" />
    <PostList :posts="posts" @post-deleted="getAllPosts()" />
  </div>
</template>
<script>
import HeaderSite from '@/components/HeaderSite.vue';
import CreatePost from '@/components/CreatePost.vue';
import PostList from '@/components/PostList.vue';

export default {
  name: 'HomePage',
  created() {
    this.getAllPosts();
  },
  data: () => {
    return {
      posts: [],
    };
  },
  components: { HeaderSite, PostList, CreatePost },
  methods: {
    async getAllPosts() {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_BASE_URL}/posts/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) {
          throw Error(res.message);
        }
        const data = await res.json();
        this.posts = data.posts;
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
  background-color: #ffd7d7;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 32px;
}
</style>
