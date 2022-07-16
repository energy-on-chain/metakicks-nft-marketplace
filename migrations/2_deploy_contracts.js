const OpenEmoji = artifacts.require("OpenEmoji")

module.exports = async function (deployer) {

    const IPFS_IMAGE_METADATA_URI = `ipfs://${process.env.REACT_APP_IPFS_IMAGE_METADATA_CID}/`
    const IPFS_HIDDEN_IMAGE_METADATA_URI = `ipfs://${process.env.REACT_APP_IPFS_HIDDEN_IMAGE_METADATA_CID}/hidden.json`
    const NFT_MINT_DATE = new Date(process.env.REACT_APP_NFT_MINT_DATE).getTime().toString().slice(0, 10)

    await deployer.deploy(
        OpenEmoji,
        process.env.REACT_APP_PROJECT_NAME,
        process.env.REACT_APP_PROJECT_SYMBOL,
        IPFS_IMAGE_METADATA_URI,
        IPFS_HIDDEN_IMAGE_METADATA_URI,
        NFT_MINT_DATE
    )
};