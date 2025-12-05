import axios from "axios";

//코스피 200
export const getKospi200Data = async () => {
    try{
        const data = await axios(`${SERVER_URL}${KOSPI200_URL}`);
        console.log(data);
    }catch(e){
        console.error(e);
    }
}

//매출영업이익
export const getSalesData = async (code) => {
    try{
        const data = await axios(`${SERVER_URL}${SALES_URL}?code=${code}`);
        console.log(data);
    }catch(e){
        console.error(e);
    }
}

//5일 지표 데이터
export const get5DaysData = async (code) => {
    try{
        const data = await axios(`${SERVER_URL}${DAYS_URL}?code=${code}`);
    }catch(e){
        console.error(e);
    }
}

//나스닥
export const getNasdaqData = async () => {
    try{
        const data = await axios(`${SERVER_URL}${NASDAQ_URL}`);
    }catch(e){
        console.error(e);
    }
}
//달러인덱스
//선물
//나스닥 섹터
//코스피 섹터