type Props = {
  value: string;
  clickFunction: () => void;
};

export default function Square({ value, clickFunction }: Props) {
  return <button onClick={clickFunction} className="p-2 border rounded font-semibold w-16 h-16 sm:w-32 sm:h-32">{value}</button>;
}
