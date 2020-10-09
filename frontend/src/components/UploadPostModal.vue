<template>
  <teleport to="#modal-container">
    <div v-show="open" class="modal-container" @click="closeClick">
      <transition name="fade">
        <div v-show="open" class="modal-content" @click.stop>
          <div>
            <input
              @change="onImageSelect"
              hidden
              type="file"
              accept="image/*"
              ref="fileInput"
            />
            <div
              v-if="!selectedImage"
              class="upload-box"
              @click="fileInput && fileInput.click()"
            >
              <span>Select an image</span>
            </div>
            <div v-else>
              <img class="selected-image" :src="selectedImage" />
            </div>
            <div>
              <span class="form-field-error" v-if="imageError">{{
                imageError
              }}</span>
            </div>
          </div>
          <div class="description-container">
            <textarea
              maxlength="200"
              class="description"
              v-model="description"
              placeholder="Enter a description (optional)"
            />
          </div>
          <div class="button-row">
            <button @click="postClick">Post</button>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PostDetail from "@/models/PostDetail";
import { Globals } from "@/store";
import { useAxios } from "@/main";
import { AxiosResponse } from "axios";

export default defineComponent({
  props: {
    open: Boolean
  },
  setup(_, { emit }) {
    const fileInput = ref<HTMLInputElement>();
    const selectedImage = ref<string | ArrayBuffer | null | undefined>("");
    const description = ref("");
    const imageError = ref("");
    const closeClick = () => {
      selectedImage.value = null;
      description.value = "";
      if (fileInput.value?.value) {
        fileInput.value.value = "";
      }
      emit("close");
    };
    const postClick = () => {
      if (!selectedImage.value || !fileInput.value || !fileInput.value.files) {
        imageError.value = "Please select an image to upload";
        return;
      }
      const formData = new FormData();
      // dict of all elements
      formData.append("file", fileInput.value.files[0]);
      formData.append("description", description.value);
      useAxios()
        .post<{}, AxiosResponse<PostDetail>>("posts/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          Globals.postDetailList.value.push(response.data);
          if (fileInput.value?.value) {
            fileInput.value.value = "";
          }
          emit("close");
        });
    };

    const onImageSelect = (event: InputEvent) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.length ? target.files[0] : undefined;
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          selectedImage.value = e.target?.result;
        };
        imageError.value = "";
        reader.readAsDataURL(file);
      }
    };

    return {
      closeClick,
      fileInput,
      postClick,
      selectedImage,
      onImageSelect,
      description,
      imageError
    };
  }
});
</script>

<style lang="scss" scoped>
.modal-container {
  display: flex;
  position: fixed;
  z-index: 10;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  flex-direction: column;
  display: flex;
  background-color: white;
  box-shadow: 0 0 50px grey;
  border-radius: 5px;
  padding: 10px 10px;
  align-items: center;
  max-width: 60%;
  max-height: 100%;
}

.fade-enter-active {
  animation: fade-in 0.2s;
}

.fade-leave-active {
  animation: fade-in 0.3s reverse;
}

@keyframes fade-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.upload-box {
  height: 200px;
  width: 400px;
  border: 2px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 10px;
  flex-grow: 1;
  cursor: pointer;

  &:hover {
    color: lightblue;
    border-color: lightblue;
  }
}

.description {
  font-size: 16px;
  width: inherit;
  height: 100px;
}

.description-container {
  width: 100%;
}

.button-row {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 10px;

  button {
    font-size: 18px;
    width: 100px;
    padding: 5px 10px;
    background-color: #77b8fb;
    color: white;
    border: none;
    box-shadow: 0 0 2px #77b8fb;
    border-radius: 5px;
    cursor: pointer;
  }
}

.selected-image {
  width: 100%;
}
</style>
