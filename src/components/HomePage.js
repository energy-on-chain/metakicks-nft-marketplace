// Import React Components
import { Row, Col } from 'react-bootstrap';
import ReactPlayer from "react-player";

// Import App Components
import Footer from "./Footer";


function HomePage() {
  return (
      <div>
        <main>
            <Row className="my-3">
                <Col className="text-center">
                    <h1 className="text-uppercase">Metakicks NFT Project</h1>
                    <p>Welcome to Metakicks NFT Project on Polygon!</p>
                    <p>See instructions below on how to mint your own Metakicks, or click the button to get started.</p>
                    <a className="navbar-brand" href = "/mint">
                        <button className="button nav-button btn-sm mx-4">Mint Now</button>
                    </a>
                    
                </Col>
            </Row>
            <Row>
                <Col align="center">
                    <ReactPlayer url="https://www.youtube.com/watch?v=UmQjjk9ghaY"></ReactPlayer>
                </Col>
            </Row>  
            <br></br> 
            <br></br> 
            <br></br> 
            <Row className="align-items-center">
                <Col></Col>
                <Col xs={5}>
                    <div className="instruction-tagline">
                    Step 1
                    </div>
                    <h3 className="instruction-title">
                    Go to minting page
                    </h3>
                    <p className="instruction-description">
                    Click the "Mint Now" button at the top of the page, or the "Mint" button in the header to navigate to where all Metakicks are born.
                    </p>
                </Col>
                <Col  xs={5} align="center">
                    <img
                        src={require('../images/metakicks-instruction-gif-test.gif').default}
                        alt="Features split 01"
                        width={528}
                        height={396} 
                    />
                </Col>
                <Col></Col>
            </Row>   
            <br></br> 
            <br></br> 
            <br></br> 
            <Row className="align-items-center">
                <Col></Col>
                <Col  xs={5} align="center">
                    <img
                        src={require('../images/metakicks-instruction-gif-test.gif').default}
                        alt="Features split 01"
                        width={528}
                        height={396} 
                    />
                </Col>
                <Col xs={5}>
                    <div className="instruction-tagline">
                    Step 2
                    </div>
                    <h3 className="instruction-title">
                    Connect your wallet
                    </h3>
                    <p className="instruction-description">
                    Ensure that you have the Metamask extension added to your browser. Click the button in the top right corner to connect your wallet to the site on Polygon network.
                    </p>
                </Col>
                <Col></Col>
            </Row>   
            <br></br> 
            <br></br> 
            <br></br>
            <Row className="align-items-center">
                <Col></Col>
                <Col xs={5}>
                    <div className="instruction-tagline">
                    Step 3
                    </div>
                    <h3 className="instruction-title">
                    Mint your Metakicks
                    </h3>
                    <p className="instruction-description">
                    Once connected, click the Mint button to mint your Metakicks NFT! Note that, although the NFT itself is free, you'll need a little MATIC gas to complete the transaction.
                    </p>
                </Col>
                <Col  xs={5} align="center">
                    <img
                        src={require('../images/metakicks-instruction-gif-test.gif').default}
                        alt="Features split 01"
                        width={528}
                        height={396} 
                    />
                </Col>
                <Col></Col>
            </Row>   
            <br></br> 
            <br></br> 
            <br></br>
            <Row className="align-items-center">
                <Col></Col>
                <Col  xs={5} align="center">
                    <img
                        src={require('../images/metakicks-instruction-gif-test.gif').default}
                        alt="Features split 01"
                        width={528}
                        height={396} 
                    />
                </Col>
                <Col xs={5}>
                    <div className="instruction-tagline">
                    Step 4
                    </div>
                    <h3 className="instruction-title">
                    View your transaction
                    </h3>
                    <p className="instruction-description">
                    Click either of the "View" buttons to see your new Metakicks!
                    </p>
                </Col>
                <Col></Col>
            </Row>   
            <br></br> 
            <br></br> 
            <br></br>
         </main>
        <Footer/>
      </div>
  );
}

export default HomePage;
