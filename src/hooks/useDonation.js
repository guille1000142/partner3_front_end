import { useState } from "react";
import toast from "react-hot-toast";
import useChat from "./useChat";
import useSave from "./useSave";
import useGas from "./useGas";
import useWeb3 from "./useWeb3";

export default function useDonation() {
  const { writeToChat } = useChat();
  const { saveDonation } = useSave();
  const { getPolygonGas } = useGas();
  const { changeNetwork, readBalance, contract, web3 } = useWeb3();

  const truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

    return truncatedNum / multiplier;
  };

  const sendTokens = async ({
    account,
    token,
    channel,
    network,
    message,
    setMessage,
    amount,
    setAmount,
    balance,
    profile,
    user,
    setUser,
  }) => {
    if (window.localStorage.getItem("user") === null) {
      toast.error("Login with twitch");
      setUser(false);
      return false;
    }

    const minimumAmount = 0.2;

    if (amount < minimumAmount) {
      toast.error("Minimum amount " + minimumAmount);
      return false;
    }

    const chainId = "0x89";

    if (network !== chainId) {
      changeNetwork({ chainId });
    } else {
      if (balance < amount) {
        toast.error("Insufficient balance");
        return false;
      }

      const truncateAmount = truncateDecimals(amount, 2);
      const gas = await getPolygonGas();
      const block = await web3.eth.getBlockNumber();

      var transaction = contract.methods
        .newDonation(profile.wallet, parseInt(block + 49))
        .send({
          from: account,
          value: web3.utils.toWei(truncateAmount.toString(), "ether"),
          gasPrice: web3.utils.toWei(gas.fastest.toString(), "gwei"),
          gasLimit: 500000,
        })
        .on("receipt", (receipt) => {
          saveDonation({
            user,
            channel,
            amount: truncateAmount,
            token,
            message,
          });
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
    }
  };

  return { sendTokens };
}
