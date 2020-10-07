<template>
  <div class="menu" v-click-outside="() => (open = false)">
    <div @click="openClick">
      <slot name="trigger"></slot>
    </div>
    <ul :class="{ open: open }" ref="menuRef">
      <slot name="item"></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  onBeforeMount,
  onMounted,
  onUnmounted
} from "vue";

export default defineComponent({
  name: "LMenu",
  setup() {
    const open = ref(false);
    const openClick = () => {
      open.value = !open.value;
    };
    const menuRef = ref<HTMLUListElement>();

    const listItemClick = () => {
      open.value = false;
    };
    onMounted(() => {
      const children = menuRef.value?.children;
      if (children?.length) {
        for (const child of children) {
          child.addEventListener("click", listItemClick);
        }
      }
    });
    return { open, openClick, menuRef };
  }
});
</script>

<style lang="scss" scoped>
.menu {
  position: relative;
}

.menu ul {
  background-color: white;
  position: absolute;
  display: flex;
  visibility: hidden;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  list-style: none;
  width: 150px;
  height: 120px;
  border-radius: 5px;
  box-shadow: 0 0 10px #dbdbdb;
  cursor: pointer;
  padding: 0;
}

.menu ul li {
  font-size: 14px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.menu ul li:hover {
  background-color: #f1f1f1;
}
.menu ul li:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.menu ul li:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.menu .open {
  visibility: visible;
}

.logout {
  border-top: 1px solid whitesmoke;
  color: #ff2d2d;
}
</style>
