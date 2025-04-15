'use client';

import React, { useState, useEffect } from 'react';
import PokemonCard from './components/pokemonCard';
import PokemonCarousel from './components/PokemonCarousel';
import Header from './components/Header';
import Evoluciones from './components/evoluciones';
import Image from 'next/image';

export default function Home() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [agentData, setAgentData] = useState(null);
  const [isAgentLoading, setIsAgentLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2800);
    };

    loadData();
  }, []);

  const fetchAgentInfo = async (pokemonName) => {
    try {
      setIsAgentLoading(true);
      setAgentData(null);
      
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: pokemonName }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 
          `Error ${response.status}: ${response.statusText}`
        );
      }
  
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
  
      setAgentData(data);
    } catch (err) {
      console.error("Error fetching agent info:", err);
      setAgentData({
        summary: `Error al obtener información adicional: ${err.message}`,
        error: true
      });
    } finally {
      setIsAgentLoading(false);
    }
  };
  const fetchPokemon = async (identifier) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier.toLowerCase()}`);
      if (!res.ok) throw new Error('No encontrado');
      const data = await res.json();
      setPokemon(data);
      setError(null);
      // Llamar al agente después de obtener el Pokémon
      fetchAgentInfo(data.name);
    } catch (err) {
      setError('Pokémon no encontrado');
      setPokemon(null);
      setAgentData(null);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      fetchPokemon(search.trim());
    }
  };

  const handleSelectFromCarousel = (name) => {
    fetchPokemon(name);
  };

  return (
    <main>
      <Header />

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFCC01',
        textShadow: '2px 2px 0 #2a2a2a'
      }}>
        Buscador Pokémon
      </h1>

      <div style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        border: '5px solid #EE3030',
        borderRadius: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          <input
            type="text"
            placeholder="Nombre o número de tu Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            style={{
              backgroundColor: "#f200",
              padding: '0.7rem 1rem',
              fontSize: '1.2rem',
              border: '1px solid #FFCC01',
              borderRadius: '10px',
              outline: 'none',
              width: '70%',
              fontFamily: 'Verdana, sans-serif',
              color: '#333'
            }}
          />

          <button onClick={handleSearch} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Image
              src="https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
              alt="Buscar"
              width={40}
              height={40}
              style={{ transition: 'transform 0.3s' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)' }
            />
          </button>
        </div>

        <p style={{
          fontSize: '1rem',
          color: '#555',
          fontStyle: 'italic'
        }}>
          Aquí encontrarás más de <strong>900 Pokémon</strong> con sus detalles y evoluciones. ¡Atrápalos todos!
        </p>
      </div>

      {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}

      {pokemon && (
        <>
          <PokemonCard pokemon={pokemon} />
          
          {/* Sección de información del agente IA */}
          <div style={{
            maxWidth: '800px',
            margin: '2rem auto',
            padding: '1.5rem',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '4px solid #EE3030'
          }}>
            <h3 style={{ 
              color: '#333', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
             
              Información Ampliada
            </h3>
            
            {isAgentLoading ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#666'
              }}>
                <Image 
                  src="https://www.svgrepo.com/show/276264/pokeball-pokemon.svg" 
                  width={20} 
                  height={20} 
                  style={{ animation: 'spin 1s linear infinite' }}
                  alt="Cargando..."
                />
                Consultando a nuestro Poké-Asistente...
              </div>
            ) : (
              <div style={{ 
                color: '#555', 
                lineHeight: '1.6',
                whiteSpace: 'pre-line' 
              }}>
                {agentData?.summary || 'No hay información adicional disponible'}
              </div>
            )}
          </div>
        </>
      )}

      {pokemon?.id && (
        <>
          <h2 style={{ marginTop: '3rem', textAlign: 'center', color: '#444' }}>Evoluciones relacionadas</h2>
          <Evoluciones
            onSelect={handleSelectFromCarousel}
            currentPokemonId={pokemon.id}
          />
        </>
      )}

      <h2 style={{ marginTop: '3rem', textAlign: 'center', color: '#EE3030' }}>Descubre otros Pokémon</h2>
      <PokemonCarousel onSelect={handleSelectFromCarousel} />

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}