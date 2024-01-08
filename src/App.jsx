import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

function getPrepearedGoods(goods, sortField, isRevers) {
  let prepearedGoods = goods;

  switch (sortField) {
    case 'alphabet': {
      prepearedGoods = goods.sort();
      break;
    }

    case 'length': {
      prepearedGoods = goods
        .sort((good1, good2) => good1.length - good2.length);
      break;
    }

    default:
      break;
  }

  if (isRevers === 'yes') {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const startData = [...goodsFromServer];

  const [sortField, setSortField] = useState(null);
  const [reverseField, setReverseField] = useState('no');

  const sortByAlphabet = () => {
    setSortField('alphabet');
  };

  const sortByLength = () => {
    setSortField('length');
  };

  const reverse = () => {
    const yesNo = reverseField === 'no' ? 'yes' : 'no';

    setReverseField(yesNo);
  };

  const reset = () => {
    setSortField(null);
    setReverseField('no');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseField === 'no',
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(reverseField === 'yes' || sortField !== null) ? (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={reset}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {getPrepearedGoods(startData, sortField, reverseField).map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
