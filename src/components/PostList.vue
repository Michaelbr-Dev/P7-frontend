<template>
  <Post
    v-for="post in sortedPosts"
    :key="post._id"
    :post="post"
    @post-deleted="$emit('post-deleted')"
    @post-updated="$emit('post-updated')"
    @toggle-like="$emit('toggle-like')"
  />
</template>
<script>
import Post from '@/components/Post.vue';

export default {
  name: 'PostList',
  emits: ['post-deleted', 'post-updated', 'toggle-like'],
  components: {
    Post,
  },
  data: () => {
    return {
      sorting: -1,
    };
  },
  props: ['posts'],
  computed: {
    sortedPosts() {
      const posts = [...this.posts];
      return posts.sort((a, b) => {
        const postA = new Date(a.createdAt);
        const postB = new Date(b.createdAt);
        return (postA - postB) * this.sorting;
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
