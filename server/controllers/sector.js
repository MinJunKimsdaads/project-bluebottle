import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export const getKospiSectorData = async (req,res) => {
    try{

    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to fetch kospi sector data" });
    }
}

export const getNasdaqSectorData = async (req, res) => {
    try{

    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to fetch nasdaq sector data" });
    }
}