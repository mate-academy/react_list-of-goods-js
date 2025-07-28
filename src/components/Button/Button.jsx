import { GoodsContext } from "../../App";
import { goodsFromServer } from "../../model/GoodsFromServer.model";
import { useContext, useState } from "react";

export const Button = ({button}) => {

    const {
            goods, 
            setGoods, 
            historyOrder, 
            setHistoryOrder,
            counterReset,
            setCounterReset
    } = useContext(GoodsContext);

    const btnControlReset = document.querySelector('.is-danger');
    const btnControlAlpha = document.querySelector('.is-info');
    const btnControlLength = document.querySelector('.is-success');

    const removeIsLight = (target) => {
        target.classList.remove('is-light');
    }

    const addIsLight = () => {
        let buttons = document.querySelectorAll('button');
        buttons.forEach((button) => button.classList.add('is-light'));
    }

    const handleOrderByAlpha = (event) => {

        addIsLight();
        removeIsLight(event.target);

        setGoods(
            [...goods].sort((good1, good2) => {
                return good1.localeCompare(good2);
            })
        )

        setHistoryOrder([...historyOrder, 'alpha']);
    
    }

    const handleOrderByLength = (event) => {

        addIsLight();
        removeIsLight(event.target);

        setGoods(
            [...goods].sort((good1, good2) => {
                return good1.length - good2.length;
            })
        )

        setHistoryOrder([...historyOrder, 'length']);

    }

    const handleOrderReset = (event) => {
        addIsLight();
        setGoods(goodsFromServer);
    }

    const handleOrderByReverse = (event) => {
        
        if(counterReset > 1) {
            setCounterReset(0);
        }

        switch(historyOrder[historyOrder.length - 2]) {
            case 'alpha':
                setCounterReset(counterReset + 1)
                handleOrderByAlpha(event);
                return btnControlAlpha.classList.remove('is-light');
            case 'length':
                setCounterReset(counterReset + 1);
                handleOrderByLength(event);
                return btnControlLength.classList.remove('is-light');
        }
            
    }

    return(
        <>
            {
                (() => {

                    switch(button.textContent) {
                        case 'Sort alphabetically':
                            return(
                                <button
                                    onClick={(event) => handleOrderByAlpha(event)}
                                    className={button.className}
                                >
                                    {button.textContent}
                                </button>
                            )
                        case 'Sort by lenght':
                            return(
                                <button
                                    onClick={(event) => handleOrderByLength(event)}
                                    className={button.className}
                                >
                                    {button.textContent}
                                </button>
                            )
                        case 'Reverse':
                            return(
                                <button
                                    onClick={(event) => handleOrderByReverse(event)}
                                    className={button.className}
                                >
                                    {button.textContent}
                                </button>
                            )
                        case 'Reset': 
                            if(goods !== goodsFromServer) {
                                return(
                                    <button
                                    onClick={(event) => handleOrderReset(event)}
                                    className={button.className}
                                     >
                                        {button.textContent}
                                    </button>
                                )
                            }
                            //TO DO: Concretizar lógica de comparação diferencial entre goods original e goods atual
                    } 
                    
                })()
            
            
            }
        </>
    )
}