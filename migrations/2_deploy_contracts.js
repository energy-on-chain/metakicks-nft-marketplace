const MetakicksNFT = artifacts.require("MetakicksNFT")

module.exports = async function (deployer) {

    const IPFS_IMAGE_METADATA_URI = `ipfs://${process.env.REACT_APP_IPFS_IMAGE_METADATA_CID}/`

    await deployer.deploy(
        MetakicksNFT,
        process.env.REACT_APP_PROJECT_NAME,
        process.env.REACT_APP_PROJECT_SYMBOL,
        IPFS_IMAGE_METADATA_URI,
    )
};