import { ZapThreadsAttributes } from "zapthreads";
import "zapthreads";

const Thread = ({ anchor }: { anchor: string }) => {
  return (
    <zap-threads
      anchor={anchor}
      //   npub={npub}
      relays={"wss://relay.nostr.band"}
    />
  );
};

export default Thread;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "zap-threads": ZapThreadsAttributes;
    }
  }
}
