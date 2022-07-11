import React, { useState, useEffect, useRef} from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';

import { ethers } from 'ethers';

// import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
// import { web3StorageApiKey } from '../../credentials';

import { marketplaceAddress } from '../../config';
import NFTMarketplace from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

import datamtk1_0 from '../../assets/nfts/data-mtk1-0';
import datamtk1_1 from '../../assets/nfts/data-mtk1-1';
import datamtk1_2 from '../../assets/nfts/data-mtk1-2';
import datamtk1_3 from '../../assets/nfts/data-mtk1-3';

import Snackbar from '../elements/Snackbar'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContract, useProvider } from 'wagmi';
// import { InjectedConnector } from '@wagmi/core';
// import { chain } from 'lodash';


// STATE VARIABLES (EXTERNAL)
const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const SnackbarType = {
  wait: 'wait',
  success: 'success',
  fail: 'fail',
}


// COMPONENT
const Mint = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  // STATE VARIABLES (INTERNAL)
  // Nft data
  const metakicks_data = [    // List of available kicks
    datamtk1_0,
    datamtk1_1,
    datamtk1_2,
    datamtk1_3
  ]

  // Styling
  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );
  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  // Contract info 
  const [count, setCount] = useState('XX')    
  const [limit, setLimit] = useState('XX')
  const [price, setPrice] = useState('XX')

  // Alerts
  const snackbarRef = useRef(null);
  const [alert, setAlert] = useState(<Snackbar ref={snackbarRef} message='Congrats! You minted a Metakick!' type={SnackbarType.success} />)

  // Marketplace smart contract
  const provider = useProvider()
  const contract = useContract({
    addressOrName: marketplaceAddress,
    contractInterface: NFTMarketplace.abi,
    signerOrProvider: provider
  })

  // Effect hook
  useEffect(() => {

    const fetchData = async () => {    // update all "read" values needed from marketplace contract
      console.log('fetchData')
      setCount(ethers.utils.formatUnits(await contract.getNumberMinted(), 1) * 10)
      setPrice(ethers.utils.formatUnits(await contract.getListingPrice(), 18))
      setLimit(ethers.utils.formatUnits(await contract.getQtyLimit(), 1) * 10)
    }

    fetchData().catch(console.error)    // call function

  }, [contract])


  // COMPONENT FUNCTIONS
  // Mint a nft
  async function mintNft(e) {

    console.log('mintNft()')

    if (count < limit) {    // if we still have capacity to mint nfts

    //   // Build the next metadata file
    //   const data = JSON.stringify(metakicks_data[numberMinted])
    //   const filename = metakicks_data[numberMinted].name + '.json'
    //   const blob = new Blob(
    //       [data], 
    //       { type: 'application/json' },
    //   )
    //   const file = new File(
    //       [blob], 
    //       filename,
    //   )
      
    //   // Upload that metadata file to ipfs
    //   const client = new Web3Storage({ token: web3StorageApiKey })
    //   const cid = await client.put([file])  // return unique CID for the NFT on the blockchain

    //   // Mint the nft on chain with unique metadata CID
    //   listingPrice = listingPrice.toString()
    //   let transaction = await contract.createToken(cid, listingPrice, { value: listingPrice })
    //   await transaction.wait()

    //   // Update state variables
    //   listingPrice = await contract.getListingPrice()
    //   quantityLimit = await contract.getQtyLimit()
    //   numberMinted = await contract.getNumberMinted()
    //   console.log(ethers.utils.formatUnits(listingPrice, 18))
    //   setPrice(ethers.utils.formatUnits(listingPrice, 18))
    //   setCount(ethers.utils.formatUnits(numberMinted, 1) * 10)
    //   setLimit(ethers.utils.formatUnits(quantityLimit, 1) * 10)
      // setAlert(<Snackbar ref={snackbarRef} message='One sec while we grab your Metakicks from the back...' type={SnackbarType.wait} />)
      // snackbarRef.current.show();
      setAlert(<Snackbar ref={snackbarRef} message='Congrats! You minted a Metakick!' type={SnackbarType.success} />)
      snackbarRef.current.show();
        
    } else {
      setAlert(<Snackbar ref={snackbarRef} message='No more Metakicks left to mint!' type={SnackbarType.fail} />)
      snackbarRef.current.show();
    }
  }

  // RENDER LAYOUT
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Lace up your own pair of <span className="text-color-primary">Metakicks.</span>
            </h1>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <Image
              className="has-shadow"
              src={require('./../../assets/images/mtk1-0.PNG')}
              alt="MintHero"
              width={170}
              height={170} />
          </div>
          <div className="hero-content">
          <div className="container-xs">
              <div>
                <ButtonGroup>
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    return (
                      <div
                        {...(!mounted && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!mounted || !account || !chain) {
                            return (
                              <Button color='primary' onClick={openConnectModal} type="button">
                                Connect Wallet
                              </Button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <Button color='primary' onClick={openChainModal} type="button">
                                Wrong Network - Click to Disconnect
                              </Button>
                            );
                          }

                          return (
                            <div style={{ display: 'flex', gap: 12 }}>
                              <Button
                                color='primary'
                                onClick={openChainModal}
                                style={{ display: 'flex', alignItems: 'center' }}
                                type="button"
                              >
                                {chain.hasIcon && (
                                  <div
                                    style={{
                                      background: chain.iconBackground,
                                      width: 12,
                                      height: 12,
                                      borderRadius: 999,
                                      overflow: 'hidden',
                                      marginRight: 4,
                                    }}
                                  >
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? 'Chain icon'}
                                        src={chain.iconUrl}
                                        style={{ width: 12, height: 12 }}
                                      />
                                    )}
                                  </div>
                                )}
                                {chain.name}
                              </Button>

                              <Button onClick={openAccountModal} type="button">
                                {account.displayName}
                                {account.displayBalance
                                  ? ` (${account.displayBalance})`
                                  : ''}
                              </Button>
                              <ButtonGroup>
                                <Button tag="a" color="primary" wideMobile onClick={mintNft}>Mint Now</Button>
                              </ButtonGroup>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
                </ButtonGroup>
              </div>
            </div>
            <br></br>
            <div className="container-xs">
                <p className="m-0 mb-32" data-reveal-delay="400">Cost to mint: { price } MATIC</p>
                <p className="m-0 mb-32" data-reveal-delay="400">{ count } of { limit } minted.</p>
                <p className="m-0 mb-32" data-reveal-delay="400">Remember to account for gas fees!</p>
                <div>{ alert }</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Mint.propTypes = propTypes;
Mint.defaultProps = defaultProps;

export default Mint;



// TODO
// if wallet is connected (to correct chain), display a mint button
// trigger mintnft function on that button click
