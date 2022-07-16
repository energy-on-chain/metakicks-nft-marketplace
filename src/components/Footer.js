import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import hbdLogo from '../images/hbd-logo.jpg'
import eocLogo from '../images/eoc-logo.jpg'


const Footer = (props) => {
    return (
        <Container fluid>
        <Row>
          <Col align="center">
            <a
                className="navbar-brand a-footer col-sm-3 col-md-2 mr-0 mx-4"
                href="http://www.houstonblockdev.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Sponsored by Houston Block Dev
                <img src={hbdLogo} className="App-logo" alt="logo" />
            </a>
          </Col>
          <Col align="center">
            <a
                className="navbar-brand a-footer col-sm-3 col-md-2 mr-0 mx-4"
                href="http://www.energyonchain.net"
                target="_blank"
                rel="noopener noreferrer"
            >
                Developed by Energy on Chain, LLC
                <img src={eocLogo} className="App-logo" alt="logo" />
            </a>
          </Col>
        </Row>
      </Container>
    );
}

export default Footer;
