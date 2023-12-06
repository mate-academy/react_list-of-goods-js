import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { GoodList } from './components/GoodList';
import { SORT } from './components/variables';

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

function SortAndReverseArray(
  goods, type,
) {
  let result = null;

  switch (type) {
    case SORT.REVERSE:
      result = [...goods].reverse();
      break;

    case SORT.LENGTH:
      result = [...goods].sort((good1, good2) => good1.length - good2.length);
      break;

    case SORT.ALPHABET:
      result = [...goods].sort((good1, good2) => good1.localeCompare(good2));
      break;

    default:
      result = [...goods];
      break;
  }

  return result;
}

export const App = () => {
  const [selectedGoodType, setSelectedGoodType] = useState('');
  const goodsArry = SortAndReverseArray(goodsFromServer, selectedGoodType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSelectedGoodType(SORT.ALPHABET)}
          className={cn('button is-info', {
            'is-light': SORT.ALPHABET !== selectedGoodType,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSelectedGoodType(SORT.LENGTH)}
          className={cn('button is-success', {
            'is-light active': SORT.LENGTH !== selectedGoodType,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setSelectedGoodType(SORT.REVERSE)}
          className={cn('button is-warning', {
            'is-light': SORT.REVERSE !== selectedGoodType,
          })}
        >
          Reverse
        </button>

        {(SORT.ALPHABET === selectedGoodType || SORT.LENGTH === selectedGoodType
        || SORT.REVERSE === selectedGoodType) && (
          <button
            type="button"
            className={cn('button is-danger', { 'is-light': true })}
            onClick={() => {
              setSelectedGoodType('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={goodsArry} />
    </div>
  );
};
