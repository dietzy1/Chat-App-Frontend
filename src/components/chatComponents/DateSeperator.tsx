/** @format */

interface Props {
  timestamp: string;
}

function DateSeperator({ timestamp }: Props) {
  return (
    <div className="flex items-center mx-4">
      <div className="flex-grow h-px bg-spotify4 opacity-50"></div>
      <div className="px-4 font-bold text-spotify4 opacity-50">{timestamp}</div>
      <div className="flex-grow h-px bg-spotify4 opacity-50"></div>
    </div>
  );
}
export default DateSeperator;
