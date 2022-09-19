export default function useGas() {
  const getPolygonGas = async () => {
    const data = await fetch("https://gasstation-mainnet.matic.network");
    const gas = await data.json();
    return gas;
  };

  return { getPolygonGas };
}
