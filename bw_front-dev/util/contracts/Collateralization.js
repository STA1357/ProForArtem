import ABI from '@/util/constants/contractsABI/collateralization.json'
import { checkAndInstantiateWeb3 } from '@/util/web3'

class Collateralization {

  constructor() {
    this.address = process.env.contractAddresses.collateralization

    this.web3Instance = checkAndInstantiateWeb3()
    this.contractInstance = this.web3Instance ? new this.web3Instance.eth.Contract(ABI, this.address) : null; 
  }

  async storedEthereumAmount() {
    return this.contractInstance.methods.getStoredEthereumAmount().call()
  }

  async storedTokensAmount() {
    return this.contractInstance.methods.getStoredTokensAmount().call()
  }

}

export default new Collateralization()