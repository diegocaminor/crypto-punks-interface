import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import CryptoPunksArtifact from "../../config/web3/artifacts/CryptoPunks";

const { address, abi } = CryptoPunksArtifact;

const useCryptoPunks = () => {
  const { active, library, chainId } = useWeb3React();

  const cryptoPunks = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return cryptoPunks;
};

export default useCryptoPunks;
