
import { useEffect, useState } from "react";
import axios from "axios";
import '../Pokemon/Pokemon'
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {

    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true)

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL);

        const pokemonResults = response.data.results;

        const pokemonResultPromis = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromis);
        console.log(pokemonData);
        const pokeLIstRes = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                name : pokemon.name,
                image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :  pokemon.sprites.front_shiny,
                types: pokemon.types
            }
            
        });
        console.log(pokeLIstRes);
        setPokemonList(pokeLIstRes);
        setIsLoading(false)
    }
    useEffect(()=> {
        downloadPokemons();
    },[]);

    

    return (
        <div className="pokemon-list-wrapper">
           <div className="pokemon-wrapper">
            {(isLoading) ? 'Loading...' : 
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
            }
            </div>

            <div className="controls">
                <button>Prev</button>
                <button>Next</button>
            </div>
        </div>
    )

}

export default PokemonList;
