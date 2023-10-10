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

const sortBy = [
  { name: 'Sort alphabetically', color: 'is-info' },
  { name: 'Sort by length', color: 'is-success' },
  { name: 'Reverse', color: 'is-warning' },
  { name: 'Reset', color: 'is-danger' },
];

function sortGoods(goods, type, reverse) {
  const goodsSorted = [...goods];

  if (type) {
    goodsSorted.sort((good1, good2) => (
      (type === 'Sort alphabetically')
        ? good1.localeCompare(good2)
        : good1.length - good2.length));
  }

  if (reverse) {
    goodsSorted.reverse();
  }

  return goodsSorted;
}

export const App = () => {
  const [sortType, setSortType] = useState(false);
  const [sortReverse, setSortReverse] = useState(false);
  const goods = sortGoods(goodsFromServer, sortType, sortReverse);

  return (
    <div className="section content">
      <div className="buttons">
        {sortBy.map(el => (
          (el.name !== 'Reset' || (sortType || sortReverse)) && (
            <button
              type="button"
              key={el.name}
              className={cn(
                'button',
                el.color,
                {
                  'is-light': (() => {
                    switch (el.name) {
                      case 'Sort alphabetically':
                        return sortType !== el.name;
                      case 'Sort by length':
                        return sortType !== el.name;
                      case 'Reverse':
                        return !sortReverse;
                      case 'Reset':
                        return true;
                      default:
                        return false;
                    }
                  })(),
                },
              )}
              onClick={() => {
                switch (el.name) {
                  case 'Sort alphabetically':
                    return setSortType(el.name);
                  case 'Sort by length':
                    return setSortType(el.name);
                  case 'Reverse':
                    return (sortReverse)
                      ? setSortReverse(false)
                      : setSortReverse(true);
                  case 'Reset':
                    return (
                      setSortReverse(false),
                      setSortType(false)
                    );
                  default:
                    return false;
                }
              }}
            >
              {el.name}
            </button>
          )
        ))}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>

    </div>
  );
};
