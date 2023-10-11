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
  const [isReversed, setisReversed] = useState(false);
  const goods = sortGoods(goodsFromServer, sortType, isReversed);

  function isLight(name) {
    switch (name) {
      case 'Sort alphabetically':
        return sortType !== name;
      case 'Sort by length':
        return sortType !== name;
      case 'Reverse':
        return !isReversed;
      case 'Reset':
        return true;
      default:
        return false;
    }
  }

  function clickEvent(name) {
    switch (name) {
      case 'Sort alphabetically':
        return setSortType(name);
      case 'Sort by length':
        return setSortType(name);
      case 'Reverse':
        return (isReversed)
          ? setisReversed(false)
          : setisReversed(true);
      case 'Reset':
        return (
          setisReversed(false),
          setSortType(false)
        );
      default:
        return false;
    }
  }

  function enethingButReset(name) {
    return name !== 'Reset' || (sortType || isReversed);
  }

  return (
    <div className="section content">
      <div className="buttons">
        {sortBy.map(el => (
          (enethingButReset(el.name)) && (
            <button
              type="button"
              key={el.name}
              className={cn(
                'button',
                el.color,
                {
                  'is-light': isLight(el.name),
                },
              )}
              onClick={() => {
                clickEvent(el.name);
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
