import 'bulma/css/bulma.css';
import './App.scss';
import { useState, createContext } from 'react';
import { ButtonList } from './components/ButtonList/ButtonList';
import { GoodList } from './components/GoodsList/GoodsList';
import { goodsFromServer } from './model/GoodsFromServer.model';

export const GoodsContext = createContext();

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [historyOrder, setHistoryOrder] = useState([]);
  const [counterReset, setCounterReset] = useState(0);
  const [isLightAlpha, setIsLightAlpha] = useState(true);
  const [isLightLength, setIsLightLength] = useState(true);
  const [isLightReverse, setIsLightReverse] = useState(true);

  return (
    <GoodsContext.Provider
      value={{
        goods,
        setGoods,
        historyOrder,
        setHistoryOrder,
        counterReset,
        setCounterReset,
        isLightAlpha,
        isLightLength,
        isLightReverse,
        setIsLightAlpha,
        setIsLightLength,
        setIsLightReverse,
      }}
    >
      <>
        <div className="section content">
          <ButtonList />

          <GoodList />
        </div>
      </>
    </GoodsContext.Provider>
  );
};
