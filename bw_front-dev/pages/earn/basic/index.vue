<template>
  <div>
    basic
  </div>
</template>

<script>
export default {
  middleware({ redirect }) {
      return redirect("/earn/basic/take");
  }
};
</script>

<style lang="scss" scoped></style>
