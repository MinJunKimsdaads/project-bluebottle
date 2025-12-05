import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getSalesData = async (req, res) => {
  try {
    const code = req.query.code || null;
    if(!code) res.status(500).json({ error: "empty code" });   
    const data = {
      trading:[]
    };

    const response = await fetch(
        `https://finance.naver.com/item/main.naver?code=${code}`
    );
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const html = iconv.decode(buffer, "EUC-KR");

    const $ = cheerio.load(html);

    $(".tab_con1").each((_, el)=>{
        const grays = $(el).find(".gray");
        const trs = $(grays[1]).find('tr');
        const em = $(trs[1]).find('td').find('em');
        const sector = em.text().replace(/\s+/g, "").replace(/,/g, "").replace("%", "");
        data['sector'] = sector;
    })

    $(".invest_trend .right tbody").each((_, el)=>{
        const trs = $(el).find("tr");
        for(let i=1;i<=5;i++){
            const tds = $(trs[i]).find("td");
            const list = {
                foreigner:$(tds[2]).find('em').text().replace(/\s+/g, "").replace(/,/g, ""),
                organ:$(tds[3]).find('em').text().replace(/\s+/g, "").replace(/,/g, ""),
            }
            data['trading'].push(list)
        }
    })

    $(".cop_analysis .sub_section tbody").each((_, el)=>{
        const trs = $(el).find("tr");
        const lastSales = $(trs[0]).find('.last').text().replace(/\s+/g, "").replace(/,/g, "") ?? 0;
        const lastProfit = $(trs[1]).find('.last').text().replace(/\s+/g, "").replace(/,/g, "") ?? 0;

        // data.push({ lastSales, lastProfit});
        data['lastSales'] = lastSales;
        data['lastProfit'] = lastProfit;
    })
    // API 응답
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch KOSPI 200 data" });
  }
};