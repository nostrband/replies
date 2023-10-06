import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header/Header";
import NDK from "@nostr-dev-kit/ndk";

function App() {
  const ndk = new NDK({ explicitRelayUrls: ["wss://relay.nostr.band"] });
  ndk.connect();

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="*" element={<Home ndk={ndk} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
