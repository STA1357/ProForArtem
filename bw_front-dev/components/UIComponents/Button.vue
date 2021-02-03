<template>
  <span :class="type" @click="$emit('click')">
    {{ text }}
  </span>
</template>

<script>
//  @params text(String)
//  @params type(String -> class)
export default {
  name: "Button",
  props: {
    text: String,
    type: String
  }
};
</script>

<style scoped lang="scss">
.big {
  background: $brand;
  border: 1px solid $brand;
  border-radius: 11px;
  width: 286px;
  height: 52px;

  @font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  text-align: center;
  text-transform: uppercase;
  color: $white;
  padding: 15px 6px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: rgba($brand, 0.9);
  }
}
.small {
  background: $brand;
  border-radius: 11px;

  @font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  text-align: center;
  padding: 5px 14px;
  color: $white;
  width: 84px;
  height: 25.58px;
}
</style>
