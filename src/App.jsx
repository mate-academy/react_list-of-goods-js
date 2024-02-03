import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { Button } from './components/Button';

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

export const goodsFromServerModObj = goodsFromServer
  .map(item => ({ id: goodsFromServer.indexOf(item) + 1, name: item }));

export const btns = [
  'Sort alphabetically',
  'Sort by length',
  'Reverse',
  'Reset',
];

const buttons = [...btns].map(item => (
  { id: btns.indexOf(item) + 1, name: item }
));

export const App = () => {
  const [searchField, setSearchField] = useState('');
  const [goodsRender, setGoodsRender] = useState(goodsFromServerModObj);

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(btn => (
          <Button
            key={btn.id}
            btn={btn.name}
            searchField={searchField}
            setSearchField={setSearchField}
            goodsRender={goodsRender}
            setGoodsRender={setGoodsRender}
            goodsFromServerModObj={goodsFromServerModObj}
          >
            { btn }
          </Button>
        ))}
      </div>

      <ul>
        {goodsRender.map(item => (
          <li data-cy="Good" key={item.id}>{ item.name }</li>
        ))}
      </ul>
    </div>
  );
};
