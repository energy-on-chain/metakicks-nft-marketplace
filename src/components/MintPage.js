// Import React Components
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
// import Alert from 'react-bootstrap/Alert';
// import Countdown from 'react-countdown'

// Import Helper Components
import Web3 from 'web3'

// Import App Components
import Header from "./Header";
import Footer from "./Footer";

// Import ABI + Config
import MetakicksNFT from '../abis/MetakicksNFT.json';
import CONFIG from '../config.json';
// import { NODE_PARENT_VALIDATIONS } from '@babel/types';

// Import Images
import metakickImage from '../images/metakick0.PNG'


function MintPage() {

	// STATE VARIABLES
	const [metakicksNft, setMetakicksNft] = useState(null)
	const [revealTime, setRevealTime] = useState(0)
	const [isMinting, setIsMinting] = useState(false)
	const [isError, setIsError] = useState(false)
	const [web3, setWeb3] = useState(null)
	const [account, setAccount] = useState(null)
	const [supplyAvailable, setSupplyAvailable] = useState(0)
	const [balanceOf, setBalanceOf] = useState(0)
	const [blockchainExplorerURL, setBlockchainExplorerURL] = useState('https://etherscan.io/')
	const [openseaURL, setOpenseaURL] = useState('https://opensea.io/')
	const [message, setMessage] = useState(null)
	const [currentNetwork, setCurrentNetwork] = useState(null)
	const [currentTime, setCurrentTime] = useState(new Date().getTime())
	// const [showAlert, setShowAlert] = useState('')


	// FUNCTIONS
	const loadBlockchainData = async () => {
		console.log('Running loadBlockchainData...')

		// Fetch Contract, Data, etc.
		if (web3) {
			const networkId = await web3.eth.net.getId()
			setCurrentNetwork(networkId)

			try {
				const metakicksNft = new web3.eth.Contract(MetakicksNFT.abi, MetakicksNFT.networks[networkId].address) 
				setMetakicksNft(metakicksNft)

				const maxSupply = await metakicksNft.methods.maxSupply().call()
				const totalSupply = await metakicksNft.methods.totalSupply().call()
				setSupplyAvailable(maxSupply - totalSupply)

				const balanceOf = await metakicksNft.methods.balanceOf(account).call()
				setBalanceOf(balanceOf)

				// const allowMintingAfter = await metakicksNft.methods.allowMintingAfter().call()
				// const timeDeployed = await metakicksNft.methods.timeDeployed().call()
				// setRevealTime((Number(timeDeployed) + Number(allowMintingAfter)).toString() + '000')

				if (networkId !== 5777) {
					setBlockchainExplorerURL(CONFIG.NETWORKS[networkId].blockchainExplorerURL)
					setOpenseaURL(CONFIG.NETWORKS[networkId].openseaURL)
				}

			} catch (error) {
				console.log(error)
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

	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}

	const mintNFTHandler = async () => {
		console.log("Running mintNFTHandler...")
		// if (revealTime > new Date().getTime()) {
		// 	window.alert('Minting is not live yet!')  
		// 	return
		// }

		// if (balanceOf > 5) {
		// 	window.alert('You have already minted the max amount!');
		// 	// setShowAlert("minting")
		// 	return 
		// }

		// Mint NFT
		if (metakicksNft) {
			console.log('minting...')
			setIsMinting(true)
			setIsError(false)

			await metakicksNft.methods.mint(1).send({ from: account, value: 0 })
				.on('confirmation', async () => {
					console.log('confirmation received...')
					window.alert('Success! Please refresh the page.')
					const maxSupply = await metakicksNft.methods.maxSupply().call()
					const totalSupply = await metakicksNft.methods.totalSupply().call()
					setSupplyAvailable(maxSupply - totalSupply)

					const balanceOf = await metakicksNft.methods.balanceOf(account).call()
					setBalanceOf(balanceOf)
				})
				.on('error', (error) => {
					console.log('error during minting...')
					window.alert(error)
					// setShowAlert("error")
					setIsError(true)
				})
		}

		setIsMinting(false)
	};

	useEffect(() => {
		loadWeb3()
		loadBlockchainData()
	}, [account]);


	// LAYOUT
	return (
		<div>
			<Header account={account} web3Handler={web3Handler}/>
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
							alt="image-text-placeholder"
							className="image-showcase-example-1"
						/>
					</Col>
				</Row>
				<Row className="my-3">
                 	<Col className="flex">
                    	<a href={openseaURL + account} target="_blank" rel="noreferrer" className="button">View On Opensea</a>
                    	<a href='https://testnet.rarible.com/' target="_blank" rel="noreferrer" className="button">View On Rarible</a>
                    	<a href={`${blockchainExplorerURL}address/${account}`} target="_blank" rel="noreferrer" className="button">View My Etherscan</a>
                 	</Col>
             	</Row>
				<Row className="my-2 text-center">
                	{message ? (
                    	<p>{message}</p>
                		) : (
                    	<div>
                        	{metakicksNft &&
                            	<a href={`${blockchainExplorerURL}address/${metakicksNft._address}`}
                                	target="_blank"
                                	rel="noreferrer"
                                	className="contract-link d-block my-3">
                                	{metakicksNft._address}
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
			<Footer/>
		</div>
	);
}

export default MintPage;
