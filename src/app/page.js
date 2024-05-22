'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [pokemonTeam, setPokemonTeam] = useState([]);

    const getRandomPokemon = async () => {
        try {
            const randomPokemonIds = Array.from({ length: 6 }, () => Math.floor(Math.random() * 898) + 1);
            const promises = randomPokemonIds.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
            const responses = await Promise.all(promises);
            const newPokemonTeam = responses.map(response => response.data);
            setPokemonTeam(newPokemonTeam);
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
        }
    };

    return (
        <div>
            <h1>Team Assembled</h1>
            <button onClick={getRandomPokemon}>Get Random Team</button>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
                {pokemonTeam.map(pokemon => (
                    <div key={pokemon.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
