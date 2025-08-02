import 'bulma/css/bulma.css';
import './App.scss';
import { useEffect, useState } from 'react';
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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [reverse, setReverse] = useState(false);

  const sortAlphabet = () => {
    const sorted = [...goodsFromServer].sort();

    if (reverse) {
      sorted.reverse();
    }

    setGoods(sorted);
  };

  const sortByLength = () => {
    setGoods(prev => {
      const tmp = [...prev].sort((a, b) => {
        if (a.length === b.length) {
          return a.localeCompare(b);
        }

        return a.length - b.length;
      });

      if (reverse) {
        tmp.reverse();
      }

      return tmp;
    });
  };

  useEffect(() => {
    switch (selectedFilter) {
      case 'alphabetically':
        sortAlphabet();
        break;
      case 'length':
        sortByLength();
        break;
      default:
        if (reverse) {
          setGoods([...goodsFromServer].reverse());
          break;
        }

        setGoods([...goodsFromServer]);
        break;
    }
  }, [selectedFilter, reverse]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': selectedFilter !== 'alphabetically',
          })}
          onClick={() => setSelectedFilter('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': selectedFilter !== 'length',
          })}
          onClick={() => setSelectedFilter('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning ', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(selectedFilter || reverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSelectedFilter(null);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
