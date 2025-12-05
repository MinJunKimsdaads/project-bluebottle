import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getNasdaqData = async (req, res) => {
    try{
        const data = {};
        const response = await fetch(
            `https://finance.naver.com/world/sise.naver?symbol=NAS@IXIC&fdtc=0`
        );
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const html = iconv.decode(buffer, "EUC-KR");
    
        const $ = cheerio.load(html);

        $('.tb_status2_t2 tbody').each((_, el)=>{
            const tr = $(el).find("tr");

            const before = $(tr[1]).find('.tb_td2').find('span');
            const after = $(tr[0]).find('.tb_td2').find('span');
            const beforeVal = $(before).text().replace(",", "");
            const afterVal = $(after).text().replace(",", "");
            const rate = (Number(afterVal) - Number(beforeVal)) / Number(beforeVal) * 100;

            data['nasdaq'] = afterVal;
            data['nasdaqPoint'] = rate;
        });

        // API 응답
        res.status(200).json(data);
        

    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch nasdaq data" });
    }
}