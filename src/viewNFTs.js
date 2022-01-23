import React, { useState } from 'react'

const ViewNFT = (props) => {
  const connectedContract = props.contract
  const [output, setOutput] = useState('')
  const handleChange = async (event) => {
    const nftId = event.target.value
    if (!nftId) {
      setOutput('')
    }
    console.log(nftId)
    let nft = await connectedContract.tokenURI(nftId)
    console.log(nft)
    setOutput(nft)
  }
  return (
    // <button className="cta-button upload-image-button">Upload Image</button>
    <div>
      <textarea placeholder="enter ID" onChange={handleChange}></textarea>
      {output && <img alt="" src={output} height="40px" />}
    </div>
  )
}

export default ViewNFT
