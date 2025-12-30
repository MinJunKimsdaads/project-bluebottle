import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const get5DaysData = async (req, res) => {
  try {
    const code = req.query.code || null;
    if(!code) res.status(500).json({ error: "empty code" });   
    const list = [];

    const response = await fetch(
        `https://finance.naver.com/item/sise_day.naver?code=${code}`,
        {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0 Safari/537.36",
                "Referer": "https://finance.naver.com/",   // 필요시 추가
                "Accept-Language": "ko,en;q=0.9"           // 한국어 페이지 강제
            }
        }
    );
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const html = iconv.decode(buffer, "EUC-KR");

    const $ = cheerio.load(html);

    $(".type2").each((_, el)=>{
        const trs = $(el).find("tr");
        for(let i=2;i<5;i++){
            const tds = $(trs[i]).find("td");
            const data = {
                close:$(tds[1]).find('span').text().replace(/\s+/g, "").replace(/,/g, ""),
                high:$(tds[4]).find('span').text().replace(/\s+/g, "").replace(/,/g, ""),
                low:$(tds[5]).find('span').text().replace(/\s+/g, "").replace(/,/g, ""),
                amount:$(tds[6]).find('span').text().replace(/\s+/g, "").replace(/,/g, ""),
            }
            list.push(data)
        }
    })
    // API 응답
    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch KOSPI 200 data" });
  }
};