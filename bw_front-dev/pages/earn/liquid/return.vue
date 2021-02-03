<template
  ><div>
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
          balance: white.balance,
          isDisabled: false,
          symbol: white.symbol,
          icon: require('@/assets/images/tokens/white.svg')
        }"
        v-model="whiteBlack"
        @input="shotList"
      ></Token>
      <Token
        :options="{
          title: 'And',
          balance: black.balance,
          isDisabled: false,
          symbol: black.symbol,
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="whiteBlack"
        @input="shotList"
      ></Token>
      <div class="p-2 ml-3">
        <img
          src="@/assets/images/to.svg"
          alt=""
          style="float: left; cursor: pointer"
          @click="$router.push('/earn/liquid/take')"
        />
      </div>
      <Token
        :options="{
          title: 'You give:',
          balance: account.balance,
          isDisabled: true,
          symbol: 'ETH',
          icon: require('@/assets/images/tokens/eth.svg')
        }"
        v-model="eth"
      ></Token>
      <div class="d-flex check-price justify-content-between">
        <span class="col-5">Aggregate price:</span>
        <span class="col-7"
          >{{ BWtokensPerOneETC | truncated }} B&W per 1 LPBW</span
        >
      </div>

      <Button text="ADD BLACK & WHITE" type="big" />
    </div>

  </div>
</template>

<script>
import Button from "@/components/UIComponents/Button";
import NavCards from "@/components/UIComponents/NavCards";

import { mapGetters } from "vuex";

export default {
  layout: "earn",
  name: "liquid",
  components: {
    NavCards,
    Button,
  },
  data() {
    return {
      show: false,
      eth: "",
      whiteBlack: ""
    };
  },
  computed: {
    ...mapGetters({
      account: "web3/account",
      black: "contracts/black/contract",
      white: "contracts/white/contract",
      primary: "contracts/primary/contract",
      collateralization: "contracts/collateralization/contract"
    }),

    BWtokensPerOneETC() {
      return 1e18 / this.primary.BWprice / Math.pow(10, this.black.decimals);
    },
    measurementValueDisplay: {
      get() {
        this.eth = (this.whiteBlack / this.BWtokensPerOneETC).toFixed(2);
        return this.eth;
      },
      set(newValue) {
        return this.whiteBlack;
      }
    }
  },
  methods: {
    shotList() {
      if (this.whiteBlack.length !== 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped></style>
