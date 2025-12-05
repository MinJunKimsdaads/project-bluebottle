import { useEffect, useState } from "react";
import { get5DaysData, getDataFilteredSales, getDataFilteredUpRate, getRankedData, scoreStock } from "../services/services.js";

const Kospi200 = () => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const fetchData = async () => {
            await fetch('http://localhost:4002/api/kospi200/all').then((result)=>{
                return result.json();
            }).then(async (list)=>{
                const filteredUpRate = getDataFilteredUpRate(list,2.0,-2.0);
                const filteredSales = await getDataFilteredSales(filteredUpRate);
                const addedIndicator = await get5DaysData(filteredSales);
                const addedScoredData = scoreStock(addedIndicator);
                const rankedData = getRankedData(addedScoredData,1000);
                setList(rankedData);
                setIsLoading(false);
            });
        }

        fetchData();
    },[])
    return(
        <>
            {
                isLoading ? <div>계산 중</div>:<div>
                    {list.map((i,idx)=>{
                        return (
                            <div key={i.code} style={{marginBottom:'15px'}}>
                                <div>{idx+1}.</div>
                                <div>
                                    <span>종목명: </span>
                                    <span>{i.name}</span>
                                </div>
                                <div>
                                    <span>가격: </span>
                                    <span>{i.price}</span>
                                </div>
                                <div>
                                    <span>점수: </span>
                                    <span>{i.total}</span>
                                </div>

                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Kospi200;