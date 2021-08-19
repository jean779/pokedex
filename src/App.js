import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
const  App = () =>{
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState ([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemon = async () =>{
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(res);
    } catch (e) {
      console.log(e);    
    }
  }

  useEffect(() => {
    getPokemon();
  }, [])

  const handleChance = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  }

  return (
   <div className="app">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" onChange={handleChance} placeholder="Enter pokemon Name"/>
        </label>
      </form>
      {pokemonData.map((data) => {
        return(
          <div className="container">
            <img src={data.sprites["front_default"]} />
            <div className="divTable">
              <div className="divTableBody">
              <div className="divTableRow">
                <div className="divTableCell">Tipo</div>
                <div className="divTableCell">{pokemonType}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Tamanho</div>
                <div className="divTableCell">{" "}{Math.round(data.height * 3.9)} cm</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Peso</div>
                <div className="divTableCell">{" "} {Math.round(data.weight / 4.3)} lbs</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Numero de batalhas</div>
                <div className="divTableCell">{data.game_indices.length}</div>
              </div>
          </div>
          </div>
          </div>
        );
      })}
   </div>
  );
};

export default App;
