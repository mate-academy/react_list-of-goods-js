import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_BY_ALPHABETIC = 'alpabetic';
const SORT_BY_LENGTH = 'length';

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

function sortGoodsBy(goodList, sortBy, isNeedReverse) {
  const goodListCopy = [...goodList];

  goodListCopy.sort((good1, good2) => {
    switch (sortBy) {
      case ('alpabetic'):
        return good1.localeCompare(good2);

      case ('length'):
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isNeedReverse) {
    goodListCopy.reverse();
  }

  return goodListCopy;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const goods = sortGoodsBy(goodsFromServer, sortBy, isReversed);

  const resetButton = (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => {
        setSortBy('');
        setIsReversed(false);
        setIsChanged(false);
      }}
    >
      Reset
    </button>
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_BY_ALPHABETIC,
          })}
          onClick={() => {
            setSortBy(SORT_BY_ALPHABETIC);
            setIsChanged(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortBy(SORT_BY_LENGTH);
            setIsChanged(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
            setIsChanged(!isReversed || sortBy);
          }}
        >
          Reverse
        </button>

        {isChanged ? resetButton : ''}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
