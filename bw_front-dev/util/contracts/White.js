import ABI from '@/util/constants/contractsABI/white.json'
import { checkAndInstantiateWeb3 } from '@/util/web3'

class White {

  constructor() {
    this.address = process.env.contractAddresses.white

    this.web3Instance = checkAndInstantiateWeb3()
    this.contractInstance = this.web3Instance ? new this.web3Instance.eth.Contract(ABI, this.address) : null; 
  }

  async balanceOf(address) {
    return this.contractInstance.methods.balanceOf(address).call()
  }

  async decimals() {
    return this.contractInstance.methods.decimals().call()
  }

  async name() {
    return this.contractInstance.methods.name().call()
  }

  async symbol() {
    return this.contractInstance.methods.symbol().call()
  }

  async totalSupply() {
    return this.contractInstance.methods.totalSupply().call()
  }

  async approve(delegate, whiteBlackAmount) {
    let from = await this.web3Instance.eth.getCoinbase()

    return this.contractInstance.methods.approve(delegate, whiteBlackAmount).send({from})
  }
}

export default new White()