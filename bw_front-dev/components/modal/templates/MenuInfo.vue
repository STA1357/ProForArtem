<template>
  <div class="main">
    <span class="title ml-3">Account</span>
    <div class="body">
      <span class="sub-title">Connected with Metamask</span>
      <div class="d-flex mt-3 justify-content-between">
        <div class="">
          <img src="@/assets/images/metamask_icon.svg" alt="" />
          <span class="account ml-1"
            >{{ account.address.substr(-42, 6) }}...{{
              account.address.substr(-4, 4)
            }}</span
          >
          <span id="hiddenSpan" ref="hiddenSpan" style="display: none">{{
            account.address
          }}</span>
        </div>
        <div class="btn col-3 p-1 mt-1">Disconnect</div>
      </div>
      <div class="btn-group d-flex mt-2">
        <div class=" " id="copyButton" ref="copyButton" @click="copy_text">Copy address</div>
        <div>
          <a :href="`https://etherscan.io/address/${account.address}`"
            >View on etherscan</a
          >
        </div>
      </div>
    </div>
    <span class="footer mt-3 ml-3">Learn more about Metamask</span>
  </div>
</template>

<script>
export default {
  name: "MenuInfo",
  computed: {
    account() {
      return this.$store.getters["web3/account"];
    }
  },
  methods: {
      copy_text() {
          let textArea = document.createElement("textarea");
          textArea.value = this.$refs.hiddenSpan.textContent;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("Copy");
          textArea.remove();
      }
  }
};
</script>

<style scoped lang="scss">
.main {
  width: 314px;
  height: 210px;
  background: $surface3;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  box-shadow: 4px 8px 18px 2px rgba(0, 0, 0, 0.15);
  border-radius: 19px;
  padding: 12px 16px;
}
.body {
  width: 286px;
  height: 112px;
  background: $white;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-radius: 11px;
  margin-top: 14px;
  padding: 14px 13px;
}
.title {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  letter-spacing: 0.015em;
  color: $brand;
  display: flex;
}
.sub-title {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  color: $brand;
}
img {
  width: 32px;
  height: 32px;
}
.account {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.015em;

  color: $brand;
}
.btn {
  width: 74px;
  height: 18px;
  border: 0.5px solid #fc4040;
  box-sizing: border-box;
  border-radius: 12px;

  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 9px;
  color: #f70404;
}
.btn-group div {
  margin-left: 15px;
  @font-family: Montserrat;
  width: auto;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 11px;
  height: 18px;
  padding: 3px 12px;
  background: rgba(176, 176, 176, 0.15);
  border: 0.5px solid rgba(61, 61, 61, 0.08);
  box-sizing: border-box;
  border-radius: 4px;
  color: $text2;
}
.footer {
  @font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  text-decoration-line: underline;
  display: flex;
  color: $brand;
}
a {
  text-decoration: none;
  color: $brand !important;
}
</style>
