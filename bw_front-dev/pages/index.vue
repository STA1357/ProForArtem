<template>
  <div class="hello">
    index
  </div>
</template>

<script>
    export default {
        middleware({ redirect }) {
            return redirect("/earn/basic/take");
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
