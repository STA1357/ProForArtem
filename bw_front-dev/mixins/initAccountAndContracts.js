export default {
  methods: {
    async initAccountAndContracts() {
      await this.$store.dispatch("web3/getAccount")

      return Promise.all([
        this.$store.dispatch("contracts/black/initContract"),
        this.$store.dispatch("contracts/white/initContract"),

        /*Base pool*/
        this.$store.dispatch("contracts/primary/initContract"),
        this.$store.dispatch("contracts/collateralization/initContract"),

        /*Secondary pool*/
        this.$store.dispatch("contracts/secondaryPrimary/initContract"),
        this.$store.dispatch("contracts/secondaryCollateralization/initContract"),
      ])
    }
  }
}
