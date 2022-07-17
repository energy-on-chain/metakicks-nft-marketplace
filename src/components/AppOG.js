import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Countdown from 'react-countdown'
import Web3 from 'web3'

// Import React Components
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

// Import App Components
import Header from './Header.js' 
import Footer from './Footer.js'
import MintPage from './MintPage.js'

// Import Images + CSS
import './App.css'

// Import ABI + Config
import OpenEmoji from '../abis/OpenEmoji.json';
import CONFIG from '../config.json';
import { NODE_PARENT_VALIDATIONS } from '@babel/types';

const Foo = () => {
	return <p>foo</p>;
  };
  
  const Bar = () => {
	return <p>bar</p>;
  };

function AppOG() {
	const [web3, setWeb3] = useState(null)
	// const [openEmoji, setOpenEmoji] = useState(null)

	// const [supplyAvailable, setSupplyAvailable] = useState(0)
	// const [balanceOf, setBalanceOf] = useState(0)

	const [account, setAccount] = useState(null)
	// const [currentNetwork, setCurrentNetwork] = useState(null)

	// const [blockchainExplorerURL, setBlockchainExplorerURL] = useState('https://etherscan.io/')
	// const [openseaURL, setOpenseaURL] = useState('https://opensea.io/')

	// const [isMinting, setIsMinting] = useState(false)
	// const [isError, setIsError] = useState(false)
	// const [message, setMessage] = useState(null)

	// const [currentTime, setCurrentTime] = useState(new Date().getTime())
	// const [revealTime, setRevealTime] = useState(0)

	// const [showAlert, setShowAlert] = useState('')    // for alerts

	// const loadBlockchainData = async () => {
	// 	console.log('Running loadBlockchainData...')

	// 	// Fetch Contract, Data, etc.
	// 	if (web3) {
	// 		const networkId = await web3.eth.net.getId()
	// 		setCurrentNetwork(networkId)

	// 		try {
	// 			const openEmoji = new web3.eth.Contract(OpenEmoji.abi, OpenEmoji.networks[networkId].address)
	// 			setOpenEmoji(openEmoji)

	// 			const maxSupply = await openEmoji.methods.maxSupply().call()
	// 			const totalSupply = await openEmoji.methods.totalSupply().call()
	// 			setSupplyAvailable(maxSupply - totalSupply)

	// 			const balanceOf = await openEmoji.methods.balanceOf(account).call()
	// 			setBalanceOf(balanceOf)

	// 			const allowMintingAfter = await openEmoji.methods.allowMintingAfter().call()
	// 			const timeDeployed = await openEmoji.methods.timeDeployed().call()
	// 			// FIXME
	// 			console.log("Allow minting after", allowMintingAfter)
	// 			console.log("Time deployed:", timeDeployed)
	// 			console.log("Reveal time:", revealTime)
	// 			console.log("Current time:", currentTime)
	// 			setRevealTime((Number(timeDeployed) + Number(allowMintingAfter)).toString() + '000')

	// 			if (networkId !== 5777) {
	// 				setBlockchainExplorerURL(CONFIG.NETWORKS[networkId].blockchainExplorerURL)
	// 				setOpenseaURL(CONFIG.NETWORKS[networkId].openseaURL)
	// 			}

	// 		} catch (error) {
	// 			setIsError(true)
	// 			setMessage("Contract not deployed to current network, please change network to Polygon in MetaMask")
	// 		}

	// 	}
	// }

	// const loadWeb3 = async () => {
	// 	console.log('Running loadWeb3...')
	// 	if (typeof window.ethereum !== 'undefined' && !account) {
	// 		const web3 = new Web3(window.ethereum)
	// 		setWeb3(web3)

	// 		const accounts = await web3.eth.getAccounts()

	// 		if (accounts.length > 0) {
	// 			setAccount(accounts[0])
	// 		} else {
	// 			setMessage('Please connect with MetaMask')
	// 		}

	// 		window.ethereum.on('accountsChanged', function (accounts) {
	// 			setAccount(accounts[0])
	// 			setMessage(null)
	// 		});

	// 		window.ethereum.on('chainChanged', (chainId) => {
	// 			// Handle the new chain.
	// 			// Correctly handling chain changes can be complicated.
	// 			// We recommend reloading the page unless you have good reason not to.
	// 			window.location.reload();
	// 		});
	// 	}
	// }

	// MetaMask Login/Connect
	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}

	// const mintNFTHandler = async () => {
	// 	if (revealTime > new Date().getTime()) {
	// 		// window.alert('Minting is not live yet!')  FIXME: option to add this functionality later
	// 		return
	// 	}

	// 	if (balanceOf > 0) {
	// 		// window.alert('You have already minted the max amount!');
	// 		setShowAlert("minting")
	// 		return 
	// 	}

	// 	// Mint NFT
	// 	if (openEmoji) {
	// 		setIsMinting(true)
	// 		setIsError(false)

	// 		await openEmoji.methods.mint(1).send({ from: account, value: 0 })
	// 			.on('confirmation', async () => {
	// 				const maxSupply = await openEmoji.methods.maxSupply().call()
	// 				const totalSupply = await openEmoji.methods.totalSupply().call()
	// 				setSupplyAvailable(maxSupply - totalSupply)

	// 				const balanceOf = await openEmoji.methods.balanceOf(account).call()
	// 				setBalanceOf(balanceOf)
	// 			})
	// 			.on('error', (error) => {
	// 				// window.alert(error)
	// 				setShowAlert("error")
	// 				setIsError(true)
	// 			})
	// 	}

	// 	setIsMinting(false)
	// };

	// useEffect(() => {
	// 	console.log('useEffect has been triggered...')
	// 	loadWeb3()
	// 	loadBlockchainData()
	// }, [account]);

	return (
		<div>
			<h1>Test!</h1>
		</div>
	)
}

export default AppOG;


// TODO:
// QA all links
// host on our domain
//
// MINT PAGE:
// css styling update
// add all metackicks to the ipfs (and update project / site accordingly) 
//
// HOME PAGE:
// add helpful links: https://wallet.polygon.technology/
// add rounded gifs
// add testimonial vid
//
// NICE TO HAVE ADDITONS:
// raffle page with restricted access for customers
// fix countdown timer
// add delayed reveal feature for the nfts themselves
// separate main contract file out into multiple simpler contracts
// separate all components out of App.js to make it more modular
// update names of all contracts
// add fancy alerts (currently minting, error during minting, success during minting, max nfts minted, you can only mint five nfts)
//

import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}

export default App;