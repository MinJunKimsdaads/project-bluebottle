//등락률에 따른 필터링
export const getDataFilteredUpRate = (list,upRate,downRate) => {
    return list.filter((i)=>{
        const late = Number(i.rate);
        return late >= downRate && late <= upRate;
    })
}

//매출, 영업익에 따른 필터링
export const getDataFilteredSales = async (list) => {
    try{
       const result = [];
       await Promise.all(
        list.map(async (i) => {
            const code = i.code;
            await fetch(`http://localhost:4002/api/sales/search?code=${code}`).then((result)=>{
                return result.json();
            }).then((data)=>{
                if(data.lastSales && data.lastProfit){
                    const lastSales = Number(data.lastSales);
                    const lastProfit = Number(data.lastProfit);
                    if(lastProfit > 0 && lastSales > 0){
                        result.push({
                            ...i,
                            trading:data.trading,
                        });
                    }
                }
            });
        })
       ) 
       return result;
    }catch(e){
        console.error(e);
    }
}

//5일 지표 데이터
export const get5DaysData = async (list) => {
    try{
       const result = [];
       await Promise.all(
        list.map(async (i) => {
            const code = i.code;
            await fetch(`http://localhost:4002/api/indicator/search?code=${code}`).then((result)=>{
                return result.json();
            }).then((data)=>{
                const newData = {
                    ...i,
                    indicator:data,
                }
                result.push(newData);
            });
        })
       ) 
       return result;
    }catch(e){
        console.error(e);
    }
}

//거래대금 추세 계산
const calValueScore = (data) => {
    const values = data.map(d => Number(d.close) * Number(d.amount));
    const latestValue = values[0];
    const avgValue = values.reduce((a,b)=> a+b,0) / values.length;
    
    const ratio = latestValue / avgValue;

    let score = 0;
    if (ratio >= 1.5) score = 30;
    else if (ratio >= 1.0) score = 15;
    return {ratio, score};
}

//거래량 추세 계산
const calcAmountScore = (data) => {
  const volumes = data.map(d => Number(d.amount));
  const latestVolume = volumes[0]; // 최신 거래량
  const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

  const ratio = latestVolume / avgVolume;

  let score = 0;
  if (ratio >= 1.5) score = 30;
  else if (ratio >= 1.0) score = 15;

  return { ratio, score };
}
//변동성 점수 계산
const calcVolatilityScore = (data) => {
  const closes = data.map(d => Number(d.close));

  // 일일 수익률 계산 (어제 대비 오늘)
  const returns = [];
  for (let i = 0; i < closes.length - 1; i++) {
    const r = (closes[i] - closes[i + 1]) / closes[i + 1];
    returns.push(r);
  }

  // 표준편차 계산
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + (b - mean) ** 2, 0) / returns.length;
  const stdev = Math.sqrt(variance);

  // 점수화 (예시: 상위 변동성 선호)
  let score = 0;
  if (stdev > 0.015) score = 20; // 1.5% 이상
  else if (stdev > 0.01) score = 10; // 1% 이상

  return { stdev, score };
}
//단기 추세 계산
const calcTrendScore = (data) => {
  const closes = data.map(d => Number(d.close));
  const latestClose = closes[0];
  const sma5 = closes.reduce((a, b) => a + b, 0) / closes.length;

  const diffRate = (latestClose - sma5) / sma5;

  let score = 0;
  if (diffRate >= 0) score = 20;
  else if (diffRate >= -0.01) score = 10; // -1%까지는 가산점

  return { diffRate, score };
}

//최근 5일 순매수 계산
const calcTradingScore = (data) => {
  let score = 0;
  let foreigner = 0;
  let organ = 0;
  data.forEach(i => {
    foreigner += Number(i.foreigner);
    organ += Number(i.organ);
  });

  if (foreigner > 0) score += 10;
  if (organ > 0) score += 10;

  return { foreigner, organ, score };
}

const calcSectorScore = (sector) => {
    let score = 0;
    if(Number(sector) > 0){
        score += 10;
    }
    return {score};
}


//최종 점수 합산
export const scoreStock = (data) => {
  return data.map((i)=>{
    const volume = calcAmountScore(i.indicator); //거래대금
    const volatility = calcVolatilityScore(i.indicator); //외국인/기관
    const trend = calcTrendScore(i.indicator); //단기 추세
    const value = calValueScore(i.indicator); //변동성
    const tradingSum = calcTradingScore(i.trading); //거래량
    const sector = calcSectorScore(i.sector);

    // 가중치 적용
    const total =
      (value.score / 30) * 30 +          // 거래대금: 30점 만점
      (tradingSum.score / 20) * 30 +     // 외국인/기관: 30점 만점
      (trend.score / 20) * 20 +          // 단기 추세: 20점 만점
      (volatility.score / 20) * 10 +     // 변동성: 10점 만점
      (volume.score / 30) * 10 +          // 거래량: 10점 만점
      (sector.score / 30) * 10;          // 동일업종 등락률: 10점 만점


      return {
        ...i,
        volume,
        volatility,
        value,
        trend,
        tradingSum,
        sector,
        total
    };
  })
}


export const getRankedData = (data,count) => {
    const sortedByScore = data.sort((a,b) => b.total - a.total);
    return sortedByScore.slice(0,count);
}


