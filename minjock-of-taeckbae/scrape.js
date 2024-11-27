import { chromium } from "@playwright/test";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
const port = 5000

const jsonParser = bodyParser.json();

const countryName = {
  "GR": "그리스",
  "NG": "나이지리아",
  "NL": "네덜란드",
  "NP": "네팔",
  "NO": "노르웨이",
  "NZ": "뉴질랜드",
  "DK": "덴마크",
  "DO": "도미니카공화국",
  "DE": "독일",
  "LA": "라오스",
  "LV": "라트비아",
  "RU": "러시아",
  "RO": "루마니아",
  "LU": "룩셈부르크",
  "LT": "리투아니아",
  "MO": "마카오(중국)",
  "MY": "말레이시아",
  "MX": "멕시코",
  "MA": "모로코",
  "MU": "모리셔스",
  "MZ": "모잠비크",
  "MD": "몰도바",
  "MV": "몰디브",
  "MN": "몽골",
  "US": "미국",
  "MM": "미얀마",
  "BH": "바레인",
  "BD": "방글라데시",
  "VN": "베트남",
  "BE": "벨기에",
  "BY": "벨라루스",
  "BA": "보스니아헤르체코비나",
  "BT": "부탄",
  "MK": "북마케도니아",
  "BG": "불가리아",
  "BR": "브라질",
  "BN": "브루네이(브루나이)",
  "SA": "사우디아라비아",
  "CY": "사이프러스",
  "LK": "스리랑카",
  "SE": "스웨덴",
  "CH": "스위스",
  "ES": "스페인",
  "SK": "슬로바키아",
  "SI": "슬로베니아",
  "SG": "싱가포르",
  "AE": "아랍에미리트연합국",
  "AM": "아르메니아",
  "AR": "아르헨티나",
  "IE": "아일랜드",
  "AZ": "아제르바이잔",
  "AL": "알바니아",
  "DZ": "알제리",
  "EE": "에스토니아",
  "EC": "에콰도르",
  "ET": "에티오피아",
  "GB": "영국",
  "OM": "오만",
  "AT": "오스트리아",
  "JI": "요르단",
  "UZ": "우즈베키스탄",
  "UA": "우크라이나",
  "EG": "이집트",
  "IN": "인도",
  "ID": "인도네시아",
  "JP": "일본",
  "ZM": "잠비아",
  "GE": "조지아",
  "CN": "중국",
  "DJ": "지부티",
  "CZ": "체코",
  "CL": "칠레",
  "KZ": "카자흐스탄",
  "QA": "카타르",
  "KH": "캄보디아",
  "CA": "캐나다",
  "KE": "케냐",
  "CR": "코스타리카",
  "CU": "쿠바",
  "HR": "크로아티아",
  "TH": "타이(태국)",
  "TW": "타이완(대만)",
  "TZ": "탄자니아",
  "TN": "튀니지",
  "TR": "튀르키예",
  "PA": "파나마",
  "PK": "파키스탄",
  "PE": "페루",
  "PT": "포르투갈",
  "PL": "폴란드",
  "FR": "프랑스",
  "FJ": "피지",
  "FI": "핀란드",
  "PH": "필리핀",
  "HU": "헝가리",
  "AU": "호주(오스트레일리아)",
  "HK": "홍콩(중국)"
}

const rates = {};

app.post("/scrape", jsonParser, async function scrapeDhlSf(req, res) {
  const { countryCode, weight } = req.body
  const fixedWeight = weight.toFixed(1);
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  const page = await context.newPage();

  for (const carrier of ["DHL", "SF"]) {

    await page.goto("https://www.cvsnet.co.kr/service/international-delivery/user/contentsid/170/index.do");

    await page.selectOption("#selectType", carrier);

    await page.selectOption("#selectNation", countryName[countryCode]);

    await page.selectOption("#selectGubun", "비서류");

    await page.selectOption("#selectWeight", fixedWeight);

    await page.waitForTimeout(50);

    rates[carrier] = await page.$eval("#spanPrice", (el) => el.textContent);
  }

  res.send(rates)
  await browser.close();
})

app.listen(port)
