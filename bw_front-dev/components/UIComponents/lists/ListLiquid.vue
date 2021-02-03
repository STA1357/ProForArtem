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
        <div v-for="(item, index) of templates" :key="index" class="list__item list__item--info">
          <div class="txt list__text">
            {{ item.text }}
          </div>
          <div class="txt txt--semiBold list__value">
            {{ item.value }}
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
      type: Array
    }
  },
  data() {
    return {
      isOpen: false,
      templates: {
        WhitePrice: {
          text: 'WHITE Price',
          value: `${this.$store.getters['contracts/secondaryPrimary/contract'].whitePrice} ETH`
        },
        BlackPrice: {
          text: 'BLACK Price',
          value: `${this.$store.getters['contracts/secondaryPrimary/contract'].blackPrice} ETH`
        },
        EthInLiquid: {
          text: 'ETH in Liquid Pool',
          value: `${this.$store.getters['contracts/secondaryCollateralization/contract'].storedEthereumAmount} ETH`
        },
        WhiteInLiquid: {
          text: 'WHITE in Liquid Pool',
          value: `${this.$store.getters['contracts/white/inSecondary']} WHITE`
        },
        BlackInLiquid: {
          text: 'BLACK in Liquid Pool',
          value: `${this.$store.getters['contracts/black/inSecondary']} BLACK`
        },
        AggregatePrice: {
          text: 'Aggregate B&W price',
          value: `${this.$store.getters['contracts/secondaryCollateralization/contract'].storedEthereumAmount / 1e18} ETH`
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      account: "web3/account",
      secondaryPrimary: "contracts/secondaryPrimary/contract",
      secondaryCollateralization: "contracts/secondaryCollateralization/contract",

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
    transform: translateY(-100px);
  }
</style>
