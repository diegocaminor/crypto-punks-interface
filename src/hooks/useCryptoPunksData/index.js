import { useCallback, useEffect, useState } from "react";
import useCryptoPunks from "../useCryptoPunks";

const getPunkData = async ({ cryptoPunks, tokenId }) => {
  const [tokenURI, dna, owner] = await Promise.all([
    cryptoPunks.methods.tokenURI(tokenId).call(),
    cryptoPunks.methods.tokenDNA(tokenId).call(),
    cryptoPunks.methods.ownerOf(tokenId).call(),
  ]);

  const [
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
    cryptoPunks.methods.getAccessoriesType(dna).call(),
    cryptoPunks.methods.getAccessoriesType(dna).call(),
    cryptoPunks.methods.getClotheColor(dna).call(),
    cryptoPunks.methods.getClotheType(dna).call(),
    cryptoPunks.methods.getEyeType(dna).call(),
    cryptoPunks.methods.getEyeBrowType(dna).call(),
    cryptoPunks.methods.getFacialHairColor(dna).call(),
    cryptoPunks.methods.getFacialHairType(dna).call(),
    cryptoPunks.methods.getHairColor(dna).call(),
    cryptoPunks.methods.getHatColor(dna).call(),
    cryptoPunks.methods.getGraphicType(dna).call(),
    cryptoPunks.methods.getMouthType(dna).call(),
    cryptoPunks.methods.getSkinColor(dna).call(),
    cryptoPunks.methods.getTopType(dna).call(),
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

// Singular;
const useCryptoPunkData = (tokenId = null) => {
  const [punk, setPunk] = useState({});
  const [loading, setLoading] = useState(true);
  const cryptoPunks = useCryptoPunks();

  const update = useCallback(async () => {
    if (cryptoPunks && tokenId != null) {
      setLoading(true);
      const toSet = await getPunkData({ tokenId, cryptoPunks });
      setPunk(toSet);

      setLoading(false);
    }
  }, [cryptoPunks, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punk,
    update,
  };
};

export { useCryptoPunksData, useCryptoPunkData };
