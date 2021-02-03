<template>
  <div class="nav">
    <nuxt-link
      :to="info.path"
      class="col links txt"
      v-for="(info, idx) in text"
      :key="idx"
      >{{ info.title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "NavCards",
  props: {
    text: {
      title: String,
      path: String
    }
  }
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-around;
  width: 314px;
  height: auto;
  border: 1px solid $brand;
  margin: 0 auto;
  border-radius: 20px;
  margin-bottom: 21px;

  .links {
    background: $surface3;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: $brand;
    padding: 7px 0px;

    &:last-child {
      border-radius: 0px 20px 20px 0px;
    }
    &:first-child {
      border-radius: 20px 0px 0px 20px;
    }

    &:not(:last-child) {
      border-right: 1px solid $brand;
    }
  }

  .nuxt-link-active {
    background: $brand !important;
    font-weight: 700 !important;
    color: $white !important;

    text-decoration: none;
    cursor: default;
  }

}
</style>
