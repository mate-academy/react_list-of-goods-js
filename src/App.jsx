import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { sortBy } from './utils/index';
import { Button } from './components/Button/Button';

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
  const [fieldSort, setFieldSort] = useState('');
  const [reverse, setReverse] = useState(false);

  const goods = sortBy(goodsFromServer, fieldSort, reverse);

  function resetSort() {
    setFieldSort('');
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          title="Sort alphabetically"
          onClick={() => setFieldSort('ASC')}
          sx={`is-info
            ${fieldSort === 'ASC' ? '' : 'is-light'}`}
        />
        <Button
          title="Sort by length"
          onClick={() => setFieldSort('length')}
          sx={`is-success
             ${fieldSort === 'length' ? '' : 'is-light'}`}
        />
        <Button
          title="Reverse"
          onClick={() => setReverse(prev => !prev)}
          sx={`is-warning
            ${reverse ? '' : 'is-light'}`}
        />

        {(fieldSort !== '' || reverse) && (
          <Button
            title="Reset"
            onClick={() => resetSort()}
            sx="is-danger is-light"
          />
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
