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

  const alphabetic = () => {
    const copy = [...goodsCopy].sort();

    setGoodsCopy(copy);
    setLastChange('alphabetic');
  };

  const lengthSort = () => {
    const copy = [...goodsCopy].sort((good1, good2) => {
      return good2.replace(' ', '').length - good1.replace(' ', '').length;
    });

    setGoodsCopy(copy);
    setLastChange('length');
  };

  const reset = () => {
    setGoodsCopy(goodsFromServer);
    setLastChange('reset');
  };

  const reverse = () => {
    if (lastChange === 'alphabetic') {
      const copy = [...goodsCopy].sort().reverse();

      setGoodsCopy(copy);
      setLastChange('reverse-alphabetic');
    }

    if (lastChange === 'length') {
      const copy = [...goodsCopy].sort((good1, good2) => {
        return good1.replace(' ', '').length - good2.replace(' ', '').length;
      });

      setGoodsCopy(copy);
      setLastChange('reverse-length');
    }

    if (lastChange === 'reverse-alphabetic') {
      alphabetic();
    }

    if (lastChange === 'reverse-length') {
      reverse();
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${lastChange === 'alphabetic' ? '' : 'is-light'}`}
          onClick={() => {
            alphabetic();
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${lastChange === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            lengthSort();
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${lastChange === 'reverse-alphabetic' || lastChange === 'reverse-length' ? '' : 'is-light'}`}
          onClick={() => {
            reverse();
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-info ${lastChange === 'reset' ? '' : 'is-light'}`}
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </div>
      <ul>
        {goodsCopy.map(good => {
          return <li key={good}>{good}</li>;
        })}
      </ul>
    </div>
  );
}
