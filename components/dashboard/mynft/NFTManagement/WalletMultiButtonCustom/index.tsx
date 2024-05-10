import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import classNames from "classnames";
import styles from "./WalletMultiButtonCustom.module.css";

interface IWalletMultiButtonCustomProps {
  className?: string;
  onClickConnect?: () => void;
  disabled?: boolean;
}

const WalletMultiButtonCustom: React.FC<IWalletMultiButtonCustomProps> = ({
  className = "",
  onClickConnect,
  disabled,
}) => {
  return (
    <div
      onClick={() => {
        onClickConnect?.();
      }}
      className={classNames(styles.wallet_multi_button_base, className)}
    >
      <WalletMultiButton
        disabled={disabled}
        className={classNames(styles.wallet_multi_button_base, className)}
      />
    </div>
  );
};

export default WalletMultiButtonCustom;
