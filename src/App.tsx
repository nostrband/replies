import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header/Header";
import NDK from "@nostrband/ndk";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const ndk = new NDK({ explicitRelayUrls: ["wss://relay.nostr.band"] });
  ndk.connect();

  return (
    <Container>
      <Row className="justify-content-lg-center">
        <Col lg={9}>
          <div className="app">
            <Header />
            <Routes>
              <Route path="*" element={<Home ndk={ndk} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
