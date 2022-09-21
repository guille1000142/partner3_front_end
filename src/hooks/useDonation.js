import { useState } from "react";
import toast from "react-hot-toast";
import useChat from "./useChat";
import useSave from "./useSave";
import useGas from "./useGas";

export default function useDonation() {
  const [user, setUser] = useState(
    JSON.parse(window.sessionStorage.getItem("user"))
  );
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
    contract,
    account,
    token,
    channel,
    network,
    changeNetwork,
    message,
    setMessage,
    amount,
    setAmount,
    balance,
    readBalance,
    profile,
  }) => {
    if (window.sessionStorage.getItem("user") === null) {
      toast.error("Login with twitch");
      return false;
    }

    const minimumAmount = token === "MATIC" ? 1 : 0.01;

    if (amount < minimumAmount) {
      toast.error("Minimum amount " + minimumAmount);
      return false;
    }

    // const chainId =
    //   (token === "MATIC" && "0x89") || (token === "BNB" && "0x38");

    // if (network !== chainId) {
    //   changeNetwork({ chainId });
    // } else {
    if (balance < amount) {
      toast.error("Insufficient balance");
      return false;
    }
    const truncateAmount = truncateDecimals(amount, 2);
    // const gas = await getPolygonGas();
    const block = await web3.eth.getBlockNumber();

    var transaction = contract.methods
      .newDonation(profile.wallet, parseInt(block + 49))
      .send({
        from: account,
        value: web3.utils.toWei(truncateAmount.toString(), "ether"),
        // gasPrice: web3.utils.toWei(gas.toString(), "gwei"),
        // gasLimit: 500000,
      })
      .on("receipt", (receipt) => {
        console.log("sended!");
        saveDonation({ user, channel, amount: truncateAmount, token });
        writeToChat(user, amount, token, message, channel);
        setAmount("");
        setMessage("");
        readBalance();
        return false;
      })
      .on("error", (err, receipt) => {
        if (err.code === -32603) {
          toast.error("This transaction needs more gas to be executed");
          return false;
        }
        if (err.code === 4001) {
          toast.error("Denied transaction signature");
          return false;
        }
        if (!err.code) {
          toast.error("Transaction reverted");
          return false;
        }
      });

    // toast.promise(transaction, {
    //   loading: "Pending...",
    //   success: "Confirmed",
    //   error: "Failed",
    // });
    // }
  };

  return { sendTokens };
}
