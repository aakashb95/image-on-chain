import React, { useState } from 'react'

const FileUpload = (props) => {
  const connectedContract = props.contract
  const [output, setOutput] = useState('')
  function onImageChange(e) {
    const image = e.target.files[0]
    let _size = image.size
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
      i = 0
    while (_size > 900) {
      _size /= 1024
      i++
    }
    var exactSize = Math.round(_size * 100) / 100 + ' ' + fSExt[i]
    console.log('FILE SIZE = ', exactSize)
    getBase64(image)

    // console.log(image_to_base64.result)
    // setOutput(image_to_base64)
    // console.log(output)
  }

  function getBase64(file) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      console.log(`Base64 string length = ${reader.result.length}`)
      setOutput(reader.result)
      return reader
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }
  const askContractTocreateNFT = async () => {
    let nftTxn = await connectedContract.createNFT(output)
    console.log(nftTxn)
    console.log('Creating...please wait.')
    // nftTxn.wait()

    console.log(
      `Created, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`,
    )
  }

  const askContractToMintNft = async () => {
    let nftTxn = await connectedContract.mint()
  }

  return (
    //
    <>
      <div>
        <button
          className="cta-button upload-image-button"
          onClick={askContractTocreateNFT}
        >
          Create NFT
        </button>
        <button
          className="cta-button upload-image-button"
          onClick={askContractToMintNft}
        >
          Mint NFT
        </button>
        <input type="file" onChange={onImageChange} />
      </div>
      <div>
        {/* <p>{output}</p> */}
        <img src={output} alt="" height="60px" />
      </div>
    </>
  )
}

export default FileUpload
