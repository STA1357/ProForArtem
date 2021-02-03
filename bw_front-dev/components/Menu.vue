<template>
  <div class="menu">
    <div class="menu__info d-flex">
      <div class="menu__logo-wrapper">
        <img class="menu__logo" src="@/assets/images/logo.svg" alt="" />
      </div>
      <div class="menu__navigation" v-if="(windowWidth <= 1250) ? menuIsOpen : true">

        <NuxtLink class="txt menu__navigation-item" to="/trade">TRADE</NuxtLink>
        <NuxtLink class="txt menu__navigation-item" to="/earn">EARN</NuxtLink>
        <NuxtLink class="txt menu__navigation-item" to="/event_page">EVENTS</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">LIVE</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">VOTE</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">CHARTS</NuxtLink>
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">NFT</NuxtLink>

        <portal-target name="destination" multiple class="d-flex">

        </portal-target>
      </div>
    </div>
    <div class="menu__actions d-flex">
      <portal to="destination" :disabled="windowWidth > 1250" :order="3">
        <div class="txt menu__navigation-item menu__bwgt-button">BWGT</div>
      </portal>
      <portal to="destination" :disabled="windowWidth > 1250" :order="2">
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">Create+</NuxtLink>
      </portal>


      <div v-if="!account.address" class="menu__button" @click="openWalletModal()">
        CONNECT WALLET
      </div>
      <div v-else class="menu__account">
        <div class="menu__account-balance">
          {{account.balance | truncated}} ETH
        </div>
        <div class="menu__account-address menu__button" @click="openInfoModal()">
          {{shortenedAddress}}
          <div class="menu__account-image-wrapper">
            <img class="menu__account-image" src="@/assets/images/metamask_icon.svg" alt="">
          </div>
        </div>
        <img src="@/assets/images/cogwheel.svg" alt=""  />

        <div class="menu__burger" v-if="windowWidth <= 1250" @click="menuIsOpen = !menuIsOpen">
          <img v-if="!menuIsOpen" src="@/assets/images/burger.svg" alt="">
          <img v-else src="@/assets/images/exit.svg" alt="">
        </div>
      </div>
      <portal to="destination" :disabled="windowWidth > 1250" :order="1">
        <NuxtLink class="txt menu__navigation-item menu__navigation-item--inactive" :event="''" to="#">ABOUT</NuxtLink>
      </portal>
    </div>
  </div>
</template>

<script>
import WalletModal from "@/components/modal/templates/WalletModal";
import MenuInfo from "@/components/modal/templates/MenuInfo";

export default {
  data() {
    return {
      menuIsOpen: false
    }
  },
  methods: {
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
    openInfoModal() {
      this.$modal.show(
          MenuInfo,
        {
          details: {}
        },
        {
          width: 314
        }
      );
    }
  },
  computed: {
    account() {
      return this.$store.getters["web3/account"];
    },
    shortenedAddress() {
      return this.account.address.substr(0, 6) + '...' +  this.account.address.substr(-4, 4)
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: $brand;
    padding: 0 28px;
  }
  .menu__logo {
    margin-right: 64px;
  }
  .menu__navigation {
    display: flex;
    align-items: center;
  }
  .menu__navigation-item {
    color: rgba($white, 0.8);
    font-size: 14px;
    line-height: 13px;

    &:not(:last-child) {
      margin-right: 24px;
    }

    &--inactive {
      cursor: default;
      text-decoration: none;
    }

    &.nuxt-link-active {
      font-weight: 900;
    }
  }
  .menu__actions, .vue-portal-target {
    align-items: center;

    & > :not(:last-child) {
      margin-right: 24px;
    }
  }
  .menu__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 30px;
    border-radius: 6px;
    border: 2px solid $white;
    color: $white;
    font-weight: 600;
    font-size: 14px;
    line-height: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 18px;

    &:hover {
      background-color: $white;
      color: $brand;
    }
  }
  .menu__account {
    display: flex;
    align-items: center;
  }
  .menu__account-address {
    display: flex;
    justify-content: flex-end;
    position: relative;
    font-size: 12px;
    width: auto;
    padding: 0 10px;
  }
  .menu__account-balance {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      transform: translateX(2px);
      width: auto;
      height: 24px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid $white;
      border-radius: 6px 0px 0px 6px;
      padding: 0 7px;
      color: $white ;
    font-size: 12px;
      font-weight: 400;

  }
  .menu__bwgt-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $brand;
    border-radius: 6px;
    cursor: default;
    font-weight: 600;
    width: 80px;
    height: 30px;
    background-color: $white;
  }
  .menu__account-image-wrapper {
    margin-left: 6px;
  }
  .menu__burger {
    @include flex-box(24px);
    margin-left: 12px;
  }

  // @media screen and (max-width: 1300px) {
  //   .menu__actions {
  //     & > :not(:last-child) {
  //       margin-right: 12x;
  //     }
  //   }
  // }

  @media screen and (max-width: 1250px) {
    .menu__button {
      margin-right: 12px;
    }
    .vue-portal-target {
      flex-direction: column;
      align-items: flex-end;

      & > :not(:last-child) {
        margin-right: 0px;
        margin-bottom: 20px;
      }
    }
    .menu {
      padding: 0 20px;
    }
    .menu__logo {
      margin-right: 0;
    }
    .menu__actions {
      & > :not(:last-child) {
        margin-right: 0px;
        cursor: pointer;
      }
    }
    .menu__button {
      margin-right: 12px;
    }

    .menu__navigation {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 260px;
      height: calc(100vh - 64px);
      right: 0;
      top: 64px;
      background-color: rgba($brand, 0.95);
      padding: 20px 20px;
      z-index: 100000;

      & > :not(:last-child) {
        margin-bottom: 20px;
        margin-right: 0px;

      }
    }

  }


  @media screen and (max-width: 500px) {
    .menu__account-balance {
      display: none;
    }
  }
</style>
