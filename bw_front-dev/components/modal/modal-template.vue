<template>
  <div class="modal-layout">
    <div class="modal-layout__container">
      <div class="modal-layout__header">
        <div class="modal-layout__title txt"><slot name="title"></slot></div>
        <div class="modal-layout__exit" @click="$modal.hideAll()">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.15186"
              width="19.5501"
              height="1.62918"
              transform="rotate(45 1.15186 0)"
            />
            <rect
              y="13.8479"
              width="19.5501"
              height="1.62918"
              transform="rotate(-45 0 13.8479)"
            />
          </svg>
        </div>
      </div>

      <div class="modal-layout__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-layout {
  width: auto;
  height: auto;
  background: $surface3;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 19px;
  padding: 22px 14px;
}
.modal-layout__container {
  width: 100%;
}
.modal-layout__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding: 0 12px 0 12px;
}
.modal-layout__exit {
  @include svg-color($surface7);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
}
.modal-layout__title {
  font-size: 14px;
  line-height: 17px;
}
</style>
