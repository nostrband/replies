const About = () => {
  return (
    <div>
      <h1 className="mb-4">
        Replies is a Nostr micro-app for finding replies.
      </h1>

      <h3>Why a separate micro-app?</h3>
      <p>
        <ul>
          <li>
            Replies can find any event, not just ones that are supported by your
            nostr client.
          </li>
          <li>
            Replies handles errors gracefully and allows you to retry the reply
            if anything fails.
          </li>
          <li>
            Replies can be integrated by other apps - just redirect to it, or
            embed as an iframe.
          </li>
        </ul>
      </p>

      <h3>API</h3>
      <p>
        If you want to integrate with Replies, just redirect users to the{" "}
        <code>/replies</code> endpoint and add these query string parameter:
        <ul>
          <li>
            <b>id</b> - required, bech32 id (note, nevent, naddr){" "}
          </li>
        </ul>
      </p>

      <h3>Need help?</h3>
      <p>
        Just drop your issues on{" "}
        <a href="https://github.com/nostrband/replies/issues">github</a> or
        contact{" "}
        <a href="https://snort.social/p/npub1xdtducdnjerex88gkg2qk2atsdlqsyxqaag4h05jmcpyspqt30wscmntxy">
          brugeman
        </a>{" "}
        on Nostr.
      </p>
    </div>
  );
};

export default About;
