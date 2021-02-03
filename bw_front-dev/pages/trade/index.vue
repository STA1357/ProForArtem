<template>
  <div>
  </div>
</template>

<script>
    export default {
        middleware({ redirect }) {
            return redirect("/trade/take");
        }
    }
</script>

<style scoped></style>
