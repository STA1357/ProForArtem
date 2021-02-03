<template>
  <div>
    <match-card />
    <nav-cards
      :text="[
        { title: 'LIQUID POOL', path: '/trade/take' },
        { title: 'TRADE POOL', path: '/trade/return' }
      ]"
    />
    <div class=" " style="margin: 0 auto;" id="wrapper">
      <div>
        <div class="card" id="tobeClipped">
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
          <div class="p-2 ml-3" @click="$router.push('/trade/return')">
            <img src="@/assets/images/to.svg" alt="" style="float: left" />
          </div>
          <Token
            :options="{
              title: 'You give:',
              balance: black.balance,
              isDisabled: false,
              symbol: 'BLACK',
              icon: require('@/assets/images/tokens/black.svg')
            }"
            v-model="whiteBlack"
            @input="shotList"
          ></Token>
          <div class="d-flex check-price justify-content-between">
            <span class="col-5">Current price:</span>
            <span class="col-7"
              >{{ BWtokensPerOneETC | truncated }} BLACK per 1 ETH</span
            >
          </div>

          <Button text="SWAP" type="big" />
        </div>

        <div v-if="!seen" id="hide">
          <div class="card" id="clippers">
            <div>
              <span class="lp_not_available"
                >Liquid Pool недоступен до 12:00</span
              >
            </div>
            <p class="lp_not_available_p">
              Liquid Pool is available in every time when events wich influence
              on WHITE и BLACK price are not live. The event is currently
              ongoing, so the secondary pool is not available until the event
              ends.
              <br />
              <br />
              You can swap WHITE and BLACK using a trading pool or using any
              third party pool or exchange that supports WHITE & BLACK.
            </p>
            <Button
              text="GO TO TRADE POOL"
              type="big"
              @click="$router.push('/trade/return')"
            />
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import NavCards from "@/components/UIComponents/NavCards";
import Button from "@/components/UIComponents/Button";
import MatchCard from "@/components/match/MatchCard";

import { mapGetters } from "vuex";

export default {
  el: "#wrapper",
  layout: "default",
  name: "takeTrade",
  components: {
    Button,
    MatchCard,
    NavCards
  },
  data() {
    return {
      show: false,
      eth: "",
      whiteBlack: "",
      seen: false
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
        // this.whiteBlack = parseInt(this.whiteCoin) + parseInt(this.blackCoin);
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
    },
    onKeydown(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;

      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46 &&
        charCode !== 9 &&
        charCode !== 190
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.lp_not_available {
  margin-top: 60px;
  padding: 3px 13px 9px 15px;
  width: 249px;
  height: 16px;
  left: 592px;
  top: 362px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */

  text-align: center;
  text-transform: uppercase;

  color: #000000;
  background: #ffffff;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
}
.lp_not_available_p {
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 36px;
  margin-left: 7%;
  width: 238px;
  height: 117px;
  left: 596px;
  top: 402px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 13px;
  text-align: center;

  color: #000000;
}

#tobeClipped {
  position: relative;
}
#clippers {
  bottom: 354px;
  opacity: 0.9;
}
</style>
