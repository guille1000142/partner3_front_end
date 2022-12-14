import { useEffect, useState } from "react";
import Web3 from "web3";
import toast from "react-hot-toast";
import UniswapRouter from "../abis/RouterPolygon/IUniswapV2Router02.json";
import ParnerAbi from "../abis/PartnerContract/PartnerContract.json";
import {
  pMaticAddress,
  pUsdcAddress,
  pRouterAddress,
  pPartnerAddress,
} from "../utils/address";

export default function useWeb3() {
  const [maticPrice, setMaticPrice] = useState(false);
  const [account, setAccount] = useState(false);
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(false);
  const [contract, setContract] = useState(false);

  useEffect(() => {
    const privateProvider = process.env.REACT_APP_CHAINSTACK_URL_WS;
    const privateWeb3 = new Web3(
      new Web3.providers.WebsocketProvider(privateProvider)
    );

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

    if (typeof window.ethereum !== "undefined") {
      const metamaskWeb3 = new Web3(window.ethereum);
      setWeb3(metamaskWeb3);

      const partnerContract = new metamaskWeb3.eth.Contract(
        ParnerAbi,
        pPartnerAddress
      );
      setContract(partnerContract);

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
    }
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", (accounts) => {
          setAccount(accounts);
        });

        window.ethereum.removeListener("chainChanged", (_chainId) => {
          setNetwork(_chainId);
        });
      }
    };
  }, []);

  const truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

    return truncatedNum / multiplier;
  };

  const readBalance = () => {
    web3.eth
      .getBalance(account)
      .then((balance) => {
        const walletBalance = web3.utils.fromWei(balance.toString(), "ether");
        const truncate = truncateDecimals(parseFloat(walletBalance), 2);
        setBalance(truncate);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (web3 && account && network !== "") {
      readBalance();
    }
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
    contract,
    maticPrice,
  };
}
