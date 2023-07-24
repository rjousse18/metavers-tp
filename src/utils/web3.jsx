import { useEffect, useState } from 'react';
import Web3 from 'web3';
import NFTMetaverseContract from '../contracts/NFTMetaverse.json';

const useContract = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = NFTMetaverseContract.networks[networkId];
        const instance = new web3.eth.Contract(
          NFTMetaverseContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    initContract();
  }, []);

  return contract;
};

export { useContract };