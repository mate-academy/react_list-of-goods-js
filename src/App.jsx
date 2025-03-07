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

export const App = () => {
  const IS_LIGHT = '';
  const [sortFlag, setSortFlag] = useState(IS_LIGHT);
  const [visibileGoods, setVisibileGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortFlag('reset');
    setIsReversed(false);
    setSortFlag(IS_LIGHT);
    setVisibileGoods(goodsFromServer);
  };

  const sortByItems = () => {
    setSortFlag('alphabetical');
    setVisibileGoods(
      [...visibileGoods].sort((item1, item2) => item1.localeCompare(item2)),
    );
  };

  const toggleReverse = () => {
    setIsReversed(prevState => {
      const newState = !prevState;

      setVisibileGoods(
        prevState ? [...visibileGoods].reverse() : [...visibileGoods].reverse(),
      );

      return newState;
    });
  };

  const sortByLength = () => {
    setSortFlag('length');
    setVisibileGoods(
      [...visibileGoods].sort((good1, good2) => good1.length - good2.length),
    );
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByItems}
          type="button"
          className={cn('button is-info', {
            'is-light': sortFlag === 'alphabetical',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortFlag === 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === true,
          })}
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(visibileGoods) && (
          <button
            onClick={reset}
            type="button"
            className={cn('button is-danger', {
              'is-light': sortFlag === 'reset',
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibileGoods.map(item => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
};
