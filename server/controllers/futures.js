import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getFuturesData = async (req, res) => {
    try{
        const data = {};
        const response = await fetch(
            `https://finance.naver.com/world/sise.naver?symbol=NAS@IXIC&fdtc=0`
        );
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const html = iconv.decode(buffer, "EUC-KR");
    
        const $ = cheerio.load(html);

    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch futures data" });
    }
}