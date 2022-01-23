import React from 'react'
import './Navbar.css'
import './App.css'
const Navbar = (props) => {
  const { currentAccount, setCurrentAccount } = props
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

  return (
    <nav>
      <p className="nav-text">Image On Chain</p>
      <button className="cta-button connect-wallet-button">
        {currentAccount === ''
          ? 'Connect to Wallet'
          : 'Connected: ' +
            currentAccount.slice(0, 5) +
            '...' +
            currentAccount.slice(-5)}
      </button>
    </nav>
  )
}

export default Navbar
