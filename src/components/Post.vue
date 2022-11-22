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
      <div
        class="post__header__icons"
        v-if="
          this.$store.state.userId === post.user._id ||
          this.$store.state.isAdmin === true
        "
      >
        <button
          type="button"
          class="post__header__icons__edit"
          @click="postEdit = !postEdit"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          type="button"
          class="post__header__icons__delete"
          @click="deletePost"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    <div class="post__content" v-if="!postEdit">
      <p
        class="post__content__text"
        v-if="post.content !== undefined && !postEdit"
      >
        {{ post.content }}
      </p>

      <img
        class="post__content__img"
        :src="baseUrlImg + post.attachement"
        alt="contentImg"
        v-if="post.attachement !== undefined"
      />
    </div>
    <form v-else @submit.prevent="updatePostRequest()" class="post__content">
      <label for="postContent"></label>
      <textarea
        name="content"
        id="editContent"
        v-model="content"
        class="post__content__edit"
      ></textarea>
      <img
        class="post__content__img"
        :src="editTempImageUrl"
        alt="New post image Preview"
        v-if="editTempImageUrl !== ''"
      />
      <button
        type="button"
        @click="removeImagePreview()"
        v-if="editTempImageUrl !== ''"
        class="delete-btn"
      >
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
      <div class="post__footer__edit">
        <div class="post__form__footer__upload">
          <label :for="`postImage-${post._id}`"
            >Ajouter un fichier <i class="fa-solid fa-image"></i
          ></label>
          <input
            ref="fileInput"
            class="post__form__footer__upload__fileInput"
            type="file"
            name="image"
            :id="`postImage-${post._id}`"
            @change="onFileSelected"
            accept="image/*"
          />
        </div>
        <div class="post__form__footer__submit">
          <button type="submit" class="post__form__footer__submit--btn">
            Envoyer <i class="fa-sharp fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
    <div class="post__footer">
      <div class="post__footer__likes">
        <button
          type="button"
          class="post__footer__likes__icons"
          @click="likeDislike()"
        >
          <i class="fa-solid fa-thumbs-up"></i>
        </button>
        {{ post.usersLiked.length }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PostData',
  props: ['post'],
  emits: ['post-deleted', 'post-updated', 'toggle-like'],
  computed: {
    baseUrlImg() {
      return process.env.VUE_APP_API_BASE_IMG_URL;
    },
    isImageValid() {
      if (this.postImage === null) return true;
      return this.mimeTypesAuthorized.includes(this.postImage.type);
    },
    isLiked() {
      return this.post.usersLiked.includes(this.$store.state.userId);
    },
  },
  data() {
    return {
      postEdit: false,
      content: this.post.content,
      postImage: null,
      editTempImageUrl: this.post.attachement
        ? `${process.env.VUE_APP_API_BASE_IMG_URL}${this.post.attachement}`
        : '',
      mimeTypesAuthorized: [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
      ],
      deleteImage: false,
    };
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
          Authorization: `Bearer ${this.$store.state.token}`,
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
        // eslint-disable-next-line no-alert
        alert(error.message);
      }
    },
    onFileSelected(event) {
      this.deleteImage = false;
      [this.postImage] = event.target.files;
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.editTempImageUrl = readerEvent.target.result;
      };
      reader.readAsDataURL(this.postImage);
    },
    removeImagePreview() {
      this.postImage = null;
      this.editTempImageUrl = '';
      this.$refs.fileInput.value = null;
      this.deleteImage = true;
    },
    async updatePostRequest() {
      let body;
      let type = null;
      if (
        this.postImage !== null ||
        (this.deleteImage && this.post.attachement)
      ) {
        body = new FormData();
        if (this.deleteImage && this.post.attachement) {
          body.append('image', null);
        } else {
          body.append('image', this.postImage);
        }
        if (!this.content) {
          body.append('post', JSON.stringify({ content: null }));
        } else if (this.post.content !== this.content) {
          body.append('post', JSON.stringify({ content: this.content }));
        }
        type = 'formData';
      } else {
        if (this.post.content === this.content) {
          return;
        }
        if (!this.content) {
          body = JSON.stringify({ content: null });
        } else {
          body = JSON.stringify({
            content: this.content,
          });
        }
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
          `${process.env.VUE_APP_API_BASE_URL}/posts/${this.post._id}`,
          reqObject,
        );
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        }
        this.postImage = null;
        this.tempImageUrl = '';
        this.deleteImage = false;
        this.$refs.fileInput.value = null;
        this.postEdit = !this.postEdit;
        this.$emit('post-updated');
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      }
    },
    async likeDislike() {
      // cases
      const like = this.isLiked === false ? 1 : 0;

      // request
      const reqObject = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.state.token}`,
        },
        body: JSON.stringify({ like }),
      };
      try {
        const res = await fetch(
          // eslint-disable-next-line no-underscore-dangle
          `${process.env.VUE_APP_API_BASE_URL}/posts/${this.post._id}/reaction`,
          reqObject,
        );
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        }
        this.$emit('toggle-like');
      } catch (error) {
        // eslint-disable-next-line no-alert
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

    &__edit {
      border: 0;
      margin: 0.2rem;
      padding: 0;
      font-size: 1rem;
    }

    &__delete {
      border: 0;
      margin: 0.2rem;
      padding: 0;
      font-size: 1rem;
    }
  }
}

.fa-solid {
  padding: 0 5px;
}

.post__content {
  padding: 0 16px;
  width: 100%;

  &__edit {
    outline: none;
    border-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    width: 95%;
    height: 80px;
    margin: 0 auto;
    padding: 8px;
    resize: vertical;
  }

  &__img {
    display: block;
    margin: 8px auto 0;
    width: 100%;
    max-width: 600px;
  }
}

.post__footer {
  &__likes {
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 600;

    &__icons {
      border: 0;
      margin: 0.2rem;
      padding: 0;
      font-size: 1rem;
    }

    &__edit {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
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

.post__form__footer__submit--btn {
  border: 0;
  font-family: 'Lota', sans-serif;
  font-size: 1rem;
  margin: 5px auto;
}

.delete-btn {
  border: 0;
  font-size: 1.5rem;
  color: #fd2d01;
}

@media (max-width: 768px) {
  .post__header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    vertical-align: center;
    margin: 0 auto;
    padding: 8px;

    &__icons {
      display: flex;
      flex-direction: row;
      margin-left: 10px;
      padding: 5px;

      &__edit {
        border: 0;
        margin: 0.2rem;
        padding: 0;
        font-size: 1rem;
      }

      &__delete {
        border: 0;
        margin: 0.2rem;
        padding: 0;
        font-size: 1rem;
      }
    }
  }
}
</style>
