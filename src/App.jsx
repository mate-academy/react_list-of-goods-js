import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_WORDS = 'words';
const SORT_LENGTH = 'length';
const SORT_REVERSE = 'reverse';

export const App = () => {
  function organize(items, { order }) {
    const prepareItems = [...items];

    if (order === SORT_WORDS) {
      prepareItems.sort((itm1, itm2) => itm1.localeCompare(itm2));
    }

    if (order === SORT_LENGTH) {
      prepareItems.sort((itm1, itm2) => itm1.length - itm2.length);
    }

    if (order === SORT_REVERSE) {
      prepareItems.reverse();
    }

    return prepareItems;
  }

  const [visibleItems, setVisibleItems] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const reset = () => {
    setVisibleItems(goodsFromServer);
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_WORDS,
          })}
          onClick={() => {
            const organizedItems = organize(goodsFromServer, {
              order: SORT_WORDS,
            });

            setVisibleItems(
              reversed
                ? organize(organizedItems, { order: SORT_REVERSE })
                : organizedItems,
            );

            setSortField(SORT_WORDS);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => {
            const organizedItems = organize(goodsFromServer, {
              order: SORT_LENGTH,
            });

            setVisibleItems(
              reversed
                ? organize(organizedItems, { order: SORT_REVERSE })
                : organizedItems,
            );

            setSortField(SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => {
            const organizedItems = organize(goodsFromServer, {
              order: sortField,
            });

            setVisibleItems(
              reversed
                ? organizedItems
                : organize(organizedItems, { order: SORT_REVERSE }),
            );

            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
