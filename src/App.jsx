import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export function App() {
  const [goodsCopy, setGoodsCopy] = useState([...goodsFromServer]);
  const [lastChange, setLastChange] = useState('');

  const sortAlphabetically = () => {
    const copy = [...goodsCopy].sort((a, b) => a.localeCompare(b));

    setGoodsCopy(copy);
    setLastChange('alphabetic');
  };

  const sortByLength = () => {
    const copy = [...goodsCopy].sort((good1, good2) => {
      return good2.replace(' ', '').length - good1.replace(' ', '').length;
    });

    setGoodsCopy(copy);
    setLastChange('length');
  };

  const reset = () => {
    setGoodsCopy([...goodsFromServer]);
    setLastChange('');
  };

  const reverse = () => {
    const copy = [...goodsCopy].reverse();
    setGoodsCopy(copy);

    if (lastChange === 'alphabetic') {
      setLastChange('reverse-alphabetic');
    } else if (lastChange === 'reverse-alphabetic') {
      setLastChange('alphabetic');
    } else if (lastChange === 'length') {
      setLastChange('reverse-length');
    } else if (lastChange === 'reverse-length') {
      setLastChange('length');
    } else {
      setLastChange(lastChange === 'reverse' ? '' : 'reverse');
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${lastChange === 'alphabetic' ? '' : 'is-light'}`}
          onClick={() => {
            sortAlphabetically();
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${lastChange === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            sortByLength();
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${lastChange.startsWith('reverse') ? '' : 'is-light'}`}
          onClick={() => {
            reverse();
          }}
        >
          Reverse
        </button>

        {lastChange !== '' && (
          <button
            type="button"
            className={`button is-info ${lastChange === 'reset' ? '' : 'is-light'}`}
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {goodsCopy.map((good) => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
}