import Contract from '@/util/contracts/PrimaryPool'

export default {
  state() {
    return {
      address: process.env.contractAddresses.primary,

      minBuy: 0,
      BWprice: 0
    }
  },
  actions: {
    async initContract({ dispatch }) {
      Promise.all([
        await dispatch('getMinBlackAndWhiteBuy'),
        await dispatch('getBWprice')
      ])
    },

    async getMinBlackAndWhiteBuy({ commit }) {
      let minBuy = await Contract.minBlackAndWhiteBuy()
      commit('setMinBuy', minBuy)
    },
    async getBWprice({ commit }) {
      let BWprice = await Contract.BWPrice()
      commit('setBWprice', BWprice)
    },

    async buyTokens(ctx, ethAmount) {
      await Contract.buyTokens((ethAmount*1e18).toString())
    },
    async buyBackTokens({ dispatch, rootState }, tokensAmount) {
      tokensAmount = (tokensAmount * Math.pow(10, rootState.contracts.black.decimals)).toString()

      await Promise.all([
        dispatch('contracts/black/approve', {delegate: process.env.contractAddresses.collateralization, tokensAmount}, {root:true}),
        dispatch('contracts/white/approve', {delegate: process.env.contractAddresses.collateralization, tokensAmount}, {root:true})
      ])

      await Contract.buyBackTokens(tokensAmount)
    }
  },
  mutations: {
    setMinBuy(state, payload) {
      state.minBuy = payload
    },
    setBWprice(state, payload) {
      state.BWprice = payload
    }
  },
  getters: {
    contract(state) {
      return state
    },
    minBuy(state) {
      return state.balance
    },
    BWprice(state) {
      return state.BWprice
    },
    BWtokensPerOneETH(state, getters, rootState) {
      return (1e18 / state.BWprice / Math.pow(10, rootState.contracts.black.decimals)) / 2;
    },
  }
}