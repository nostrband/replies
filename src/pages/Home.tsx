import Thread from "../components/Thread/Thread";
import Search from "../components/Search/Search";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import NDK, { NDKUserProfile } from "@nostrband/ndk";
import { nip19 } from "nostr-tools";
import { useEffect, useState } from "react";
import MarkdownComponent from "../components/MarkdownComponent/MarkdownComponent";
import { Spinner } from "react-bootstrap";

const Home = ({ ndk }: { ndk: NDK }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [id, setId] = useState<string>(
    searchParams.get("id")! ? searchParams.get("id")! : ""
  );
  const [author, setAuthor] = useState<NDKUserProfile | null>();
  const [authorNpub, setAuthorNpub] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    isCorrectAnchor();
  }, [searchParams.get("id")]);

  useEffect(() => {
    setAuthor(null);
    if (!id.startsWith("http")) {
      fetchEvent();
    }
  }, [id]);
  const isCorrectAnchor = () => {
    try {
      if (searchParams.get("id")!.startsWith("https")) {
        setId(searchParams.get("id")!);
      } else {
        const hex = searchParams.get("id")
          ? nip19.decode(searchParams.get("id")!)
          : "";
        if (hex) {
          setId(searchParams.get("id")!);
          setIsError(false);
        }
      }
    } catch (e) {
      setId("");
      setIsError(true);
    }
  };

  const fetchEvent = async () => {
    try {
      if (ndk instanceof NDK) {
        setIsLoading(true);
        const eventDecode = nip19.decode(id);

        if (eventDecode.type === "naddr") {
          const eventData = eventDecode.data;
          //@ts-ignore
          const event = await ndk.fetchEvent({
            authors: [eventData.pubkey],
            kinds: [eventData.kind],
            "#d": [eventData.identifier],
          });
          //@ts-ignore
          const eventAuthor = await ndk.fetchEvent({
            kinds: [0],
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
          setEventContent(event!.content ? event!.content : "");
        } else if (eventDecode.type === "nevent") {
          const eventData = eventDecode.data;
          //@ts-ignore
          const event = await ndk.fetchEvent({
            kinds: [1],
            ids: [eventData.id],
          });
          //@ts-ignore
          const eventAuthor = await ndk.fetchEvent({
            kinds: [0],
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
          setEventContent(event!.content ? event!.content : "");
        } else {
          const eventData = eventDecode.data;
          //@ts-ignore
          const event = await ndk.fetchEvent({
            kinds: [1],
            ids: [eventData],
          });
          //@ts-ignore
          const eventAuthor = await ndk.fetchEvent({
            kinds: [0],
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
          if (event?.kind === 1 || event?.kind === 30023) {
            setEventContent(event.content);
          } else {
            const eventTags = event?.tags ? event.tags : [];
            const tagAlt = eventTags.find((tag) => tag[0] === "alt");
            const content = `kind: ${event?.kind}, alt: ${
              tagAlt ? tagAlt[1] : ""
            }`;
            setEventContent(content);
          }
        }
        setIsLoading(false);
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
            {isError && <strong>Invalid Note ID</strong>}
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
          {isLoading && (
            <div className="d-flex justify-content-center pt-3">
              <Spinner />
            </div>
          )}
          {author && (
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
                    {author.display_name ? author.display_name : author.name}
                  </Link>
                </div>
              </div>
              <div className="note-content">
                <MarkdownComponent content={eventContent} />
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
