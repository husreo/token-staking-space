import FCON from "../fcon";
import MyNewNFTs from "./MyNewNFTs";

export default function Overview({
  setSelectedIndex,
}: {
  setSelectedIndex: (d: number) => void;
}) {
  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex-1">
          <FCON />
        </div>
        <MyNewNFTs setSelectedIndex={setSelectedIndex} />
      </div>
    </div>
  );
}
