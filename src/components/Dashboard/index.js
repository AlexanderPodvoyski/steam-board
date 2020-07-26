import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBox from './SearchBox';
import GameCard from './GameCard';
import useDebounce from './use-debounce';

const HOST = 'http://myrik.xyz:5000';

const findGameUsers = (appId) =>
  axios.get(`${HOST}/game/${appId}/users`).then(({ data }) => data);

const searchGame = (name) => {
  return axios.post(`${HOST}/game`, { name }).then(({ data }) => data);
};

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [users, setUsers] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchGame(debouncedSearchTerm).then(setSearchResult);
    } else {
      setSearchResult([]);
    }
  }, [debouncedSearchTerm]);

  const changeTerm = (term) => {
    setSearchTerm(term);
    setSelectedGame(null);
  };

  const selectGame = (game) => {
    setSearchResult([]);
    setSelectedGame(game);
    findGameUsers(game.id).then(setUsers);
  };

  const searchCard = (game) => {
    const { name, img_logo_url, id } = game;

    return (
      <div
        key={id}
        style={{ cursor: 'pointer' }}
        onClick={() => selectGame(game)}
      >
        <GameCard title={name} imgUrl={img_logo_url} />
      </div>
    );
  };

  return (
    <div className="dashboard">
      <SearchBox value={searchTerm} onChange={changeTerm} />
      {selectedGame ? (
        <GameCard
          title={selectedGame.name}
          imgUrl={selectedGame.img_logo_url}
          users={users}
        />
      ) : (
        searchResult.map(searchCard)
      )}
    </div>
  );
}

export default Dashboard;
