import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './GoodList/GoodList';
import { sortByParam } from './utils';

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
  const [sortByAlphabet, setSortByAlphabet] = useState('inactive');
  const [sortByLength, setSortByLength] = useState('inactive');
  const [reverseArr, setReverseArr] = useState('inactive');
  const isResetActive =
    sortByAlphabet !== 'inactive' ||
    sortByLength !== 'inactive' ||
    reverseArr !== 'inactive';
  const calculatedGoods = sortByParam(goodsFromServer, {
    byAlphabet: sortByAlphabet,
    byLength: sortByLength,
    reverse: reverseArr,
  });

  function handleSortByAlphabet(value) {
    setSortByAlphabet(value);
    setSortByLength('inactive');
  }

  function handleSortByLength(value) {
    setSortByLength(value);
    setSortByAlphabet('inactive');
  }

  function handleReverse(value) {
    setReverseArr(value);
  }

  function handleReset() {
    setSortByAlphabet('inactive');
    setSortByLength('inactive');
    setReverseArr('inactive');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortByAlphabet !== 'active',
          })}
          onClick={() => handleSortByAlphabet('active')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortByLength !== 'active',
          })}
          onClick={() => handleSortByLength('active')}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseArr !== 'active',
          })}
          onClick={() =>
            handleReverse(reverseArr === 'active' ? 'inactive' : 'active')
          }
        >
          Reverse
        </button>
        {(sortByAlphabet !== 'inactive' ||
          sortByLength !== 'inactive' ||
          reverseArr !== 'inactive') && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': !isResetActive,
            })}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <GoodList goods={calculatedGoods} />
      </ul>
    </div>
  );
};
