import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getKospiSectorData = async (req,res) => {
    try{
        let data = [];
        const response = await fetch(
            `https://finance.naver.com/sise/sise_group.naver?type=upjong`
        );
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const html = iconv.decode(buffer, "EUC-KR");

        const $ = cheerio.load(html);
        
        $('#contentarea_left').each((_,el)=>{
            const tbody = $(el).find("tbody");
            const tr = $(tbody[0]).find('tr');
            for(let i=0;i<tr.length;i++){
                const span = $(tr[i]).find('.p11');
                if(span.text()){
                    data = [
                        ...data,
                        {
                            name: $(tr[i]).find('a').text().trim(),
                            value: Number(span.text().trim().replace('%','')),
                        }
                    ]
                }
            }
        })
        res.status(200).json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to fetch kospi sector data" });
    }
}