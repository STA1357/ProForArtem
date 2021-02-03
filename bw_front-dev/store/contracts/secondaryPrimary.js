import Contract from '@/util/contracts/SecondaryPrimary'

export default {
  state() {
    return {
      address: process.env.contractAddresses.secondaryPrimary,

      balance: 0,
      decimals: 0,
      blackPrice: 0,
      whitePrice: 0
    }
  },
  actions: {
    async initContract({ dispatch }) {
      await dispatch('getDecimals'), //should be upper then balance

      Promise.all([
        await dispatch('getBalance'),
        await dispatch('getDecimals'),
        await dispatch('getBlackPrice'),
        await dispatch('getWhitePrice'),
      ])
    },

    async getDecimals({ commit }) {
      let decimals = await Contract.decimals()
      commit('setDecimals', decimals)
    },

    async getBalance({ rootState, commit }) {
      let balance = await Contract.balanceOf(rootState.web3.account.address)
      commit('setBalance', balance)
    },

    async getBlackPrice({ commit }) {
      let price = await Contract.blackPrice()
      commit('setBlackPrice', price)
    },

    async getWhitePrice({ commit }) {
      let price = await Contract.whitePrice()
      commit('setWhitePrice', price)
    },

    async buyLiquidity({ dispatch, rootState }, tokensAmount) {
      tokensAmount = (tokensAmount * Math.pow(10, rootState.contracts.black.decimals)).toString()
      
      await Promise.all([
        dispatch('contracts/black/approve', {delegate: process.env.contractAddresses.secondaryCollateralization, tokensAmount}, {root:true}),
        dispatch('contracts/white/approve', {delegate: process.env.contractAddresses.secondaryCollateralization, tokensAmount}, {root:true})
      ])

      await Contract.addLiquidity(tokensAmount)
    }
  },
  mutations: {
    setDecimals(state, payload) {
      state.decimals = payload
    },
    setBalance(state, payload) {
      state.balance = (payload / Math.pow(10, state.decimals))
    },
    setBlackPrice(state, payload) {
      state.blackPrice = payload
    },
    setWhitePrice(state, payload) {
      state.whitePrice = payload
    }
  },
  getters: {
    contract(state) {
      return state
    },

    // blackPrice(state, getters, rootState) {
    //   return (state.blackPrice / Math.pow(10, rootState.contracts.black.decimals ))
    // },
  }
}