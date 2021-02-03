<template>
  <div class="wallet-layout" @click="$emit('click')">
    <div class="wallet-layout__title txt">
      {{ !isLoading ? options.title : "Initializing..." }}
    </div>
    <div class="wallet-layout__image-wrapper">
      <img
        class="wallet-layout__image"
        :src="options.image"
        :alt="`${options.title}-image`"
      />
    </div>
  </div>
</template>

<script>
//  @params options(Object), options.title(String), options.image(require(String)), options(Boolean)

export default {
  props: {
    options: Object,
    isLoading: Boolean
  }
};
</script>

<style lang="scss" scoped>
.wallet-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 67px;
  padding: 0 14px;

  background-color: $white;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-radius: 11px;

  cursor: pointer;
}
.wallet-layout__image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
}
</style>
