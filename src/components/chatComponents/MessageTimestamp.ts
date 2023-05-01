/** @format */

interface Props {
  msg: {
    timestamp: string;
  };
  firstMsg: boolean;
  setTimestamp: React.Dispatch<React.SetStateAction<string>>;
  setFirstMsgTimeStamp: React.Dispatch<React.SetStateAction<string>>;
}

export function MessageTimestamp({
  msg,
  firstMsg,
  setTimestamp,
  setFirstMsgTimeStamp,
}: Props) {
  const parts = msg.timestamp.split(/[ :-]+/);
  const year = parseInt(parts[2]);
  const month = parseInt(parts[1]) - 1; // months are zero-indexed
  const day = parseInt(parts[0]);
  const hour = parseInt(parts[3]);
  const minute = parseInt(parts[4]);

  const date = new Date(year, month, day, hour, minute);

  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );

  if (firstMsg) {
    setFirstMsgTimeStamp(
      date.toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }

  if (date.toDateString() === today.toDateString()) {
    setTimestamp(
      `Today at ${date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      })}`
    );
  } else if (date.toDateString() === yesterday.toDateString()) {
    setTimestamp(
      `Yesterday at ${date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      })}`
    );
  } else {
    setTimestamp(date.toLocaleDateString());
  }
}
