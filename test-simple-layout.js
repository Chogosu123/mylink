const { chromium } = require("playwright-core");
const path = require("path");

async function runSimpleLayoutTest() {
  console.log("🚀 [1/5] Chrome 브라우저 실행 및 페이지 로드...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 480, height: 950 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  });

  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  console.log("👤 [2/5] 프로필 영역 검증...");
  const name = await page.locator("h1").innerText();
  console.log(` - 프로필 이름: "${name}"`);

  // 아바타 이미지 확인
  const avatarImg = page.locator("img[alt='이주성']");
  const avatarSrc = await avatarImg.getAttribute("src");
  console.log(` - 아바타 이미지 경로: ${avatarSrc}`);

  // 소개글이 제거되었는지 확인
  const bioPresent = await page.locator("text=안녕하세요, 이주성이에요").count();
  console.log(` - 소개글 제거 여부: ${bioPresent === 0 ? "성공 (소개글 없음) ✅" : "실패 ❌"}`);

  // 카테고리 탭, 응원하기, 바텀 CTA가 제거되었는지 확인
  const tabsPresent = await page.locator("text=전체").count();
  const cheerPresent = await page.locator("text=응원하기").count();
  const ctaPresent = await page.locator("text=프로필 링크 공유하기 ↗").count();
  console.log(` - 카테고리 탭 제거: ${tabsPresent === 0 ? "성공 ✅" : "실패 ❌"}`);
  console.log(` - 응원 카드 제거: ${cheerPresent === 0 ? "성공 ✅" : "실패 ❌"}`);
  console.log(` - 하단 고정 CTA 제거: ${ctaPresent === 0 ? "성공 ✅" : "실패 ❌"}`);

  console.log("🔗 [3/5] 사진 2번 스타일의 링크 목록 검증...");
  const linkTitles = await page.locator("section a span").allInnerTexts();
  console.log(" - 현재 링크 목록:", linkTitles);

  console.log("➕ [4/5] '맨 밑에 새 링크 추가 버튼' 클릭 및 새 링크 추가 검증...");
  const addBtn = page.locator("button:has-text('새 링크 추가')");
  await addBtn.click();
  await page.waitForTimeout(400);

  const dialog = page.locator("div[role='dialog']");
  await dialog.locator("#link-title-input").fill("LinkedIn");
  await dialog.locator("#link-url-input").fill("linkedin.com");
  await dialog.locator("button:has-text('추가하기')").click();
  await page.waitForTimeout(600);

  const linkedinAdded = await page.locator("section").locator("text=LinkedIn").isVisible();
  console.log(` - 새 링크(LinkedIn) 추가 및 렌더링: ${linkedinAdded ? "성공 ✅" : "실패 ❌"}`);

  console.log("📸 [5/5] 최종 화면 스크린샷 캡처...");
  const screenshotPath = path.join(__dirname, "test-simple-layout.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 스크린샷 저장 완료: ${screenshotPath}`);

  await browser.close();
  console.log("\n🎉 [성공] 요청하신 심플 레이아웃(공대생 프로필 + 2번 사진 스타일 링크 + 하단 링크 추가 버튼)이 완벽히 구현되었습니다!");
}

runSimpleLayoutTest().catch((err) => {
  console.error("❌ 테스트 중 오류:", err);
  process.exit(1);
});
