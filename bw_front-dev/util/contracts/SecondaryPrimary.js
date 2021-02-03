import ABI from '@/util/constants/contractsABI/secondaryPrimary.json'
import { checkAndInstantiateWeb3 } from '@/util/web3'

class PrimaryPool {

  constructor() {
    this.address = process.env.contractAddresses.secondaryPrimary

    this.web3Instance = checkAndInstantiateWeb3()
    this.contractInstance = this.web3Instance ? new this.web3Instance.eth.Contract(ABI, this.address) : null; 
  }

  async balanceOf(address) {
    return this.contractInstance.methods.balanceOf(address).call()
  }  
  
  async decimals() {
    return this.contractInstance.methods.decimals().call()
  }

  async blackPrice() {
    return this.contractInstance.methods._blackPrice().call()
  }

  async whitePrice() {
    return this.contractInstance.methods._whitePrice().call()
  }

  async addLiquidity(tokensAmount) {
    let from  = await this.web3Instance.eth.getCoinbase()

    return this.contractInstance.methods.addLiquidity(tokensAmount).send({from})
  }
}

export default new PrimaryPool()