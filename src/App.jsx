import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { SortList } from './components/SortList';

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

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getSortedGoods(currGoods, initialGoods, sortField, reverseField) {
  const preparedGoods = currGoods;

  if (sortField === '' && reverseField === false) {
    return initialGoods;
  }

  const sortAlphabetically = [...preparedGoods].sort((good1, good2) => {
    return good1.localeCompare(good2);
  });

  const sortByLength = [...sortAlphabetically].sort((good1, good2) => {
    return good1.length - good2.length;
  });

  if (sortField === SORT_BY_ALPHABET) {
    if (reverseField) {
      return sortAlphabetically.reverse();
    }

    return sortAlphabetically;
  }

  if (sortField === SORT_BY_LENGTH) {
    if (reverseField) {
      return sortByLength.reverse();
    }

    return sortByLength;
  }

  if (reverseField) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const initialGoods = [...goodsFromServer];
  const [currGoods, setCurrGoods] = useState(initialGoods);
  const visibleGoods = getSortedGoods(
    currGoods,
    initialGoods,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'Sort alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            setSortField('Sort alphabetically');
            setCurrGoods(visibleGoods);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'Sort by length' ? '' : 'is-light'}`}
          onClick={() => {
            setSortField('Sort by length');
            setCurrGoods(visibleGoods);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseField ? '' : 'is-light'}`}
          onClick={() => {
            setReverseField(!reverseField);
            setCurrGoods(visibleGoods);
          }}
        >
          Reverse
        </button>

        {sortField || reverseField ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(false);
              setCurrGoods(visibleGoods);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <SortList list={visibleGoods} />
    </div>
  );
};
