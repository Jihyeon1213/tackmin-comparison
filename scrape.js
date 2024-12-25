import { chromium } from "@playwright/test";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors({
  origin: "https://minjock-of-taeckbae.vercel.app",
}));

const port = 5000;
const jsonParser = bodyParser.json();

const countryName = {
  "US": "미국",
  "JP": "일본",
  "CN": "중국",
  "HK": "홍콩",
  "TW": "대만",
  "VN": "베트남",
  "TH": "태국",
  "SG": "싱가포르",
  "MY": "말레이시아",
  "ID": "인도네시아",
  "PH": "필리핀",
  "IN": "인도",
  "AU": "호주"
};

const rates = {};

app.post("/scrape", jsonParser, async function scrapeDhlSf(req, res) {
  let browser;
  try {
    const { countryCode, weight } = req.body;
    const fixedWeight = weight.toFixed(1);

    if (!countryName[countryCode]) {
      res.send({ DHL: "0", SF: "0" });
      return;
    }
    browser = await chromium.launch({
      headless: true
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    for (const carrier of ["DHL", "SF"]) {
      await page.goto("https://www.cvsnet.co.kr/service/international-delivery/user/contentsid/170/index.do", {
        waitUntil: 'networkidle'
      });

      await page.waitForTimeout(200);

      await page.waitForSelector('#selectType:not([disabled])');
      await page.waitForSelector('#selectNation:not([disabled])');

      await page.selectOption("#selectType", carrier);
      await page.selectOption("#selectNation", countryName[countryCode]);
      await page.selectOption("#selectGubun", "비서류");
      await page.selectOption("#selectWeight", fixedWeight);

      await page.waitForTimeout(200);

      await page.waitForSelector("#spanPrice");
      rates[carrier] = await page.$eval("#spanPrice", (el) => el.textContent);
    }

    res.send(rates);
  } catch (error) {
    console.error('크롤링 에러:', error);
    res.status(500).send({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
