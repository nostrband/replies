import Thread from "../components/Thread/Thread";
import Search from "../components/Search/Search";
import { Link, useSearchParams } from "react-router-dom";
import NDK, { NDKEvent, NDKUserProfile } from "@nostr-dev-kit/ndk";
import { nip19 } from "nostr-tools";
import { useEffect, useState } from "react";
import MarkdownComponent from "../components/MarkdownComponent/MarkdownComponent";

const Home = ({ ndk }: { ndk: NDK }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [event, setEvent] = useState<NDKEvent | null>();
  const [author, setAuthor] = useState<NDKUserProfile | null>();
  const [authorNpub, setAuthorNpub] = useState("");

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      if (ndk instanceof NDK) {
        const eventId = id ? nip19.decode(id).data : "";
        if (eventId) {
          //@ts-ignore
          const event = await ndk.fetchEvent({ kinds: [1], ids: [eventId] });
          const eventAuthor = await ndk.fetchEvent({
            kinds: [0],
            //@ts-ignore
            authors: [event?.pubkey],
          });
          const author = eventAuthor?.content
            ? JSON.parse(eventAuthor?.content)
            : null;
          const npub = eventAuthor?.pubkey
            ? nip19.npubEncode(eventAuthor?.pubkey)
            : "";
          setAuthorNpub(npub);

          setAuthor(author);
          setEvent(event);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

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
          {event && author && (
            <div className="note">
              <div className="note-author">
                <div className="note-author-avatar">
                  <img
                    alt="avatar"
                    src={author.image ? author.image : author.picture}
                  />
                </div>
                <div className="note-author-name">
                  <Link to={`https://new.nostr.band/${authorNpub}`}>
                    {author.displayName ? author.displayName : author.name}
                  </Link>
                </div>
              </div>
              <div className="note-content">
                <MarkdownComponent content={event.content} />
              </div>
            </div>
          )}
          <Thread anchor={id} />
        </>
      )}
    </>
  );
};

export default Home;
