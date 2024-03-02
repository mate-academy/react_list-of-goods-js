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

function sortByParameter(goods, { param = '' }) {
  let goodsArr = goods;

  switch (param) {
    case 'alphabetically': {
      goodsArr = goods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });

      break;
    }

    case 'length': {
      goodsArr = goods.sort((good1, good2) => {
        return good1.length - good2.length;
      });

      break;
    }

    default: {
      break;
    }
  }

  return goodsArr;
}

function getGoodsFormatted(goods, reversed) {
  if (reversed) {
    return goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setReversed] = useState(false);

  const handleClick = param => {
    setSortBy(param);
  };

  const obj = {
    param: sortBy,
  };

  const goods = sortByParameter([...goodsFromServer], obj);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !sortBy.startsWith('alphabetically'),
          })}
          onClick={() => handleClick('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !sortBy.startsWith('length'),
          })}
          onClick={() => handleClick('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortBy !== '' && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              handleClick('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getGoodsFormatted(goods, isReversed).map(good => {
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
