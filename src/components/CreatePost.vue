<template>
  <div class="post__form">
    <div class="post__form__user__img">
      <img src="https://via.placeholder.com/48" alt="Prénom Nom" />
    </div>
    <div class="post__form__content">
      <form @submit.prevent="newPostRequest()">
        <label for="postContent"></label>
        <textarea
          class="post__form__content__input__textarea"
          placeholder="Que voulez-vous dire ?"
          v-model="textarea"
        ></textarea>

        <!-- if file attached -->
        <div class="post__form__content__attachement" v-if="postImage">
          <img
            :src="tempImageUrl"
            alt="New post image Preview"
            class="post__form__content__attachement__img"
          />
          <button type="button" @click="removeImagePreview()">
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
        <!-- if file attached -->
        <div class="post__form__footer">
          <div class="post__form__footer__upload">
            <label for="postImage"
              >Ajouter un fichier <i class="fa-solid fa-image"></i
            ></label>
            <input
              ref="fileInput"
              class="post__form__footer__upload__fileInput"
              type="file"
              name="image"
              id="postImage"
              @change="onFileSelected"
              accept="image/*"
            />
          </div>
          <div class="post__form__footer__submit">
            <button type="submit">
              Envoyer <i class="fa-sharp fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CreatePost',
  computed: {
    isImageValid() {
      if (this.postImage === null) return true;
      return this.mimeTypesAuthorized.includes(this.postImage.type);
    },
  },
  data() {
    return {
      postImage: null,
      tempImageUrl: '',
      textarea: '',
      mimeTypesAuthorized: [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
      ],
    };
  },
  methods: {
    onFileSelected(event) {
      [this.postImage] = event.target.files;
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.tempImageUrl = readerEvent.target.result;
      };
      reader.readAsDataURL(this.postImage);
    },
    removeImagePreview() {
      this.postImage = null;
      this.tempImageUrl = '';
      this.$refs.fileInput.value = null;
    },
    async newPostRequest() {
      const formData = new FormData();
      if (this.textarea) {
        formData.append('post', JSON.stringify({ content: this.textarea }));
      }
      formData.append('image', this.postImage);

      const reqObject = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      };
      try {
        const res = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/posts`,
          reqObject,
        );
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        }
        this.textarea = '';
        this.postImage = null;
        this.tempImageUrl = '';
        this.$refs.fileInput.value = null;
        this.$emit('post-created');
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      }
    },
  },
};
</script>
<style lang="scss">
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

    &__attachement__img {
      display: block;
      margin: 8px auto 0;
      width: 100%;
      max-width: 600px;
    }

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

    &__upload__fileInput {
      display: none;
    }
  }
}
</style>
