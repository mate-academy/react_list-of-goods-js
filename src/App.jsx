import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const ALPHABETICALLY = 'alphabetically';
const LENGTH = 'length';

function sortByParameter(goods, param = '', reverse = false) {
  let goodsArr = goods;

  switch (param) {
    case ALPHABETICALLY: {
      goodsArr = goods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });

      break;
    }

    case LENGTH: {
      goodsArr = goods.sort((good1, good2) => {
        return good1.length - good2.length;
      });

      break;
    }

    default: {
      break;
    }
  }

  return reverse ? goodsArr.reverse() : goodsArr;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleClick = param => {
    setSortBy(param);
  };

  const goods = sortByParameter([...goodsFromServer], sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !sortBy.startsWith(ALPHABETICALLY),
          })}
          onClick={() => handleClick(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !sortBy.startsWith(LENGTH),
          })}
          onClick={() => handleClick(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              handleClick('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
