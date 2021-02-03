<template>
  <div>
    <nav-cards
      :text="[
        { title: 'ADD LIQUIDITY', path: '/earn/liquid/take' },
        { title: 'REMOVE LIQUIDITY', path: '/earn/liquid/return' }
      ]"
    />
    <div class="card">
      <Token
        :options="{
          title: 'You add:',
          balance: black.balance,
          isDisabled: false,
          symbol: black.symbol,
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="whiteBlack"
        @input="shotList"
      ></Token>
      <Token
        :options="{
          title: 'And',
          balance: white.balance,
          isDisabled: false,
          symbol: white.symbol,
          icon: require('@/assets/images/tokens/white.svg')
        }"
        v-model="whiteBlack"
      ></Token>
      <div class="p-2 ml-3" @click="$router.push('/earn/basic/return')">
        <img src="@/assets/images/to.svg" alt="" style="float: left" />
      </div>
      <Token
        :options="{
          title: 'You take',
          balance: primary.balance,
          isDisabled: true,
          symbol: 'LPBW',
          icon: ''
        }"
        v-model="lpbw"
      ></Token>
      <Rate></Rate>

      <Button
        v-if="!account.address"
        text="CONNECT WALLET"
        @click.native="openWalletModal"
        type="big"

      />

      <Button
        v-else
        :text="!isLoading ? 'TAKE BLACK & WHITE' : 'Processing...'"
        type="big"
        @click="!isLoading ? buyLiquidity() : ''"
      />
    </div>
    <ListLiquid
      :title="[
        {
          text: 'Min received',
          value: `${this.lpbw} LPBW`
        },
        {
          text: `Share of Pool `,
          value: `0.34%`
        }
      ]"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WalletModal from "@/components/modal/templates/WalletModal";
import Button from "@/components/UIComponents/Button";
import NavCards from "@/components/UIComponents/NavCards";

export default {
  layout: "earn",
  components: {
    Button,
    NavCards
  },
  data() {
    return {
      show: false,
      whiteBlack: "",
      isReverse: true,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      account: "web3/account",
      black: "contracts/black/contract",
      white: "contracts/white/contract",
      primary: "contracts/secondaryPrimary/contract",
      collateralization: "contracts/secondaryCollateralization/contract"
    }),

    lpbw() {
      return this.whiteBlack / 1;
    }
  },
  methods: {
    shotList() {
      if (this.whiteBlack.length && this.account.address) {
        this.$emit("openList");
      } else {
        this.$emit("closeList");
      }
    },
    openWalletModal() {
      this.$modal.show(
        WalletModal,
        {
          details: {}
        },
        {
          width: 314
        }
      );
    },
    async buyLiquidity () {
      await this.$store.dispatch("contracts/secondaryPrimary/buyLiquidity", this.whiteBlack);
    }
  }
};
</script>

<style scoped></style>
