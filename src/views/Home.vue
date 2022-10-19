<template>
  <div class="container">
    <HeaderSite />
    <div class="post__form">
      <div class="post__form__user__img">
        <img src="https://via.placeholder.com/48" alt="Prénom Nom" />
      </div>
      <div class="post__form__content">
        <form>
          <label for="postContent"></label>
          <textarea
            class="post__form__content__input__textarea"
            placeholder="Que voulez-vous dire ?"
          ></textarea>
        </form>
        <!-- if file attached -->
        <div class="post__form__content__attachement">
          <img src="#" alt="" class="attachement__img" />
        </div>
        <!-- if file attached -->
        <div class="post__form__footer">
          <div class="post__form__footer__upload">
            Ajouter un fichier <i class="fa-solid fa-image"></i>
          </div>
          <div class="post__form__footer__submit">
            Envoyer <i class="fa-sharp fa-solid fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
    <PostList :posts="posts" />
  </div>
</template>
<script>
import HeaderSite from '@/components/HeaderSite.vue';
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
  components: { HeaderSite, PostList },
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

.post__form {
  width: 80%;
  max-width: 760px;
  margin: 48px auto 0;
  font-family: 'Lato', sans-serif;
  background-color: rgb(243, 243, 243);
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  display: flex;
  flex-direction: row;

  &__content {
    width: 100%;
    margin: 8px;
    padding: 8px;

    &__input__textarea {
      outline: none;
      border-color: rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      width: 100%;
      height: 80px;
      padding: 8px;
      resize: vertical;
    }
  }

  &__user {
    &__img {
      margin: 8px;
      padding: 8px;
    }
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 16px 0;
  }
}
</style>
