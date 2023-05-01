/** @format */

interface emote {
  id: string;
  code: string;
  imageType: string;
  animated: boolean;
  userId: string;
}

function FetchEmotes() {
  fetch("https://api.betterttv.net/3/cached/emotes/global", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "vscode-client",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      console.log(data);
      // do something with the returned data
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
