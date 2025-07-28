import { useContext } from "react"
import { Good } from "../Good/Good"
import { GoodsContext } from "../../App"

export const GoodList = () => {

    const {goods} = useContext(GoodsContext);
    
    return(
        <>
            <ul>
                {
                    goods.map((good) => {
                        return <Good key={good} good={good} />
                    })
                }
            </ul>
        </>
    )
}