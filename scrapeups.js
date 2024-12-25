import { chromium } from "@playwright/test";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors({
  origin: "https://minjock-of-taeckbae.vercel.app",
}));

const port = 5002;

const jsonParser = bodyParser.json();

app.post("/scrape_ups", jsonParser, async function scrapeUps(req, res) {
  let browser;
  try {
    const { countryCode, weight, length, height, width } = req.body;

    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://ems.epost.go.kr/front.EmsDeliveryDelivery01.postal#", { waitUntil: 'networkidle' });

    await page.waitForSelector(".btnChange", { timeout: 10000 });
    await page.click(".btnChange");
    await page.waitForTimeout(1000);

    await page.waitForSelector("#nation", { timeout: 10000 });
    await page.selectOption("#nation", countryCode);
    await page.waitForTimeout(1000);

    await page.waitForSelector('[title="실중량"]', { timeout: 10000 });
    await page.getByTitle("실중량").fill(weight);
    await page.waitForTimeout(1000);

    await page.waitForSelector('[title="가로"]', { timeout: 10000 });
    await page.getByTitle("가로").fill(width);
    await page.waitForSelector('[title="세로"]', { timeout: 10000 });
    await page.getByTitle("세로").fill(length);
    await page.waitForSelector('[title="높이"]', { timeout: 10000 });
    await page.getByTitle("높이").fill(height);
    await page.waitForTimeout(1000);

    await page.waitForSelector("#cal_wgt", { timeout: 10000 });
    await page.click("#cal_wgt");
    await page.waitForTimeout(3000);

    await page.waitForSelector('text="조회하기"', { timeout: 10000 });
    await page.getByText("조회하기").click();
    await page.waitForTimeout(1000);

    await page.waitForSelector("#spanPrc", { timeout: 30000 });

    const rate = await page.$eval("#spanPrc", el => el.textContent);
    res.send(rate);
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
