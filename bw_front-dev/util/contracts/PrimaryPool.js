import ABI from '@/util/constants/contractsABI/primary.json'
import { checkAndInstantiateWeb3 } from '@/util/web3'

class PrimaryPool {

  constructor() {
    this.address = process.env.contractAddresses.primary

    this.web3Instance = checkAndInstantiateWeb3()
    this.contractInstance = this.web3Instance ? new this.web3Instance.eth.Contract(ABI, this.address) : null; 
  }

  async minBlackAndWhiteBuy() {
    return this.contractInstance.methods._minBlackAndWhiteBuy().call()
  }

  async BWPrice() {
    return this.contractInstance.methods.getBWprice().call()
  }

  async buyTokens(ethAmount) {
    let from = await this.web3Instance.eth.getCoinbase()
    return this.contractInstance.methods.buy().send({from, value: ethAmount})
  }

  async buyBackTokens(whiteBlackAmount) {
    let from  = await this.web3Instance.eth.getCoinbase()

    return this.contractInstance.methods.buyBack(from, whiteBlackAmount).send({from})
  }
}

export default new PrimaryPool()