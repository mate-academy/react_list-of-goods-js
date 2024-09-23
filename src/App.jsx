import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

const SORT_BY_ALPHABET = 'alphabet';
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

const getPreparedGoods = (goods, { sortField, isReversed }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleClear = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isChanged = sortField || isReversed;

  const goods = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  const buttons = [
    {
      name: 'Sort alphabetically',
      className: cn('is-info', { 'is-light': sortField !== SORT_BY_ALPHABET }),
      handleClick() {
        setSortField(SORT_BY_ALPHABET);
      },
    },
    {
      name: 'Sort by length',
      className: cn('is-success', { 'is-light': sortField !== SORT_BY_LENGTH }),
      handleClick() {
        setSortField(SORT_BY_LENGTH);
      },
    },
    {
      name: 'Reverse',
      className: cn('is-warning', { 'is-light': !isReversed }),
      handleClick() {
        setIsReversed(prevState => !prevState);
      },
    },
  ];

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            type="button"
            className={cn(`button ${button.className}`)}
            onClick={button.handleClick}
            key={button.name}
          >
            {button.name}
          </button>
          // eslint-disable-next-line prettier/prettier
        ))}

        {isChanged && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={handleClear}
          >
            Reset
          </button>
        )}
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
