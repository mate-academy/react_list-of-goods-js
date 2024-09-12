import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';
import { GoodList } from './GoodList/GoodList';

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

function getSortedList(initialList, { sortField, reversedList }) {
  const visibleGoods = [...initialList];

  if (sortField) {
    switch (sortField) {
      case 'alph':
        visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case 'len':
        visibleGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
    }
  }

  if (reversedList) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversedList, setReversedList] = useState(false);

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn('button is-info', {
              'is-light': sortField !== 'alph',
            })}
            onClick={() => {
              setSortField('alph');
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success', {
              'is-light': sortField !== 'len',
            })}
            onClick={() => {
              setSortField('len');
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning', {
              'is-light': !reversedList,
            })}
            onClick={() => setReversedList(!reversedList)}
          >
            Reverse
          </button>

          {(sortField || reversedList) && (
            <button
              type="button"
              className={cn('button is-danger', {
                'is-light': sortField || reversedList,
              })}
              onClick={() => {
                setSortField('');
                setReversedList(false);
              }}
            >
              Reset
            </button>
          )}
        </div>

        <GoodList
          goods={getSortedList(goodsFromServer, { sortField, reversedList })}
        />
      </div>
    </>
  );
};
