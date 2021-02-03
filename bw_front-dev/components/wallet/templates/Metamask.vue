<template>
  <wallet :options="options" :isLoading="isLoading" @click="connectMetamask()">
  </wallet>
</template>

<script>
import walletTemplate from "@/components/wallet/wallet-template.vue";

export default {
  components: {
    wallet: walletTemplate
  },
  data() {
    return {
      options: {
        title: "Metamask",
        image: require("@/assets/images/provider-logotypes/metamask-logo.png")
      },
      isLoading: false
    };
  },
  methods: {
    async connectMetamask() {
      this.isLoading = true;

      await this.$store.dispatch("web3/connectToProvider");

      this.isLoading = false;
      this.$modal.hideAll();
    }
  }
};
</script>

<style lang="scss" scoped></style>
