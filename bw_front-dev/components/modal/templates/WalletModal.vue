<template>
  <modal>
    <template #title>
      Connect to a wallet
    </template>

    <div class="wallets">
      <Metamask></Metamask>
    </div>
  </modal>
</template>

<script>
import modalTemplate from "../modal-template.vue";

import Metamask from "@/components/wallet/templates/Metamask.vue";

export default {
  components: {
    modal: modalTemplate
  }
};
</script>

<style lang="scss" scoped></style>
