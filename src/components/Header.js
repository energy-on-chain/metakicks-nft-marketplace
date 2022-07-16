const Header = (props) => {
    return (
        <nav className="navbar fixed-top mx-3">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0 mx-4"
                // href="http://www.dappuniversity.com/bootcamp"
                // target="_blank"
                rel="noopener noreferrer"
            >
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                Metakicks NFT
            </a>
            <div className="ms-auto">
                <a className="navbar-brand" href = "/">Home</a>
                <a className="navbar-brand" href = "/">Mint</a>
                <a className="navbar-brand" href = "/">Raffle</a>
            </div>
            {props.account ? (
                <a
                    href={`https://etherscan.io/address/${props.account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button nav-button btn-sm mx-4">
                    {props.account.slice(0, 5) + '...' + props.account.slice(38, 42)}
                </a>
            ) : (
                <button onClick={props.web3Handler} className="button nav-button btn-sm mx-4">Connect Wallet</button>
            )}
        </nav>
    );
}

export default Header;

