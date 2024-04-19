import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { List } from './components/listOfGoods';

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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_REVERSE = 'reverse';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [sortFieldReverse, setSortFieldReverse] = useState('');

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setSortFieldReverse('');
  };

  const sortByLength = () => {
    if (sortFieldReverse === SORT_FIELD_REVERSE) {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good2.length - good1.length),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
      );
    }

    setSortField(SORT_FIELD_LENGTH);
  };

  const reverseSort = () => {
    setVisibleGoods([...visibleGoods].reverse());
    if (sortFieldReverse === '') {
      setSortFieldReverse(SORT_FIELD_REVERSE);
    } else {
      setSortFieldReverse('');
    }
  };

  const sortByAlphabet = () => {
    if (sortFieldReverse === SORT_FIELD_REVERSE) {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good2.localeCompare(good1)),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
      );
    }

    setSortField(SORT_FIELD_ALPHABETICALLY);
  };

  let buttonReset = (
    <button type="button" className="button is-danger is-light" onClick={reset}>
      Reset
    </button>
  );

  if (sortField === '' && sortFieldReverse === '') {
    buttonReset = null;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortFieldReverse === SORT_FIELD_REVERSE ? '' : 'is-light'}`}
          onClick={reverseSort}
        >
          Reverse
        </button>

        {buttonReset}
      </div>

      <ul>
        <List goods={visibleGoods} />
      </ul>
    </div>
  );
};
