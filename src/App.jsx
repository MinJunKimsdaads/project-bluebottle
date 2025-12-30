import { useEffect, useState } from 'react';
import './App.css';
import Grid from './components/common/Grid.jsx';
import Header from './components/common/Header.jsx';
import ScoreDetailRadar from './components/scoreDetail/ScoreDetailRadar.jsx';
import ScoreTable from './components/scoreTable/ScoreTable.jsx';
import SectorBox from './components/sector/SectorBox.jsx';
import IndicatorBox from './components/indicator/IndicatorBox.jsx';
import { get5DaysData, getDollarIndex, getFuturesData, getKospi200Data, getKospiSectorData, getNasdaqData, getSalesData, getWICSData } from './services/api.js';
import {calMarketScore, calSectorScore, calPricePosition, calUpCount, calAmount, calTrading} from './services/services.js';
import Loader from './components/common/Loader.jsx';
function App() {
  const [nasdaq, setNasdaq] = useState(null);
  const [dollarIndex, setDollarIndex] = useState(null);
  const [futures, setFutures] = useState(null);
  const [sector, setSector]  = useState([]);
  const [kospi, setKospi] = useState([]);
  const [calKospi, setCalKospi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  useEffect(()=>{
    start();
  },[]);
  useEffect(()=>{
    if(!nasdaq || !dollarIndex || !futures || !sector.length || !kospi.length) return;

    const marketScore = calMarketScore(futures,nasdaq,dollarIndex);

    const calKospi = kospi.map((i) => {
      // const matchedSector = sector.find((t) => t.name === i.WICS);
      // const sectorScore = calSectorScore(matchedSector?.value);
      const sectorScore = calSectorScore(i.sector);
      const pricePositionScore = calPricePosition(i.daysData);
      const upCountScore = calUpCount(i.daysData);
      const amountScore = calAmount(i.daysData);
      const tradingScore = calTrading(i.trading);

      const totalScore = marketScore + sectorScore + pricePositionScore + upCountScore + amountScore + tradingScore;
      return{
        ...i,
        marketScore: marketScore,
        sectorScore: sectorScore,
        pricePositionScore: pricePositionScore,
        upCountScore: upCountScore,
        amountScore: amountScore,
        tradingScore: tradingScore,
        totalScore: totalScore,
      }
    });
    setCalKospi(calKospi.sort((a, b) => b.totalScore - a.totalScore).slice(0, 5));
  },[kospi,nasdaq,dollarIndex,futures,sector]);

  const start = async () => {
    let nasdaq = null;
    let dollarIndex = null;
    let futures = null;
    let sector = [];
    let kospi = [];

    const nasdaqData = await getNasdaqData();
    const dollarIndexData = await getDollarIndex();
    const futuresData = await getFuturesData();
    const sectorData = await getKospiSectorData();
    const kospiData = await getKospi200Data();

    if(nasdaqData?.data?.nasdaqPoint){
      nasdaq = nasdaqData?.data?.nasdaqPoint.toFixed(2);
    }

    if(dollarIndexData?.data?.dollarIndexPoint){
      dollarIndex = dollarIndexData?.data?.dollarIndexPoint.toFixed(2);
    }

    if(futuresData?.data?.futuresPoint){
      futures = futuresData?.data?.futuresPoint.toFixed(2);
    }

    if(sectorData?.data && sectorData?.data.length > 0){
        sector = sectorData?.data;
    }

    if(kospiData?.data){
      kospi = kospiData?.data;
    }

    kospi = await Promise.all(
      kospi.map( async (i) =>{
        const sales = await getSalesData(i.code);
        const lastSales = Number(sales?.data?.lastSales);
        const lastProfit = Number(sales?.data?.lastProfit);
        const sector = Number(sales?.data?.sector);
        const daysData = await get5DaysData(i.code);
        const WICS = await getWICSData(i.code);
        return{
          ...i,
          lastSales: lastSales ? lastSales : null,
          lastProfit: lastProfit ? lastProfit : null,
          daysData: daysData?.data ? daysData?.data : [],
          WICS: WICS?.data?.WICS ? WICS?.data?.WICS : '',
          trading: sales?.data?.trading ? sales?.data?.trading : [],
          sector: sector,
        }
      })
    );
    setNasdaq(nasdaq);
    setDollarIndex(dollarIndex);
    setFutures(futures);
    setSector(sector);
    setKospi(kospi);

    await loadingHandler(isLoading);
  }

  const loadingHandler = async (isLoading) => {
    setIsLoading(!isLoading);
    setDetail([]);
  }
  return (
    <>
      <div className="App">
        {isLoading && (
          <Loader />
        )}
        <div className="container">
          <Header />
        </div>
        <Grid>
          <div style={{backgroundColor:"#ffffff",borderRadius: '16px',boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',padding: '18px 24px',display:'flex',gap:"0 24px"}}>
            <IndicatorBox name={'나스닥'} value={nasdaq}/>
            <IndicatorBox name={'달러인덱스'} value={dollarIndex}/>
            <IndicatorBox name={'선물'} value={futures}/>
          </div>
        </Grid>
        <Grid>
          <>
            <ScoreTable data={calKospi} setDetail={setDetail}/>
            {detail.length ? (
              <ScoreDetailRadar data={detail}/>
            ):null}
          </>
        </Grid>
        <Grid>
          <>
            <SectorBox title="코스피 섹터" data={sector} columns={8} />
          </>
        </Grid>
      </div>
    </>
  );
}

export default App
