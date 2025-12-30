import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getFuturesData = async (req, res) => {
    try{
        const data = {};
        const response = await fetch(
            `https://api.stock.naver.com/futures/nation/USA`
        );
        const result = await response.json()
        const SNP = result.find((i) => i.reutersCode === 'EScv1');
        
        data['futures'] = Number(SNP.closePrice);
        data['futuresPoint'] = Number(SNP.fluctuationsRatio);

        // API 응답
        res.status(200).json(data);

    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch futures data" });
    }
}