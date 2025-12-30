import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getDollarIndexData = async (req, res) => {
    try{
        const data = {};
        const response = await fetch(
            `https://finance.naver.com/marketindex/`
        );
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const html = iconv.decode(buffer, "EUC-KR");

        const $ = cheerio.load(html);

        $('#worldExchangeList').each((_,el)=>{
            const li = $(el).find("li");

            const value = $(li[3]).find('.head_info').find('.value').text();

            const change = $(li[3]).find('.head_info').find('.blind').text() === '상승' ? Number($(li[3]).find('.head_info').find('.change').text()) : -1*Number($(li[3]).find('.head_info').find('.change').text());

            data['dollarIndex'] = value;
            data['dollarIndexPoint'] = change;
        })

        // API 응답
        res.status(200).json(data);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to fetch dollarIndex data" });
    }
}