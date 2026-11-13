const { chromium } = require("playwright-core");
const path = require("path");

async function runStep5Test() {
  console.log("🚀 [1/5] 로컬 Chrome 브라우저 실행 중...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 480, height: 950 },
  });

  const page = await context.newPage();

  console.log("🌐 [2/5] http://localhost:3000 접속 중 (페이지 로드시 Firestore 데이터 불러오기 검증)...");
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // Firestore에 이전에 저장된 '테스트' 링크가 화면에 표시되는지 확인
  const initialTitleFound = await page.locator("text=테스트").first().isVisible();
  console.log(` - 페이지 로드 시 Firestore 데이터('테스트') 표시 여부: ${initialTitleFound ? "성공 ✅" : "실패 ❌"}`);

  console.log("📝 [3/5] 새로운 링크 '최신순 갱신 테스트' (https://realtime.test.com) 추가...");
  const addBtn = page.locator("button:has-text('새 링크 추가')").first();
  await addBtn.click();
  await page.waitForTimeout(500);

  await page.locator("#link-title-input").fill("최신순 갱신 테스트");
  await page.locator("#link-url-input").fill("https://realtime.test.com");
  await page.waitForTimeout(300);

  console.log("💾 [4/5] '추가하기' 클릭 (실시간 목록 갱신 확인)...");
  await page.locator("button:has-text('추가하기')").click();
  await page.waitForTimeout(2000);

  // 목록에 새 링크가 최상단에 갱신되었는지 확인
  const newLinkElement = page.locator("section a").first();
  const firstLinkText = await newLinkElement.innerText();
  const containsNewTitle = firstLinkText.includes("최신순 갱신 테스트");
  console.log(` - 추가 후 최상단 링크 제목: "${firstLinkText.trim().replace(/\n/g, ' ')}"`);
  console.log(` - 최신순 정렬(최상단) 실시간 반영 여부: ${containsNewTitle ? "성공 ✅" : "실패 ❌"}`);

  console.log("🔄 [5/5] 페이지 새로고침 후에도 Firestore 최신순 정렬 유지 검증...");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  const reloadedFirstLink = page.locator("section a").first();
  const reloadedText = await reloadedFirstLink.innerText();
  const reloadSuccess = reloadedText.includes("최신순 갱신 테스트");
  console.log(` - 새로고침 후 최상단 링크: "${reloadedText.trim().replace(/\n/g, ' ')}"`);
  console.log(` - 새로고침 후 영속성 및 최신순 정렬 유지: ${reloadSuccess ? "성공 ✅" : "실패 ❌"}`);

  // 스크린샷 캡처
  const screenshotPath = path.join(__dirname, "test-step5-result.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 스크린샷 저장 완료: ${screenshotPath}`);

  await browser.close();

  if (initialTitleFound && containsNewTitle && reloadSuccess) {
    console.log("\n🎉 Step 5 (Firestore 링크 로드 및 실시간 최신순 갱신) 기능 테스트 완벽 성공!");
  } else {
    throw new Error("검증 조건 중 일부를 충족하지 못했습니다.");
  }
}

runStep5Test()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Step 5 테스트 실패:", e);
    process.exit(1);
  });
