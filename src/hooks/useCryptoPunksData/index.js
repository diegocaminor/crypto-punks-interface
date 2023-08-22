import { useCallback, useEffect, useState } from "react";
import useCryptoPunks from "../useCryptoPunks";

const getPunkData = async ({ cryptoPunks, tokenId }) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    cryptoPunks.methods.tokenURI(tokenId).call(),
    cryptoPunks.methods.tokenDNA(tokenId).call(),
    cryptoPunks.methods.ownerOf(tokenId).call(),
    cryptoPunks.methods.getAccessoriesType(tokenId).call(),
    cryptoPunks.methods.getAccessoriesType(tokenId).call(),
    cryptoPunks.methods.getClotheColor(tokenId).call(),
    cryptoPunks.methods.getClotheType(tokenId).call(),
    cryptoPunks.methods.getEyeType(tokenId).call(),
    cryptoPunks.methods.getEyeBrowType(tokenId).call(),
    cryptoPunks.methods.getFacialHairColor(tokenId).call(),
    cryptoPunks.methods.getFacialHairType(tokenId).call(),
    cryptoPunks.methods.getHairColor(tokenId).call(),
    cryptoPunks.methods.getHatColor(tokenId).call(),
    cryptoPunks.methods.getGraphicType(tokenId).call(),
    cryptoPunks.methods.getMouthType(tokenId).call(),
    cryptoPunks.methods.getSkinColor(tokenId).call(),
    cryptoPunks.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  };
};

// Plural
const useCryptoPunksData = () => {
  const [punks, setPunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const cryptoPunks = useCryptoPunks();

  const update = useCallback(async () => {
    if (cryptoPunks) {
      setLoading(true);

      let tokenIds;

      const totalSupply = await cryptoPunks.methods.totalSupply().call();
      tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);

      const punksPromise = tokenIds.map((tokenId) =>
        getPunkData({ tokenId, cryptoPunks })
      );

      const punks = await Promise.all(punksPromise);

      setPunks(punks);
      setLoading(false);
    }
  }, [cryptoPunks]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};

// Singular
// const usePlatziPunkData = () => {

// }

export { useCryptoPunksData };
