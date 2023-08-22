import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useCryptoPunks from "../../hooks/useCryptoPunks";

const Home = () => {
  const { active } = useWeb3React();
  const [maxSupply, setMaxSupply] = useState();

  const platziPunks = useCryptoPunks();

  const getMaxSupply = useCallback(async () => {
    if (platziPunks) {
      const result = await platziPunks.methods.maxSupply().call();
      setMaxSupply(result);
    }
  }, [platziPunks]);

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply]);

  if (!active) return "Conecta tu wallet";

  return (
    <>
      <p>
        <b>Max supply:</b> {maxSupply}
      </p>
    </>
  );
};

export default Home;
