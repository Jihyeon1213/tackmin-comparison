import { chromium } from "@playwright/test";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5001" }));

const port = 5001;

const jsonParser = bodyParser.json();

app.post("/scrape_ups", jsonParser, async function scrapeUps(req, res) {

  const { countryCode, weight, length, height, width } = req.body
  const browser = await chromium.launch({ headless: false })

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://ems.epost.go.kr/front.EmsDeliveryDelivery01.postal#");

  await page.click(".btnChange");

  await page.selectOption("#nation", countryCode);

  await page.getByTitle("실중량").fill(weight)

  await page.getByTitle("가로").fill(width)

  await page.getByTitle("세로").fill(length)

  await page.getByTitle("높이").fill(height)

  await page.click("#cal_wgt");

  await page.getByText("조회하기").click();

  await page.waitForTimeout(50);

  const rate = await page.$eval("#spanPrc", el => el.textContent);

  res.send(rate);

  await browser.close();

})

app.listen(port)
