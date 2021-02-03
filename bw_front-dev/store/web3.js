import * as web3 from '@/util/web3.js' 

export default {
  state() {
    return {
      account: {
        address: '',
        balance: 0
      }
    }
  },
  actions: {
    async connectToProvider({ dispatch }) {
      try {
        await web3.connect()
        dispatch('getAccount')
      } catch (error) {
        console.log(error)
      }
    },
    async getAccount({commit}) {
      let data = await web3.getAccount()
      
      if (data) {
        commit('setAccountInfo', data)
      }
    }
  },
  mutations: {
    setAccountInfo(state, payload) {
      state.account.address = payload.address
      state.account.balance = (payload.balance * 1e-18).toFixed(4)
    },

  },
  getters: {
    account(state) {
      return state.account
    }
  }
}