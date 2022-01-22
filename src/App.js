import React, { useState, useEffect } from 'react'
import './App.css'
import FileUpload from './fileUpload'
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

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  )

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <FileUpload />
    </div>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 Image portal</p>
          <p className="sub-text">Upload/view image onchain✨</p>
          {currentAccount === ''
            ? renderNotConnectedContainer()
            : renderConnectedContainer()}
        </div>
      </div>
    </div>
  )
}
