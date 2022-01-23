import { ethers } from 'ethers'
import myEpicNft from './utils/myNFT.json'
const askContractToMintNft = async () => {
  const CONTRACT_ADDRESS = '0x78FC5D75130e79335506bB29994251b6A81a3101'
  console.log(CONTRACT_ADDRESS)
  //   console.log(myEpicNft.abi)
  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicNft.abi,
        signer,
      )
      console.log(connectedContract)
      console.log('Going to pop wallet now to pay gas...')
      let nftTxn = await connectedContract.createNFT()

      console.log('Mining...please wait.')
      await nftTxn.wait()

      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`,
      )
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error)
  }
}

export default askContractToMintNft
