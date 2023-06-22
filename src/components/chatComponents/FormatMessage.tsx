/** @format */

import { staticEmojis } from "./emoteData";

export function FormatMessages(msg: string) {
  let result = msg;

  staticEmojis.forEach((emoji) => {
    const regex = new RegExp(
      `(^|\\W)${emoji.emote.code.toUpperCase()}(\\W|$)`,
      "g"
    );

    result = result.replace(
      regex,
      `<img className="inline-block w-4" src="https://cdn.betterttv.net/emote/${emoji.emote.id}/1x" alt="${emoji.emote.code}" />`
    );
  });
  return (
    <div
      className="flex flex-row flex-wrap"
      dangerouslySetInnerHTML={{ __html: result }}
    />
  );
}
