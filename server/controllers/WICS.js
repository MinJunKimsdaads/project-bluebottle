import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getWICSData = async (req, res) => {
    try{
        const code = req.query.code || null;
        if(!code) res.status(500).json({ error: "empty code" });   
        const data = {
            WICS:null
        };

        const response = await fetch(
            `https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=${code}`
        );
        // const arrayBuffer = await response.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);
        // const html = buffer.toString('binary');
        // const decoded = iconv.decode(Buffer.from(html, 'binary'), 'EUC-KR');
        // const $ = cheerio.load(decoded);

        const text = await response.text(); // 이미 디코딩되어 있을 수 있음
        const $ = cheerio.load(text);

        $(".td0101").each((_, el)=>{
            const dt = $(el).find(".line-left");
            const WICS = $(dt[2]).text().trim().replace("WICS : ","");
            data['WICS'] = WICS;
        })

        // API 응답
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.status(200).json(data);
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch KOSPI 200 data" });
    }
}