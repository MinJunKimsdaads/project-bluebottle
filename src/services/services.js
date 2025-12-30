//시장 환경 점수 (25점)
export const calMarketScore = (future,nasdaq,dollar) => {
    let futureScore = 0;
    let nasdaqScore = 0;
    let dollarScroe = 0;

    if(future >= 0.5){
        futureScore = 10;
    }else if(future >= 0.2 && future < 0.5){
        futureScore = 7;
    }else if(future >= -0.2 && future < 0.2){
        futureScore = 3;
    }else if(future <= -0.5){
        // futureScore = -10
    }

    if(nasdaq >= 0.6){
        nasdaqScore = 8;
    }else if(future >= 0.2 && future < 0.6){
        nasdaqScore = 5;
    }else if(future >= -0.2 && future < 0.2){
        nasdaqScore = 2;
    }else if(future <= -0.6){
        // nasdaqScore = -8
    }

    if(dollar <= -0.4){
        dollarScroe = 7;
    }else if(dollar >= -0.1 && dollar <= 0.1){
        dollarScroe = 3;
    }else if(dollar >= 0.4){
        // dollarScroe = -7;
    }

    return futureScore + nasdaqScore + dollarScroe;
}
//섹터 모멘텀 (15점)
export const calSectorScore = (sector) => {
    let sectorScore = 0;
    if(sector >= 1.5){
        sectorScore = 15
    }else if(sector >= 0.7 && sector < 1.5){
        sectorScore = 10
    }else if(sector >= 0.2 && sector < 0.7){
        sectorScore = 5
    }else if(sector <= -0.5){
        // sectorScore = -10
    }
    return sectorScore;
}
//종목 가격 위치 (15점)
export const calPricePosition = (daysData) => {
    let pricePositionScore = 0;
    const threeDayHigh = Math.max(Number(daysData[0].high), Number(daysData[1].high), Number(daysData[2].high));
    const threeDayLow  = Math.min(Number(daysData[0].low), Number(daysData[1].low), Number(daysData[2].low));
    const pricePosition = (Number(daysData[0].close) - threeDayLow) / (threeDayHigh - threeDayLow);

    if(Number(daysData[0].close) > Number(daysData[1].high) && Number(daysData[0].close) > Number(daysData[2].high)){
        pricePositionScore = 15;
    }else if(pricePosition >= 0.8){
        pricePositionScore = 10;
    }else if(pricePosition >= 0.4 && pricePosition < 0.8){
        pricePositionScore = 5;
    }else if(pricePosition < 0.4){
        // pricePositionScore = -5;
    }

    return pricePositionScore;
}
//추세 (20점)
export const calUpCount = (daysData) => {
    let upCountScore = 0;
    let closeStrengthScore = 0;

    if(Number(daysData[0].close) > Number(daysData[1].close) && Number(daysData[0].close) > Number(daysData[2].close) && Number(daysData[1].close) > Number(daysData[2].close)){
        upCountScore = 10;
    }else if(Number(daysData[0].close) > Number(daysData[1].close) || Number(daysData[0].close) > Number(daysData[2].close)){
        upCountScore = 6;
    }else{
        // upCountScore = -5;
    }

    const closeStrength = (Number(daysData[0].close) - Number(daysData[0].low)) / (Number(daysData[0].high) - Number(daysData[0].low));

    if(closeStrength >= 0.8){
        closeStrengthScore = 10;
    }else if(closeStrength >= 0.6 && closeStrength < 0.8){
        closeStrengthScore = 7;
    }else if(closeStrength >= 0.4 && closeStrength < 0.6){
        closeStrengthScore = 3;
    }else{
        // closeStrengthScore = -5;
    }

    return upCountScore + closeStrengthScore;
}
//거래량 (10점)
export const calAmount = (daysData) => {
    let amountScore = 0;
    const avgAmount = (Number(daysData[0].amount) + Number(daysData[1].amount) + Number(daysData[2].amount)) / 3;
    const amountRatio = Number(daysData[0].amount) / avgAmount;

    if(amountRatio >= 1.8){
        amountScore = 10;
    }else if(amountRatio >= 1.4){
        amountScore = 7;
    }else if(amountRatio >= 1.0){
        amountScore = 3;
    }else if(amountRatio < 0.7){
        // amountScore = -5;  
    };
    return amountScore;
}
//수급 (15점)
export const calTrading = (trading) => {
    let score = 0;

    let bothBuyDays = 0;
    let bothSellDays = 0;

    for (let i = 0; i < 3; i++) {
        const foreigner = Number(trading[i].foreigner);
        const organ = Number(trading[i].organ);

        if (foreigner > 0 && organ > 0) bothBuyDays++;
        if (foreigner < 0 && organ < 0) bothSellDays++;
    }

    // 🔥 동시 순매수
    if (bothBuyDays === 3) score = 15;
    else if (bothBuyDays === 2) score = 10;
    else if (bothBuyDays === 1) score = 5;

    // ❌ 동시 순매도 (강한 패널티)
    // if (bothSellDays === 3) score = -10;
    // else if (bothSellDays >= 2) score = -5;

    // 🚫 개인만 매수 (외인·기관 지속 매도)
    const allForeignSell = trading.every(t => Number(t.foreigner) < 0);
    const allOrganSell = trading.every(t => Number(t.organ) < 0);

    // if (allForeignSell && allOrganSell) {
    //     score = -10;
    // }

    return score;
}

//환산
export const calRadarScore = (score,originScore) => {
    return score / originScore * 100;
}

