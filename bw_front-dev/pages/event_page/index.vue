<template>
    <div></div>
</template>

<script>
    export default {
        name: "index",
      middleware({ redirect }) {
        return redirect("/event_page/live");
      }
    }
</script>

<style scoped>

</style>
