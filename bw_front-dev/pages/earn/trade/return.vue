<template
  ><div>
    <nav-cards
      :text="[
        { title: 'ADD LIQUIDITY', path: '/earn/trade/return' },
        { title: 'REMOVE LIQUIDITY', path: '/earn/trade/take' }
      ]"
    />
    <div class="card">
      <Token
        :options="{
          title: 'You give:',
          balance: white.balance,
          isDisabled: false,
          symbol: 'WHITE',
          icon: require('@/assets/images/tokens/white.svg')
        }"
        v-model="whiteC"
        @input="shotList"
      ></Token>
      <div class="p-2 ml-3">
        <img src="@/assets/images/plus.svg" alt="" style="float: left" />
      </div>
      <Token
        :options="{
          title: 'You give:',
          balance: black.balance,
          isDisabled: false,
          symbol: 'BLACK',
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="blackC"
        @input="shotList"
      ></Token>
      <div class="p-2 ml-3">
        <img src="@/assets/images/plus.svg" alt="" style="float: left" />
      </div>
      <Token
        :options="{
          title: 'You give:',
          balance: account.balance,
          isDisabled: false,
          symbol: 'ETH',
          icon: require('@/assets/images/tokens/eth.svg')
        }"
        v-model="eth"
        @input="shotList"
      ></Token>
      <div class="d-flex check-price justify-content-between">
        <span class="col-5">Aggregate price:</span>
        <span class="col-7"
          >{{ BWtokensPerOneETC | truncated }} B&W per 1 ETH</span
        >
      </div>

      <Button text="ADD LIQUIDITY" type="big" />
    </div>
    
  </div>
</template>

<script>
import Button from "@/components/UIComponents/Button";
import NavCards from "@/components/UIComponents/NavCards";

import { mapGetters } from "vuex";

export default {
  layout: "earn",
  name: "trade",
  components: {
    NavCards,
    Button,
  },
  data() {
    return {
      show: false,
      eth: "",
      whiteBlack: "",
        whiteC:'',
        blackC:''
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
        this.whiteBlack = (this.eth * this.BWtokensPerOneETC).toFixed(2);
        return this.whiteBlack;
      },
      set(newValue) {
        return this.eth;
      }
    }
  },
  methods: {
    shotList() {
      if (
        this.eth.length !== 0 &&
        this.blackC.length !== 0 &&
        this.whiteC.length !== 0
      ) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped></style>
