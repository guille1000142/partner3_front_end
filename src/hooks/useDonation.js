import { useContext } from "react";
import toast from "react-hot-toast";
import { Context } from "../context/Context";
import useChat from "./useChat";
import useSave from "./useSave";
import useGas from "./useGas";

export default function useDonation() {
  const { user, channel } = useContext(Context);
  const { writeToChat } = useChat();
  const { saveDonation } = useSave();
  const { getPolygonGas } = useGas();

  const truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

    return truncatedNum / multiplier;
  };

  const sendTokens = async ({
    web3,
    account,
    token,
    network,
    changeNetwork,
    message,
    setMessage,
    amount,
    setAmount,
    balance,
    readBalance,
  }) => {
    const minimumAmount = token === "MATIC" ? 1 : 0.01;

    if (amount < minimumAmount) {
      toast.error("Minimum amount " + minimumAmount);
      return false;
    }

    const chainId =
      (token === "MATIC" && "0x89") || (token === "BNB" && "0x38");

    if (network !== chainId) {
      changeNetwork({ chainId });
    } else {
      if (balance < amount) {
        toast.error("Insufficient balance");
        return false;
      }
      const truncateAmount = truncateDecimals(amount, 2);
      const gas = await getPolygonGas();

      var transaction = web3.eth
        .sendTransaction({
          from: account,
          to: channel.wallet,
          value: web3.utils.toWei(truncateAmount.toString(), "ether"),
          gasPrice: web3.utils.toWei((gas.fastest * 2).toString(), "gwei"),
          gasLimit: web3.utils.toWei("600", "kwei"),
        })
        .on("receipt", (receipt) => {
          writeToChat({ user, amount, token, message, channel });
          saveDonation({ user, channel, amount: truncateAmount, token });
          setAmount(0);
          setMessage("");
          readBalance();
        })
        .on("error", console.error);

      toast.promise(transaction, {
        loading: "Pending...",
        success: "Confirmed",
        error: "Failed",
      });
    }
  };

  return { sendTokens };
}
