<template>
  <div>
    <nav-cards
      :text="[
        { title: 'TAKE B&W', path: '/earn/basic/take' },
        { title: 'RETURN B&W', path: '/earn/basic/return' }
      ]"
    />
    <div class="card">
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
      <div class="p-2 ml-3" @click="$router.push('/earn/basic/return')">
        <img src="@/assets/images/to.svg" alt="" style="float: left" />
      </div>
      <Token
        :options="{
          title: 'You take:',
          balance: white.balance,
          isDisabled: true,
          symbol: white.symbol,
          icon: require('@/assets/images/tokens/white.svg')
        }"
        v-model="whiteBlack"
      ></Token>
      <Token
        :options="{
          title: 'And',
          balance: black.balance,
          isDisabled: true,
          symbol: black.symbol,
          icon: require('@/assets/images/tokens/black.svg')
        }"
        v-model="whiteBlack"
      ></Token>
      <div class="d-flex check-price justify-content-between ">
        <span class="col-5 p-0" style="text-align: left; margin-top: 3px"
          >Aggregate price:</span
        >
        <div class="col p-0" style="text-align: left">
          {{
            isReverse
              ? Math.trunc(BWtokensPerOneETH * 10000) / 10000 +
                " " +
                "B&W per 1 ETH"
              : 1 / BWtokensPerOneETH + "ETH per 1 B&W"
          }}
          <img
            src="@/assets/images/update.svg"
            alt=""
            @click="isReverse = !isReverse"
            style="margin-top: -3px"
          />
        </div>
      </div>

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
        @click="!isLoading ? buyTokens() : ''"
      />
    </div>
    <ListBase
      :title="[
        {
          text: 'Min received',
          value: `${this.whiteBlack} BLACK`
        },
        {
          text: `from ${this.eth} ETH `,
          value: `${!this.whiteBlack ? 0 : this.whiteBlack} WHITE`
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
  name: "basic",
  components: {
    Button,
    NavCards
  },
  data() {
    return {
      show: false,
      eth: "",
      isReverse: true,
      isLoading: false
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

    BWtokensPerOneETH() {
      return this.$store.getters["contracts/primary/BWtokensPerOneETH"];
    },
    whiteBlack() {
      return this.eth * Math.trunc(this.BWtokensPerOneETH  * 10000) / 10000;
    }
  },
  methods: {
    shotList() {
      if (this.eth.length && this.account.address) {
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
    async buyTokens() {
      try {
        this.isLoading = true;

        if (
          !this.eth ||
          this.whiteBlack < this.primary.minBuy ||
          this.eth > this.account.balance
        ) {
          throw new Error("incorrect value");
        }

        let resp = await this.$store.dispatch(
          "contracts/primary/buyTokens",
          this.eth
        );

        this.isLoading = false;

        await this.initAccountAndContracts();

        this.$notify.success({
          title: "Success",
          message: "Successfull transaction",
          maxWidth: 400
        });
      } catch (error) {
        this.$notify.error({
          title: "Error",
          message: error.message,
          maxWidth: 400
        });
      }
    }
  }
};
</script>

<style scoped></style>
