import { useEffect, useState } from "react";
import Web3 from "web3";
import UniswapRouter from "../abis/RouterPolygon/IUniswapV2Router02.json";
import { pMaticAddress, pUsdcAddress, pRouterAddress } from "../utils/address";
import toast from "react-hot-toast";

export default function useWeb3() {
  const [maticPrice, setMaticPrice] = useState(false);
  const [account, setAccount] = useState(false);
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(false);

  useEffect(() => {
    const user = process.env.REACT_APP_CHAINSTACK_USER;
    const password = process.env.REACT_APP_CHAINSTACK_PASSWORD;
    const url = process.env.REACT_APP_CHAINSTACK_URL;

    // const provider = `wss://${user}:${password}@${url}`;
    const provider =
      "https://nd-922-817-491.p2pify.com/207f0dbf875f1ba67c01ca3d1f96d455";
    const privateWeb3 = new Web3(new Web3.providers.HttpProvider(provider));

    const polygonSwapContract = new privateWeb3.eth.Contract(
      UniswapRouter.abi,
      pRouterAddress
    );

    polygonSwapContract.methods
      .getAmountsOut("1000000000000000000", [pMaticAddress, pUsdcAddress])
      .call()
      .then((price) =>
        setMaticPrice(parseFloat((parseInt(price[1]) / 1000000).toFixed(4)))
      )
      .catch((err) => console.log(err));

    const metamaskWeb3 = new Web3(window.ethereum);
    setWeb3(metamaskWeb3);

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((account) => setAccount(account[0]))
      .catch((err) => console.log(err));

    window.ethereum
      .request({ method: "eth_chainId" })
      .then((chainId) => setNetwork(chainId))
      .catch((err) => console.log(err));

    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });

    window.ethereum.on("chainChanged", (_chainId) => {
      setNetwork(_chainId);
    });

    return () => {
      window.ethereum.removeListener("accountsChanged", (accounts) => {
        setAccount(accounts);
      });

      window.ethereum.removeListener("chainChanged", (_chainId) => {
        setNetwork(_chainId);
      });
    };
  }, []);

  const truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

    return truncatedNum / multiplier;
  };

  const readBalance = () => {
    if (web3 && account && network !== "") {
      web3.eth
        .getBalance(account)
        .then((balance) => {
          const walletBalance = web3.utils.fromWei(balance.toString(), "ether");
          const truncate = truncateDecimals(parseFloat(walletBalance), 2);
          setBalance(truncate);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    readBalance();
  }, [account, network, web3]);

  const connectWallet = () => {
    if (typeof window.ethereum !== "undefined") {
      const connect = window.ethereum.request({
        method: "eth_requestAccounts",
      });
      toast.promise(connect, {
        loading: "Connecting...",
        success: "Connected",
        error: "Failed",
      });
    } else {
      toast.error("Metamask not installed");
    }
  };

  const addNetwork = ({ chainId }) => {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chainId,
          chainName: chainId === "0x89" ? "POLYGON" : "BSC",
          rpcUrls: [
            chainId === "0x89"
              ? "https://polygon-rpc.com"
              : "https://bscrpc.com",
          ],
          nativeCurrency: {
            name: chainId === "0x89" ? "MATIC" : "BNB",
            symbol: chainId === "0x89" ? "MATIC" : "BNB",
            decimals: 18,
          },
        },
      ],
    });
  };

  const changeNetwork = ({ chainId }) => {
    const change = window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      })
      .catch((err) => {
        if (err.code === 4902) {
          addNetwork({ chainId });
        }
      });

    toast.promise(change, {
      loading: "Connecting...",
      success: "Connected",
      error: "Failed",
    });
  };

  return {
    changeNetwork,
    connectWallet,
    readBalance,
    account,
    network,
    balance,
    web3,
    maticPrice,
  };
}
