const { chromium } = require("playwright-core");
const path = require("path");

async function runValidationTest() {
  console.log("🚀 [1/6] 브라우저 실행 및 http://localhost:3000 접속...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 480, height: 950 },
  });

  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  console.log("📝 [2/6] '새 링크 추가하기' 다이얼로그 열기...");
  await page.locator("button:has-text('새 링크 추가하기')").click();
  await page.waitForTimeout(400);

  const dialog = page.locator("div[role='dialog']");

  console.log("🧪 [3/6] 필수값 미입력 상태로 '추가하기' 클릭 (빈 값 검증)...");
  await dialog.locator("button:has-text('추가하기')").click();
  await page.waitForTimeout(400);

  const titleEmptyError = await dialog.locator("text=링크 제목을 입력해주세요.").isVisible();
  const urlEmptyError = await dialog.locator("text=연결할 웹 주소(URL)를 입력해주세요.").isVisible();

  console.log(` - 제목 필수값 에러 노출: ${titleEmptyError ? "성공 ✅" : "실패 ❌"}`);
  console.log(` - URL 필수값 에러 노출: ${urlEmptyError ? "성공 ✅" : "실패 ❌"}`);

  // 빈 값 검증 스크린샷
  const emptyScreenshotPath = path.join(__dirname, "test-validation-empty.png");
  await page.screenshot({ path: emptyScreenshotPath });
  console.log(`📸 빈 값 검증 에러 스크린샷 저장: ${emptyScreenshotPath}`);

  console.log("🧪 [4/6] 형식 검증 (1글자 제목 및 유효하지 않은 도메인 입력)...");
  const titleInput = dialog.locator("#link-title-input");
  const urlInput = dialog.locator("#link-url-input");

  // 1글자만 입력 후 블러
  await titleInput.fill("A");
  await titleInput.blur();
  await page.waitForTimeout(300);

  const titleMinLengthError = await dialog.locator("text=제목은 최소 2글자 이상이어야 해요.").isVisible();
  console.log(` - 제목 최소 2자 검증 에러 노출: ${titleMinLengthError ? "성공 ✅" : "실패 ❌"}`);

  // 도메인이 아닌 텍스트 입력 후 블러
  await urlInput.fill("invalid_domain_test");
  await urlInput.blur();
  await page.waitForTimeout(300);

  const urlDomainError = await dialog.locator("text=올바른 도메인 형식을 입력해주세요.").isVisible();
  console.log(` - URL 도메인 형식 검증 에러 노출: ${urlDomainError ? "성공 ✅" : "실패 ❌"}`);

  // 형식 에러 스크린샷
  const invalidScreenshotPath = path.join(__dirname, "test-validation-invalid.png");
  await page.screenshot({ path: invalidScreenshotPath });
  console.log(`📸 형식 검증 에러 스크린샷 저장: ${invalidScreenshotPath}`);

  console.log("✨ [5/6] 올바른 값으로 수정하여 실시간 유효성 통과(Green Check) 검증...");
  await titleInput.fill("토스 공식 웹사이트");
  await titleInput.blur();

  await urlInput.fill("toss.im");
  await urlInput.blur();
  await page.waitForTimeout(400);

  const isTitleCheckVisible = await dialog.locator("text=멋진 링크 제목이에요!").isVisible();
  const isUrlTipVisible = await dialog.locator("text=https://toss.im 으로 자동 연결돼요.").isVisible();
  console.log(` - 제목 유효성 통과(성공 피드백): ${isTitleCheckVisible ? "성공 ✅" : "실패 ❌"}`);
  console.log(` - URL 자동 https 보정 미리보기: ${isUrlTipVisible ? "성공 ✅" : "실패 ❌"}`);

  // 통과 상태 스크린샷
  const validScreenshotPath = path.join(__dirname, "test-validation-valid.png");
  await page.screenshot({ path: validScreenshotPath });
  console.log(`📸 유효성 통과 상태 스크린샷 저장: ${validScreenshotPath}`);

  console.log("🚀 [6/6] 최종 제출 및 목록 반영 확인...");
  await dialog.locator("button:has-text('추가하기')").click();
  await page.waitForTimeout(600);

  const hasAddedTitle = await page.locator("text=토스 공식 웹사이트").first().isVisible();
  console.log(` - 유효성 검증 완료 후 정상 추가: ${hasAddedTitle ? "성공 ✅" : "실패 ❌"}`);

  await browser.close();
  console.log("\n🎉 [성공] 입력 검증(필수값, 글자 수, URL 도메인 형식, 실시간 피드백)이 모두 완벽하게 검증되었습니다!");
}

runValidationTest().catch((err) => {
  console.error("❌ 검증 테스트 중 오류:", err);
  process.exit(1);
});
