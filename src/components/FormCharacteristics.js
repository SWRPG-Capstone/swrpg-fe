import React, { useState } from 'react';
// import { gql, useMutation } from '@apollo/client';
// import { formReducer } from '../utilities/utilities';

// const initialState = {
//   agility: 1,
//   brawn: 1,
//   charPresence: 1,
//   cunning: 1,
//   intellect: 1,
//   willpower: 1
// };

// const CREATE_CHARACTERISTICS = gql`
//   mutation createCharacteristics($agility: Int!, $brawn: Int!, $characterId: Int!, $charPresence: Int!, $cunning: Int!, $intellect: Int!, $willpower: Int!) {
//     createCharacteristic(
//       input: {
//         agility: $agility
//         brawn: $brawn
//         characterId: $characterId
//         charPresence: $charPresence
//         cunning: $cunning
//         intellect: $intellect
//         willpower: $willpower
//       }
//     ) {
//       agility
//       brawn
//       characterId
//       charPresence
//       cunning
//       intellect
//       willpower
//     }
//   }
// `;

export const FormCharacteristics = ({ charId, setCount, onChange, formState }) => {
  // const [state, dispatch] = useReducer(formReducer, initialState);
  // const { agility, brawn, charPresence, cunning, intellect, willpower } = state;
  // state.characterId = parseInt(charId);
  const [validated, setValidated] = useState(null);

  // const [createCharacteristics] = useMutation(CREATE_CHARACTERISTICS, {
  //   variables: state
  // });

  // const onChange = e => {
  //   dispatch({
  //     field: e.target.name,
  //     value: parseInt(e.target.value)
  //   });
  // };

  const validateForm = () => {
    return Object.keys(formState.characteristics).reduce((valid, stat) => {
      if (stat !== 'characterId' && (formState.characteristics[stat] < 1 || formState.characteristics[stat] > 5 || !formState.characteristics[stat])) valid = false;
      return valid;
    }, true);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let formComplete = validateForm();
    setValidated(formComplete);
    if (formComplete) {
      // createCharacteristics();
      setCount();
    }
  };

  return (
    <form className='characteristic-form' autoComplete='on'>
      <div className='input-container'>
        <label className='char-heading' htmlFor='agility'>
          agility
          <input className='char-value' type='number' min='0' max='5' name='agility' value={formState.characteristics.agility} onChange={(e) => onChange(e, 'handle number input', 'characteristics')} autoFocus />
        </label>
      </div>

      <div className='input-container'>
        <label className='char-heading' htmlFor='brawn'>
          brawn
          <input className='char-value' type='number' min='0' max='5' name='brawn' value={formState.characteristics.brawn} onChange={(e) => onChange(e, 'handle number input', 'characteristics')} />
        </label>
      </div>

      <div className='input-container'>
        <label className='char-heading' htmlFor='charPresence'>
          presence
          <input className='char-value' type='number' min='0' max='5' name='charPresence' value={formState.characteristics.charPresence} onChange={(e) => onChange(e, 'handle number input', 'characteristics')} />
        </label>
      </div>

      <div className='input-container'>
        <label className='char-heading' htmlFor='cunning'>
          cunning
          <input className='char-value' type='number' min='0' max='5' name='cunning' value={formState.characteristics.cunning} onChange={(e) => onChange(e, 'handle number input', 'characteristics')} />
        </label>
      </div>

      <div className='input-container'>
        <label className='char-heading' htmlFor='intellect'>
          intellect
          <input className='char-value' type='number' min='0' max='5' name='intellect' value={formState.characteristics.intellect} onChange={(e) => onChange(e, 'handle number input', 'characteristics')} />
        </label>
      </div>

      <div className='input-container'>
        <label className='char-heading' htmlFor='willpower'>
          willpower
          <input className='char-value' type='number' min='0' max='5' name='willpower' value={formState.characteristics.willpower} onChange={(e) => onChange(e, 'handle number input', 'characteristics')} />
        </label>
      </div>

      {validated === false && <p className='form-error-msg'>Characteristics must have a value between 1 and 5</p>}

      <button className='button' onClick={handleSubmit}>
        Next
      </button>
    </form>
  );
};
