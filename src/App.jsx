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

const buttonsFromServer = [
  'Sort alphabetically',
  'Sort by length',
  'Reverse',
  'Reset',
];

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedButtons(buttons, { sortField, reverse }) {
  const preparedButtons = [...buttons];

  if (!sortField && !reverse) {
    preparedButtons.pop();
  }

  return preparedButtons;
}

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SORT_FIELD_NAME) {
        return good1.localeCompare(good2);
      }

      // if (sortField === SORT_FIELD_NAME && reverse === true) {
      //   return good2.localeCompare(good1);
      // }

      if (sortField === SORT_FIELD_LENGTH) {
        return good1[sortField] - good2[sortField];
      }

      // if (sortField === SORT_FIELD_LENGTH && reverse === true) {
      //   return good2[sortField] - good1[sortField];
      // }

      return 0;
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

const Button = ({ button, sortField, reverse, setSortField, setReverse }) => {
  return (
    <button
      type="button"
      className={cn(
        'button',
        // 'is-light',
        // console.log(sortField),
        { 'is-info': button === 'Sort alphabetically' },
        { 'is-success': button === 'Sort by length' },
        { 'is-warning': button === 'Reverse' },
        { 'is-danger': button === 'Reset' },
        {
          'is-light': button === 'Sort alphabetically' && sortField !== 'name',
        },
        { 'is-light': button === 'Sort by length' && sortField !== 'length' },
        { 'is-light': button === 'Reverse' && !reverse },
        { 'is-light': button === 'Reset' },
      )}
      onClick={() => {
        const value = button;

        switch (value) {
          case 'Sort alphabetically':
            setSortField(SORT_FIELD_NAME);

            break;
          case 'Sort by length':
            setSortField(SORT_FIELD_LENGTH);
            break;
          case 'Reverse':
            if (reverse) {
              setReverse(false);
            } else {
              setReverse(true);
            }

            break;
          case 'Reset':
            setSortField('');
            setReverse(false);
            break;

          default:
            break;
        }
        // setSortField(SORT_FIELD_NAME);
        // setReverse(true);
      }}
    >
      {button}
    </button>
  );
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });
  const visibleButtons = getPreparedButtons(buttonsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        {visibleButtons.map(button => (
          <Button
            button={button}
            sortField={sortField}
            reverse={reverse}
            setReverse={setReverse}
            setSortField={setSortField}
          />
        ))}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
