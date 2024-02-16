import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { goodsFromServerModObj, buttons }
from './helpersfuncs/getBtnGoodsObjArrs';
import { getGoodsToRend } from './helpersfuncs/getGoodsToRend';

export const App = () => {
  const [searchField, setSearchField] = useState('');
  const searchFieldActive = searchField;

  const [goodsRender, setGoodsRender]
  = useState(goodsFromServerModObj);
  const [isReversed, setIsReversed] = useState(false);
  const isReversedBtnState = isReversed;

  const goodsToSet = getGoodsToRend(goodsFromServerModObj,
    searchFieldActive, isReversedBtnState);

  useEffect(() => {
    setGoodsRender(goodsToSet);
  }, [searchFieldActive, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(btn => (
          <Button
            key={btn.id}
            btn={btn.name}
            searchField={searchField}
            setSearchField={setSearchField}
            isReversed={isReversed}
            setIsReversed={setIsReversed}
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
