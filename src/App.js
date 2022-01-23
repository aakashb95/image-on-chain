import React, { useState, useEffect } from 'react'
import './App.css'
import FileUpload from './fileUpload'
import ViewNFT from './viewNFTs'
import Album from './Card'
import { ethers } from 'ethers'
import myEpicNft from './utils/myNFT.json'
import './Navbar.css'
import Navbar from './Navbar'
// import Card from './Card'

export default function App() {
  const [currentAccount, setCurrentAccount] = useState('')

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window
    if (!ethereum) {
      console.log('make sure you have metamask')
      return
    } else {
      console.log('We are connected to metamask', ethereum)
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    // take first authorized account
    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log('Found an authorized account:', account)
      setCurrentAccount(account)
    } else {
      console.log('No accounts found')
    }
  }

  // const renderNotConnectedContainer = () => (
  //   <button
  //     onClick={connectWallet}
  //     className="cta-button connect-wallet-button"
  //   >
  //     Connect to Wallet
  //   </button>
  // )

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <Album contract={contract}>
        <FileUpload contract={contract} />
        <ViewNFT contract={contract} />
      </Album>
    </div>
  )
  const [contract, setContract] = useState('')
  //   const [NFTUri, setNFTUri] = useState('')
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
        setContract(connectedContract)
        console.log(connectedContract)
        // console.log('Going to pop wallet now to pay gas...')
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    askContractToMintNft() // call this function to pass props to FileUpload component
    return () => window.removeEventListener('load', onLoad)
  }, [])
  return (
    <div className="App">
      <Navbar
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />
      {/* <div className="container">
        <div className="header-container">
          <p className="header">🖼 Image portal</p>
          <p className="sub-text">Upload/view image onchain✨</p> */}

      {currentAccount === '' ? <></> : renderConnectedContainer()}
      {/* </div>
      </div> */}
    </div>
  )
}
