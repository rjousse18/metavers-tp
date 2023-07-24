import { useEffect, useState } from 'react';
import { useContract } from '../utils/web3';
import House from './House';
import Maison2 from '../models/maison2.glb';
import CielBleu from '../images/ciel-bleue.jpg';
import aframe from "aframe";


const VRScene = () => {
  const [houses, setHouses] = useState([{id: 1, owner: "867ghj687bkjfd987op", model: Maison2}]);

  const contract = useContract(); // Utilisez votre propre fonction pour initialiser le contrat

//   useEffect(() => {
//     if (contract) {
//       const fetchHouses = async () => {
//         const totalHouses = await contract.methods.houseListLength().call();
//         const fetchedHouses = [];

//         for (let i = 0; i < totalHouses; i++) {
//           const owner = await contract.methods.getHouseOwner(i).call();
//           fetchedHouses.push({ id: i, owner, model: Maison2 });
//         }

//         console.log("k,dslkfj", fetchedHouses);
//         setHouses(fetchedHouses);
//       };

//       fetchHouses();
//     }
//   }, [contract]);

  return (
    <a-scene>
        <a-asset>
            <img id="sky" src={CielBleu} alt=''/>
        </a-asset>
        {houses.map((house) => 
            <House key={"house"+house.id} {...house} />
        )}
        <a-sky color="#fff" material="src:#sky" rotation="0 0 0"></a-sky>
    </a-scene>
  );
};

export default VRScene;