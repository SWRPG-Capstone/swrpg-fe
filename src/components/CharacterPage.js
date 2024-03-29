import React from 'react';
import { InfoField } from './InfoField';
import { Characteristics } from './Characteristics';
import { useQuery, gql } from '@apollo/client';

const CHARACTER = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      species
      specialization
      career
      characteristics {
        brawn
        agility
        cunning
        intellect
        willpower
        charPresence
      }
    }
  }
`;

export const CharacterPage = ({ currentChar }) => {
  const { loading, error, data } = useQuery(CHARACTER, {
    variables: { id: currentChar },
  });

  if (loading) return 'Loading your data...';
  if (error && currentChar === null)
    return (
      <p className="prompt-msg">
        Select your character on the <a href="/home">homepage</a>!
      </p>
    );
  if (error) return `Error! ${error.message}`;

  const character = data.character;

  const characterInfo = (
    <dl>
      <InfoField heading="name" info={character.name} />
      <InfoField heading="species" info={character.species} />
      <InfoField heading="career" info={character.career} />
      <InfoField heading="specialization" info={character.specialization} />
    </dl>
  );

  return (
    <section className="character-sheet">
      <div className="column">
        <h2 className="sr-only">Character details</h2>
        {characterInfo}
      </div>
      <div className="column">
        <h2 className="stats-heading">Characteristics</h2>
        <Characteristics characteristics={character.characteristics[0]} />
      </div>
    </section>
  );
};
