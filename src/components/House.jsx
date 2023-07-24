import { useEffect, useState } from 'react';
import { useContract, useWeb3 } from '../utils/web3';
import aframe from "aframe";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const House = (props) => {
  const [owner, setOwner] = useState('');
  const { web3, loading } = useWeb3();
  const contract = useContract();
  const loader = new GLTFLoader();

  useEffect(() => {
    loader.load(props.model, (d) => {
        const entity = document.getElementById("house"+props.id);
        entity.object3D.add(d.scene)
    })
  }, [contract, loading]);

//   useEffect(() => {
//     const fetchOwner = async () => {
//       if (!contract || loading) return;

//       try {
//         const owner = await contract.methods.getHouseOwner(houseId).call();
//         setOwner(owner);
//       } catch (error) {
//         console.error('Error fetching owner:', error);
//       }
//     };

//     fetchOwner();
//   }, [contract, houseId, loading]);

  const handleHouseClick = () => {
    if (!loading && web3 && web3.currentProvider.isMetaMask) {
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.error('Error getting accounts:', error);
        } else {
          const userAddress = accounts[0];
          if (userAddress.toLowerCase() === owner.toLowerCase()) {
            alert('Home sweet home');
          } else {
            alert(`Owner: ${owner}`);
          }
        }
      });
    }
  };

  return (
    <a-entity id={"house"+props.id} onClick={handleHouseClick} position={props.id * 10 + " 0 0"}></a-entity>
  );
};

export default House;