import { useMemo, useState } from 'react';
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

export const App = () => {
  // estado do tipo de ordenação atual
  const [sortType, setSortType] = useState(null);
  // estado para inverter a lista
  const [isReversed, setIsReversed] = useState(false);

  // true quando está na ordem original
  const isOriginalOrder = sortType === null && !isReversed;

  const visibleGoods = useMemo(() => {
    // cria uma cópia da lista para não alterar o original
    const goods = [...goodsFromServer];

    // aplica ordenação alfabética
    if (sortType === 'alphabet') {
      goods.sort((a, b) => a.localeCompare(b));
    }

    // aplica ordenação por tamanho
    if (sortType === 'length') {
      goods.sort((a, b) => a.length - b.length);
    }

    // inverte a ordem atual
    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {/* botão de reset só aparece fora da ordem original */}
        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
