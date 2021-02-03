<template>
  <transition name="list">
    <div class="list" v-if="isOpen">
      <div class="list__title">
        <div class="list__item" v-for="(item, index) of title" :key="index">
          <div class="txt list__text">
            {{ item.text }}
          </div>
          <div class="txt txt--semiBold list__value">
            {{ item.value }}
          </div>
        </div>
      </div>
      <div class="list__info">
        <div v-if="info.indexOf('EthInBase') >= 0" class="list__item list__item--info">
          <div class="txt list__text">
            ETH in Base Pool
          </div>
          <div class="txt txt--semiBold list__value">
            {{ (collateralization.storedEthereumAmount / 1e18) | truncated6 }} ETH
          </div>
        </div>

        <div v-if="info.indexOf('WhiteInMarket') > 0" class="list__item list__item--info">
          <div class="txt list__text">
            WHITE in the market
          </div>
          <div class="txt txt--semiBold list__value">
            {{ whiteInMarket | truncated6 }} WHITE
          </div>
        </div>

        <div v-if="info.indexOf('BlackInMarket') > 0" class="list__item list__item--info">
          <div class="txt list__text">
            BLACK in the market
          </div>
          <div class="txt txt--semiBold list__value">
            {{ blackInMarket | truncated6 }} BLACK
          </div>
        </div>

        <div v-if="info.indexOf('WhiteInBase') > 0" class="list__item list__item--info">
          <div class="txt list__text">
            WHITE in Base Pool
          </div>
          <div class="txt txt--semiBold list__value">
            {{ whiteInBase | truncated6 }} WHITE
          </div>
        </div>

        <div v-if="info.indexOf('BlackInBase') > 0" class="list__item list__item--info">
          <div class="txt list__text">
            BLACK in Base Pool
          </div>
          <div class="txt txt--semiBold list__value">
            {{ blackInBase | truncated6 }} BLACK
          </div>
        </div>

        <div v-if="info.indexOf('AggregateBW') > 0" class="list__item list__item--info">
          <div class="txt list__text">
            Aggregate B&W price
          </div>
          <div class="txt txt--semiBold list__value">
            {{ BWtokensPerOneETH | truncated6 }} ETH
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "List",
  props: {
    title: {
      type: Array,
      default() {
        return [
          {
            text: String,
            value: [String, Number]
          }
        ]
      }
    },
    info: {
      type: Array,
      default() {  //Takes EthInBase / WhiteInBase / BLackInBase / WhiteInMarket / BLackInMarket / AggregateBW
        return [
          'EthInBase',
          'WhiteInBase',
          'BlackInBase',
          'WhiteInMarket',
          'BlackInMarket',
          'AggregateBW',
        ]
      }
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      account: "web3/account",
      black: "contracts/black/contract",
      white: "contracts/white/contract",
      primary: "contracts/primary/contract",
      collateralization: "contracts/collateralization/contract",

      whiteInBase: 'contracts/white/inBase',
      whiteInMarket: 'contracts/white/inMarket',
      blackInBase: 'contracts/black/inBase',
      blackInMarket: 'contracts/black/inMarket',
    }),

    BWtokensPerOneETH() {
      return 1 / this.$store.getters["contracts/primary/BWtokensPerOneETH"]
    }
  },
  methods: {
    openList() {
      this.isOpen = true
    },
    closeList() {
      this.isOpen = false
    }
  },
  mounted() {
    this.$parent.$on('openList', this.openList)
    this.$parent.$on('closeList', this.closeList)
  }
};
</script>

<style scoped lang="scss">
  .list {
      z-index: -111;
      width: 296px;
      height: auto;
      padding: 50px 18px 26px 18px;
      background: rgba(255, 255, 255, 0.68);
      border-radius: 15px;
      margin: -24px auto 0;
      transition: opacity 0.5s;
  }
  .list__title {
    margin-bottom: 32px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: -18px;
      width: calc(100% + 36px);
      height: 1px;
      background-color: $surface8;
    }
  }
  .list__item {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  .list__text,.list__value {
    font-size: 10px;
    line-height: 12px;
    color: #000;
  }
  .list__item--info {
    .list__text,.list__value {
      font-size: 9px;
      line-height: 11px;
      color: $text1;
    }
  }



  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(-40px);
  }
</style>
