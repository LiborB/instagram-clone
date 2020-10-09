<template>
  <teleport to="#modal-container">
    <div v-if="open" class="modal-container" @click="closeClick">
      <transition name="fade">
        <div v-if="open" class="modal-content" @click.stop></div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PostDetail from "@/models/PostDetail";

export default defineComponent({
  props: {
    open: Boolean,
    postDetail: Object as PropType<PostDetail>
  },
  emits: ["close"],
  setup(_, { emit }) {
    const closeClick = () => {
      emit("close");
    };
    return { closeClick };
  }
});
</script>

<style lang="scss">
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
</style>
