import axios from "axios";
import { DAYS_URL, DOLLALINDEX_URL, FUTURES_URL, KOSPI200_URL, NASDAQ_URL, SALES_URL, SECTOR_URL, SERVER_URL, WICS_URL } from "./constant.js";


//코스피 200
export const getKospi200Data = async () => {
    try{
        const data = await axios(`${SERVER_URL}${KOSPI200_URL}`);
        return data;
    }catch(e){
        console.error(e);
    }
}

//매출영업이익
export const getSalesData = async (code) => {
    try{
        const data = await axios(`${SERVER_URL}${SALES_URL}?code=${code}`);
        return data;
    }catch(e){
        console.error(e);
    }
}

//3일 지표 데이터
export const get5DaysData = async (code) => {
    try{
        const data = await axios(`${SERVER_URL}${DAYS_URL}?code=${code}`);
        return data;
    }catch(e){
        console.error(e);
    }
}

//나스닥
export const getNasdaqData = async () => {
    try{
        const data = await axios(`${SERVER_URL}${NASDAQ_URL}`);
        return data;
    }catch(e){
        console.error(e);
    }
}
//달러인덱스
export const getDollarIndex = async () => {
    try{
        const data = await axios(`${SERVER_URL}${DOLLALINDEX_URL}`);
        return data;
    }catch(e){
        console.log(e);
    }
}
//선물
export const getFuturesData = async () => {
    try{
        const data = await axios(`${SERVER_URL}${FUTURES_URL}`);
        return data;
    }catch(e){
        console.log(e);
    }
}
//코스피 섹터
export const getKospiSectorData = async () => {
        try{
        const data = await axios(`${SERVER_URL}${SECTOR_URL}`);
        return data;
    }catch(e){
        console.log(e);
    }
}

//WISC
export const getWICSData = async (code) => {
    try{
        const data = await axios(`${SERVER_URL}${WICS_URL}?code=${code}`);
        return data;
    }catch(e){
        console.error(e);
    }
}