import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classnames from 'classnames';

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

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';

function sortBy(fieldForSort, isReversed) {
  const goods = [...goodsFromServer];

  if (fieldForSort) {
    switch (fieldForSort) {
      case SORT_BY_ALPHABET:
        goods.sort((a, b) => a.localeCompare(b));
        break;

      case SORT_BY_LENGTH:
        goods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }
  }

  return isReversed ? goods.reverse() : goods;
}

export const App = () => {
  const [isReverseActive, setIsReverseActive] = useState(false);
  const [sortField, setSortField] = useState('');

  const preparedGoods = sortBy(sortField, isReverseActive);

  const resetAllSort = () => {
    setIsReverseActive(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
            sortBy(SORT_BY_ALPHABET, isReverseActive);
          }}
          type="button"
          className={
          classnames('button',
            'is-info',
            { 'is-light': sortField !== SORT_BY_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
            sortBy(SORT_BY_LENGTH, isReverseActive);
          }}
          type="button"
          className={
          classnames('button',
            'is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReverseActive(!isReverseActive);
          }}
          type="button"
          className={
          classnames(
            'button',
            'is-warning',
            { 'is-light': !isReverseActive },
          )}
        >
          Reverse
        </button>

        {(sortField || isReverseActive) && (
          <button
            onClick={() => resetAllSort()}
            type="button"
            className={
            classnames(
              'button',
              'is-danger',
              { 'is-light': true },
            )}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
