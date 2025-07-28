import 'bulma/css/bulma.css';
import './App.scss';
import { ButtonList } from './components/ButtonList/ButtonList';
import { useState, createContext } from 'react';
import { GoodList } from './components/GoodsList/GoodsList';
import { goodsFromServer } from './model/GoodsFromServer.model';

export const GoodsContext = createContext(); 

export const App = () => {
  
  const [goods, setGoods] = useState(goodsFromServer);
  const [historyOrder, setHistoryOrder] = useState([]);
  const [counterReset, setCounterReset] = useState(0);

  return(
    <GoodsContext.Provider 
      value={{
          goods, 
          setGoods, 
          historyOrder, 
          setHistoryOrder,
          counterReset,
          setCounterReset
      }}
    >    
    <>
      <div className="section content">
          <ButtonList />

          <GoodList />
      </div>
    </>
    </GoodsContext.Provider>
  )
};
