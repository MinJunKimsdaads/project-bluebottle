import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getKospi200Data = async (req, res) => {
  try {
    const data = [];

    // 1~20페이지 배열 생성
    const pages = Array.from({ length: 20 }, (_, i) => i + 1);

    // 병렬 처리
    await Promise.all(
      pages.map(async (page) => {
        const response = await fetch(
          `https://finance.naver.com/sise/entryJongmok.naver?order=change_rate&isRightDirection=false&page=${page}`
        );
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const html = iconv.decode(buffer, "EUC-KR");

        const $ = cheerio.load(html);

        $(".type_1 tbody tr").each((_, el) => {
          const tds = $(el).find("td");
          if (tds.length > 2) {
            const link = $(tds[0]).find("a");
            const name = link.text().trim();
            const href = link.attr("href") ?? "";

            const price = $(tds[1]).text().trim();
            const rate = $(tds[3]).find("span").text().trim().replace("%", "");
            const amount = $(tds[4]).text().trim();

            // href에서 코드 추출
            const codeMatch = href.match(/code=([0-9]+)/);
            const code = codeMatch ? codeMatch[1] : null;

            if (code) {
              data.push({ code, name, price, rate, amount });
            }
          }
        });
      })
    );
    // API 응답
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch KOSPI 200 data" });
  }
};