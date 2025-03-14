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

export const App = () => {
  const [selectedField, setSelectedField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const getSortedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (selectedField === 'alphabetically') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (selectedField === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    return isReverse ? sortedGoods.reverse() : sortedGoods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectedField === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setSelectedField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${selectedField === 'length' ? '' : 'is-light'}`}
          onClick={() => setSelectedField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReverse ? '' : 'is-light'}`}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {selectedField || isReverse ? (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSelectedField('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {getSortedGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
