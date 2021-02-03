import Contract from '@/util/contracts/Collateralization'

export default {
  state() {
    return {
      address: process.env.contractAddresses.collateralization,

      storedEthereumAmount: 0,
      storedTokensAmount: 0
    }
  },
  actions: {
    async initContract({ dispatch }) {
      Promise.all([
        await dispatch('getStoredEthereumAmount'),
        await dispatch('getStoredTokensAmount')
      ])
    },

    async getStoredEthereumAmount({ commit }) {
      let storedEthereumAmount = await Contract.storedEthereumAmount()
      commit('setStoredEthereumAmount', storedEthereumAmount)
    },
    async getStoredTokensAmount({ commit }) {
      let storedTokensAmount = await Contract.storedTokensAmount()
      commit('setStoredTokensAmount', storedTokensAmount)
    }
  },
  mutations: {
    setStoredEthereumAmount(state, payload) {
      state.storedEthereumAmount = payload
    },
    setStoredTokensAmount(state, payload) {
      state.storedTokensAmount = payload
    }
  },
  getters: {
    contract(state) {
      return state
    },
    storedEthereumAmount(state) {
      return state.storedEthereumAmount
    },
    storedTokensAmount(state) {
      return state.storedTokensAmount
    }
  }
}