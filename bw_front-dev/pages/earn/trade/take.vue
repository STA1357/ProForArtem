<template
  ><div>
    <nav-cards
      :text="[
        { title: 'ADD LIQUIDITY', path: '/earn/trade/return' },
        { title: 'REMOVE LIQUIDITY', path: '/earn/trade/take' }
      ]"
    />
    <div class="card">
      <div class="mb-2 d-flex row">
        <div class="col-6 desciption">
          Your Pool Tokens: <img src="@/assets/images/info.svg" alt="" />
        </div>
        <div class="col-6 price">
          3.166 LPBW
        </div>
        <div class="col-6 desciption">
          Pooled WHITE: <img src="@/assets/images/info.svg" alt="" />
        </div>
        <div class="col-6 price">
          912.333
        </div>
        <div class="col-6 desciption">
          Pooled BLACK: <img src="@/assets/images/info.svg" alt="" />
        </div>
        <div class="col-6 price">
          912.333
        </div>
        <div class="col-6 desciption">
          Pooled ETH: <img src="@/assets/images/info.svg" alt="" />
        </div>
        <div class="col-6 price">
          1.400053
        </div>
        <div class="col-6 desciption">
          Your Share of Pool: <img src="@/assets/images/info.svg" alt="" />
        </div>
        <div class="col-6 price">
          0.34%
        </div>
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
      msg: "MAX",
      show: false,
      eth: "",
      blackC: "",
      whiteC: "",
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
      if (this.eth.length !== 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.desciption {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 9px;
  color: $brand;
  text-align: left;
}
.price {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  margin-bottom: 9px;
  color: $brand;
}
</style>
