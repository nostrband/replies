import Header from "../components/Header/Header";
import Thread from "../components/Thread/Thread";
import Search from "../components/Search/Search";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  return (
    <>
      {!id && (
        <>
          <div className="app-container">
            <p>Enter noteid or naddr to view replies</p>
            <Search />
            <p className="mt-4">
              To learn more about this Nostr micro-app and how to use it click{" "}
              <Link to="/about">here</Link>.
            </p>
            <footer className="mt-5 mb-2">
              Replies is an{" "}
              <Link to="https://github.com/nostrband/replies">open-source</Link>{" "}
              micro-app by <Link to="https://nostr.band">nostr.band</Link>.
            </footer>
          </div>
        </>
      )}
      {id && (
        <>
          <Search />
          <Thread anchor={id} />
        </>
      )}
    </>
  );
};

export default Home;
