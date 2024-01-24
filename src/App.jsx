import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

export const goodsFromServer = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortfield, query, reverse }) {
  let preparedGoods = [...goods];

  if (query) {
    preparedGoods = preparedGoods
      .filter(good => good.name
        .toLowerCase()
        .includes(query.toLowerCase()));
  }

  if (sortfield) {
    preparedGoods.sort((good1, good2) => {
      const name1 = good1.name.toLowerCase();
      const name2 = good2.name.toLowerCase();

      let comparisonResult = 0;
      let lengthDiff;

      switch (sortfield) {
        case SORT_FIELD_ALPHABET:
          comparisonResult = reverse
            ? name2.localeCompare(name1)
            : name1.localeCompare(name2);
          break;

        case SORT_FIELD_LENGTH:
          lengthDiff = reverse
            ? name2.length - name1.length
            : name1.length - name2.length;

          if (lengthDiff !== 0) {
            comparisonResult = lengthDiff;
          } else {
            comparisonResult = reverse
              ? name2.localeCompare(name1)
              : name1.localeCompare(name2);
          }

          break;

        default:
          return 0;
      }

      return comparisonResult;
    });
  } else if (reverse) {
    // Reverse the goods if there is no sorting but the reverse flag is true
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortfield, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const [query] = useState('');
  const [originalGoods, setOriginalGoods] = useState([...goodsFromServer]);

  const handleSort = (field) => {
    const newReverse = field === sortfield ? !reverse : reverse; // Keep the current reverse state if the same field is clicked

    setSortField(field);

    const sortedGoods = [...originalGoods];

    // Sort the goods
    sortedGoods.sort((good1, good2) => {
      switch (field) {
        case SORT_FIELD_ALPHABET:
          return newReverse
            ? good2.name.localeCompare(good1.name)
            : good1.name.localeCompare(good2.name);
        case SORT_FIELD_LENGTH: {
          const lengthDiff = newReverse
            ? good2.name.length - good1.name.length
            : good1.name.length - good2.name.length;
          let result;

          if (lengthDiff !== 0) {
            result = lengthDiff;
          } else {
            result = newReverse
              ? good2.name.localeCompare(good1.name)
              : good1.name.localeCompare(good2.name);
          }

          return result;
        }

        default:
          return 0;
      }
    });

    setReverse(newReverse);
    setOriginalGoods(sortedGoods);
  };

  const handleReverse = () => {
    // If it's the initial reverse, reverse the original goods
    if ((!sortfield && !reverse)) {
      const reversedGoods = [...originalGoods].reverse();

      setOriginalGoods(reversedGoods);
      setReverse(true);
      setSortField('');
    } else {
      // If it's a reversal after sorting, reverse the sorted goods
      setReverse(!reverse);
    }
  };

  const handleReset = () => {
    setSortField('');
    setReverse(false);
    setOriginalGoods([...goodsFromServer]);
  };

  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortfield, query, reverse });
  const sortedGoods = [...visibleGoods];

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            {
              'is-light':
                sortfield !== SORT_FIELD_ALPHABET
                || (reverse && sortfield !== SORT_FIELD_ALPHABET),
            },
          )}
          onClick={() => handleSort(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            {
              'is-light':
                sortfield !== SORT_FIELD_LENGTH
                || (reverse && sortfield !== SORT_FIELD_LENGTH),
            },
          )}
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortfield || reverse || query) && (
          <button
            type="button"
            className={cn('button is-danger', 'is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good.id} data-cy="Good">{good.name}</li>
        ))}
      </ul>
    </div>
  );
};
