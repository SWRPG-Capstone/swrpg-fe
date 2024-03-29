import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { ALL_CHARACTERS } from '../graphql/queries';

export const HomePage = ({ currentUser, setCurrentChar }) => {
  const { loading, error, data } = useQuery(ALL_CHARACTERS, { variables: { id: currentUser } });

  if (!currentUser) return <Redirect to="/login" />;
  if (loading) return 'Loading your data...';
  if (error) return `Error! ${error.message}`;

  const handleClick = (e) => {
    setCurrentChar(e.target.id);
  };

  const charOptions = data.user.characters.map((character) => {
    return (
      <Link to="/character" className="home-link" key={character.id} id={parseInt(character.id)} onClick={handleClick}>
        {character.name}
      </Link>
    );
  });

  return (
    <section className="home-sheet">
      {charOptions}
      <Link to="/create" className="home-link">
        Create a New Character
      </Link>
    </section>
  );
};
