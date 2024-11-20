const countryList = [
  { value: "GR", label: "그리스 GREECE" },
  { value: "NG", label: "나이지리아 NIGERIA" },
  { value: "NL", label: "네덜란드 NETHERLANDS" },
  { value: "NP", label: "네팔 NEPAL" },
  { value: "NO", label: "노르웨이 NORWAY" },
  { value: "NZ", label: "뉴질랜드 NEW ZEALAND" },
  { value: "DK", label: "덴마크 DENMARK" },
  { value: "DO", label: "도미니카공화국 DOMINICAN REPUBLIC" },
  { value: "DE", label: "독일 GERMANY" },
  { value: "LA", label: "라오스 LAO PEOPLE'S DEM REP" },
  { value: "LV", label: "라트비아 LATVIA" },
  { value: "RU", label: "러시아 RUSSIAN FEDERATION" },
  { value: "RO", label: "루마니아 ROMANIA" },
  { value: "LU", label: "룩셈부르크 LUXEMBOURG" },
  { value: "LT", label: "리투아니아 LITHUANIA" },
  { value: "MO", label: "마카오(중국) MACAO(CHINA)" },
  { value: "MY", label: "말레이시아 MALAYSIA" },
  { value: "MX", label: "멕시코 MEXICO" },
  { value: "MA", label: "모로코 MOROCCO" },
  { value: "MU", label: "모리셔스 MAURITIUS" },
  { value: "MZ", label: "모잠비크 MOZAMBIQUE" },
  { value: "MD", label: "몰도바 MOLDOVA" },
  { value: "MV", label: "몰디브 MALDIVES" },
  { value: "MN", label: "몽골 MONGOLIA" },
  { value: "US", label: "미국 U.S.A (United States of America)" },
  { value: "MM", label: "미얀마 MYANMAR" },
  { value: "BH", label: "바레인 BAHRAIN" },
  { value: "BD", label: "방글라데시 BANGLADESH" },
  { value: "VN", label: "베트남 VIET NAM" },
  { value: "BE", label: "벨기에 BELGIUM" },
  { value: "BY", label: "벨라루스 BELARUS" },
  { value: "BA", label: "보스니아헤르체코비나 Bosnia and Herzegovina" },
  { value: "BT", label: "부탄 BHUTAN" },
  { value: "MK", label: "북마케도니아 NORTH MACEDONIA" },
  { value: "BG", label: "불가리아 BULGARIA(REP)" },
  { value: "BR", label: "브라질 BRAZIL" },
  { value: "BN", label: "브루네이(브루나이) BRUNEI DARUSSALAM" },
  { value: "SA", label: "사우디아라비아 SAUDI ARABIA" },
  { value: "CY", label: "사이프러스 CYPRUS" },
  { value: "LK", label: "스리랑카 SRI LANKA" },
  { value: "SE", label: "스웨덴 SWEDEN" },
  { value: "CH", label: "스위스 SWITZERLAND" },
  { value: "ES", label: "스페인 SPAIN" },
  { value: "SK", label: "슬로바키아 SLOVAKIA" },
  { value: "SI", label: "슬로베니아 SLOVENIA" },
  { value: "SG", label: "싱가포르 SINGAPORE" },
  { value: "AE", label: "아랍에미리트연합국 UNITED ARAB EMIRATES" },
  { value: "AM", label: "아르메니아 ARMENIA" },
  { value: "AR", label: "아르헨티나 ARGENTINA" },
  { value: "IE", label: "아일랜드 IRELAND" },
  { value: "AZ", label: "아제르바이잔 AZERBAIJAN" },
  { value: "AL", label: "알바니아 ALBANIA" },
  { value: "DZ", label: "알제리 ALGERIA" },
  { value: "EE", label: "에스토니아 ESTONIA" },
  { value: "EC", label: "에콰도르 ECUADOR" },
  { value: "ET", label: "에티오피아 ETHIOPIA" },
  { value: "GB", label: "영국 UNITED KINGDOM" },
  { value: "OM", label: "오만 OMAN" },
  { value: "AT", label: "오스트리아 AUSTRIA" },
  { value: "JI", label: "요르단 JORDAN" },
  { value: "UZ", label: "우즈베키스탄 UZBEKISTAN" },
  { value: "UA", label: "우크라이나 UKRAINE" },
  { value: "EG", label: "이집트 EGYPT" },
  { value: "IN", label: "인도 INDIA" },
  { value: "ID", label: "인도네시아 INDONESIA" },
  { value: "JP", label: "일본 JAPAN" },
  { value: "ZM", label: "잠비아 ZAMBIA" },
  { value: "GE", label: "조지아 GEORGIA" },
  { value: "CN", label: "중국 CHINA" },
  { value: "DJ", label: "지부티 DJIBOUTI" },
  { value: "CZ", label: "체코 CZECH REP" },
  { value: "CL", label: "칠레 CHILE" },
  { value: "KZ", label: "카자흐스탄 KAZAKHSTAN" },
  { value: "QA", label: "카타르 QATAR" },
  { value: "KH", label: "캄보디아 CAMBODIA" },
  { value: "CA", label: "캐나다 CANADA" },
  { value: "KE", label: "케냐 KENYA" },
  { value: "CR", label: "코스타리카 COSTA RICA" },
  { value: "CU", label: "쿠바 CUBA" },
  { value: "HR", label: "크로아티아 CROATIA" },
  { value: "TH", label: "타이(태국) THAILAND" },
  { value: "TW", label: "타이완(대만) TAIWAN" },
  { value: "TZ", label: "탄자니아 TANZANIA(UNITED REP)" },
  { value: "TN", label: "튀니지 TUNISIA" },
  { value: "TR", label: "튀르키예 TURKIYE" },
  { value: "PA", label: "파나마 PANAMA(REP)" },
  { value: "PK", label: "파키스탄 PAKISTAN" },
  { value: "PE", label: "페루 PERU" },
  { value: "PT", label: "포르투갈 PORTUGAL" },
  { value: "PL", label: "폴란드 POLAND(REP)" },
  { value: "FR", label: "프랑스 FRANCE" },
  { value: "FJ", label: "피지 FIJI" },
  { value: "FI", label: "핀란드 FINLAND" },
  { value: "PH", label: "필리핀 PHILIPPINES" },
  { value: "HU", label: "헝가리 HUNGARY(REP)" },
  { value: "AU", label: "호주(오스트레일리아) AUSTRALIA" },
  { value: "HK", label: "홍콩(중국) HONG KONG(CHINA)" },
];

export default countryList;
