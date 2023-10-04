import { useSearchParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Thread from "./components/Thread/Thread";
import Search from "./components/Search/Search";

function App() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="app">
      {!id && (
        <>
          <Header />
          <Search />
        </>
      )}
      {id && (
        <>
          <Header />
          <Thread anchor={id} />
        </>
      )}
    </div>
  );
}

export default App;
