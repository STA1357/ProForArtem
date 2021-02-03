import ABI from '@/util/constants/contractsABI/secondaryCollateralization.json'
import { checkAndInstantiateWeb3 } from '@/util/web3'

class PrimaryPool {

  constructor() {
    this.address = process.env.contractAddresses.secondaryCollateralization

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

export default new PrimaryPool()