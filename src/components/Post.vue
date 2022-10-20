<template>
  <div class="post">
    <div class="post__header">
      <div class="post__header__user__img">
        <img
          :src="baseUrlImg + post.user.avatar"
          alt="{{ post.user.firstName post.user.lastName }}"
        />
      </div>
      <div class="post__header__user">
        {{ `${post.user.firstName} ${post.user.lastName}` }}
        <span class="post__header__user__date">
          Ajouté le {{ createdDate(post.createdAt) }} à
          {{ createdDateTime(post.createdAt) }}
        </span>
      </div>
      <div class="post__header__icons" v-if="myUserId === post.user._id">
        <div class="title__header__icons__edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </div>
        <button
          type="button"
          class="title__header__icons__delete"
          @click="deletePost"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    <div class="post__content">
      <p class="post__content__text" v-if="post.content !== undefined">
        {{ post.content }}
      </p>
      <img
        class="post__content__img"
        :src="baseUrlImg + post.attachement"
        alt="contentImg"
        v-if="post.attachement !== undefined"
      />
    </div>
    <div class="post__footer">
      <div class="post__footer__likes">
        <i class="fa-solid fa-thumbs-up"></i> {{ post.likes }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PostData',
  props: ['post'],
  computed: {
    baseUrlImg() {
      return process.env.VUE_APP_API_BASE_IMG_URL;
    },
    myUserId() {
      return localStorage.getItem('userId');
    },
  },
  methods: {
    createdDate(postDate) {
      const date = new Date(postDate);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleString('fr-FR', options);
    },
    createdDateTime(postDate) {
      const date = new Date(postDate);
      const options = { hour: 'numeric', minute: 'numeric' };
      return date.toLocaleString('fr-FR', options);
    },
    async deletePost() {
      const reqObject = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      try {
        const res = await fetch(
          // eslint-disable-next-line no-underscore-dangle
          `${process.env.VUE_APP_API_BASE_URL}/posts/${this.post._id}`,
          reqObject,
        );
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        }
        this.$emit('post-deleted');
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
<style lang="scss">
.post {
  width: 80%;
  max-width: 760px;
  margin: 32px auto 0;
  font-family: 'Lato', sans-serif;
  background-color: rgb(243, 243, 243);
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

.post__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  vertical-align: center;
  margin: 0 auto;
  padding: 8px;

  &__user {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 22px;
    font-weight: 700;
    margin: 0 4px;
    padding: 4px;

    &__date {
      margin-top: 0;
      font-size: 13px;
      font-weight: 300;
    }

    &__img img {
      width: 48px;
      height: 48px;
      margin: 8px;
    }
  }

  &__icons {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    padding: 5px;
  }
}

.fa-solid {
  padding: 0 5px;
}

.post__content {
  padding: 0 16px;

  &__img {
    display: block;
    margin: 8px auto 0;
    width: 100%;
    max-width: 600px;
  }
}

.post__footer__likes {
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 600;
}

.fa-pen-to-square {
  color: rgb(79, 180, 79);
}

.fa-trash {
  color: rgb(209, 49, 49);
}

.fa-paper-plane,
.fa-image {
  color: #4e5166;
}
</style>
