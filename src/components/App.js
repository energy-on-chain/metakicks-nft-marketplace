import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Countdown from 'react-countdown'
import Web3 from 'web3'

// Import Components
import Header from './Header.js'
import Footer from './Footer.js'

// Import Images + CSS
import hbdLogo from '../images/hbd-logo.jpg'
import eocLogo from '../images/eoc-logo.jpg'
import logo from '../images/logo.png'
import metakickImage from '../images/metakick0.PNG'
import './App.css'

// Import ABI + Config
import OpenEmoji from '../abis/OpenEmoji.json';
import CONFIG from '../config.json';

function App() {
	const [web3, setWeb3] = useState(null)
	const [openEmoji, setOpenEmoji] = useState(null)

	const [supplyAvailable, setSupplyAvailable] = useState(0)
	const [balanceOf, setBalanceOf] = useState(0)

	const [account, setAccount] = useState(null)
	const [currentNetwork, setCurrentNetwork] = useState(null)

	const [blockchainExplorerURL, setBlockchainExplorerURL] = useState('https://etherscan.io/')
	const [openseaURL, setOpenseaURL] = useState('https://opensea.io/')

	const [isMinting, setIsMinting] = useState(false)
	const [isError, setIsError] = useState(false)
	const [message, setMessage] = useState(null)

	const [currentTime, setCurrentTime] = useState(new Date().getTime())
	const [revealTime, setRevealTime] = useState(0)

	const loadBlockchainData = async () => {
		console.log('Running loadBlockchainData...')

		// Fetch Contract, Data, etc.
		if (web3) {
			const networkId = await web3.eth.net.getId()
			setCurrentNetwork(networkId)

			try {
				const openEmoji = new web3.eth.Contract(OpenEmoji.abi, OpenEmoji.networks[networkId].address)
				setOpenEmoji(openEmoji)

				const maxSupply = await openEmoji.methods.maxSupply().call()
				const totalSupply = await openEmoji.methods.totalSupply().call()
				setSupplyAvailable(maxSupply - totalSupply)

				const balanceOf = await openEmoji.methods.balanceOf(account).call()
				setBalanceOf(balanceOf)

				const allowMintingAfter = await openEmoji.methods.allowMintingAfter().call()
				const timeDeployed = await openEmoji.methods.timeDeployed().call()
				// FIXME
				console.log("Allow minting after", allowMintingAfter)
				console.log("Time deployed:", timeDeployed)
				console.log("Reveal time:", revealTime)
				console.log("Current time:", currentTime)
				setRevealTime((Number(timeDeployed) + Number(allowMintingAfter)).toString() + '000')

				if (networkId !== 5777) {
					setBlockchainExplorerURL(CONFIG.NETWORKS[networkId].blockchainExplorerURL)
					setOpenseaURL(CONFIG.NETWORKS[networkId].openseaURL)
				}

			} catch (error) {
				setIsError(true)
				setMessage("Contract not deployed to current network, please change network to Polygon in MetaMask")
			}

		}
	}

	const loadWeb3 = async () => {
		console.log('Running loadWeb3...')
		if (typeof window.ethereum !== 'undefined' && !account) {
			const web3 = new Web3(window.ethereum)
			setWeb3(web3)

			const accounts = await web3.eth.getAccounts()

			if (accounts.length > 0) {
				setAccount(accounts[0])
			} else {
				setMessage('Please connect with MetaMask')
			}

			window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0])
				setMessage(null)
			});

			window.ethereum.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			});
		}
	}

	// MetaMask Login/Connect
	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}

	const mintNFTHandler = async () => {
		if (revealTime > new Date().getTime()) {
			window.alert('Minting is not live yet!')
			return
		}

		if (balanceOf > 0) {
			window.alert('You\'ve already minted!')
			return
		}

		// Mint NFT
		if (openEmoji) {
			setIsMinting(true)
			setIsError(false)

			await openEmoji.methods.mint(1).send({ from: account, value: 0 })
				.on('confirmation', async () => {
					const maxSupply = await openEmoji.methods.maxSupply().call()
					const totalSupply = await openEmoji.methods.totalSupply().call()
					setSupplyAvailable(maxSupply - totalSupply)

					const balanceOf = await openEmoji.methods.balanceOf(account).call()
					setBalanceOf(balanceOf)
				})
				.on('error', (error) => {
					window.alert(error)
					setIsError(true)
				})
		}

		setIsMinting(false)
	};

	useEffect(() => {
		console.log('useEffect has been triggered...')
		loadWeb3()
		loadBlockchainData()
	}, [account]);

	return (
		<div>
			<Header account={account} web3Handler={web3Handler} />
			<main>
				<Row className="my-3">
					<Col className="text-center">
						<h1 className="text-uppercase">Metakicks NFT Project</h1>
						{/* <p className="countdown">
							{revealTime !== 0 && <Countdown date={currentTime + (revealTime - currentTime)} />}
						</p> */}
						<p>Welcome to Metakicks NFT Project on Polygon!</p>
						<p>Mint your free pair of Metakicks (not including gas fees) starting on 23 July, 2022.</p>
					</Col>
				</Row>
				<Row className="my-4">
					<Col className="panel grid" sm={12} md={6}>
						<button onClick={mintNFTHandler} className="button mint-button"><span>Mint</span></button>
					</Col>
					<Col className="panel grid image-showcase mx-4">
						<img
							src={isError ? (
								metakickImage
							) : !isError && isMinting ? (
								metakickImage
							) : (
								metakickImage
							)}
							alt="emoji-smile"
							className="image-showcase-example-1"
						/>
					</Col>
				</Row>
				<Row className="my-3">
					<Col className="flex">
						<a href={openseaURL + account} target="_blank" rel="noreferrer" className="button">View My Opensea</a>
						<a href={`${blockchainExplorerURL}address/${account}`} target="_blank" rel="noreferrer" className="button">View My Etherscan</a>
					</Col>
				</Row>
				<Row className="my-2 text-center">
					{message ? (
						<p>{message}</p>
					) : (
						<div>
							{openEmoji &&
								<a href={`${blockchainExplorerURL}address/${openEmoji._address}`}
									target="_blank"
									rel="noreferrer"
									className="contract-link d-block my-3">
									{openEmoji._address}
								</a>
							}

							{CONFIG.NETWORKS[currentNetwork] && (
								<p>Current Network: {CONFIG.NETWORKS[currentNetwork].name}</p>
							)}

							<p>{`NFT's Left: ${supplyAvailable}, You've minted: ${balanceOf}`}</p>
						</div>
					)}
				</Row>
			</main>
			<Footer />
		</div>
	)
}

export default App;


// TODO:
// QA all links
// host on our domain
//
// MINT:
// add footer (with all logos)
// add alerts (minting..., already maxed out, etc.)
// css styling update
// update smart contract details that are displayed on the page (e.g. minting price, nft count)
// add all metackicks to the ipfs (and update project / site accordingly) 
//
// HOME:
// add helpful links: https://wallet.polygon.technology/
// add rounded gifs
// add testimonial vid
//
// RAFFLE:
//
// NICE TO HAVE:
// fix countdown timer
// add delayed reveal feature
// separate main contract file out into multiple simpler contracts
//

