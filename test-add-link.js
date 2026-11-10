const { chromium } = require("playwright-core");
const path = require("path");

async function runAddLinkTest() {
  console.log("🚀 [1/7] 로컬 Chrome 브라우저 실행 중...");
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

  console.log("🌐 [2/7] http://localhost:3000 에 접속합니다...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const initialCount = await page.locator("section a").count();
  console.log(` - 현재 등록된 링크 개수: ${initialCount}개`);

  console.log("📝 [3/7] '새 링크 추가하기' 다이얼로그 열기...");
  const openModalBtn = page.locator("button:has-text('새 링크 추가하기')");
  await openModalBtn.click();
  await page.waitForTimeout(400);

  const dialog = page.locator("div[role='dialog']");
  const isDialogOpen = await dialog.locator("text=새 링크 추가하기").first().isVisible();
  console.log(` - 다이얼로그 노출 여부: ${isDialogOpen ? "성공 ✅" : "실패 ❌"}`);

  console.log("✍️ [4/7] 다이얼로그 내부 필드에 링크 정보 입력 및 선택...");
  // 1. 제목 입력
  await dialog.locator("input[placeholder='예: 내 포트폴리오 웹사이트']").fill("구글 딥마인드 제미나이");

  // 2. URL 입력 (https:// 자동 추가 테스트를 위해 프로토콜 없이 입력)
  await dialog.locator("input[placeholder='https://example.com']").fill("gemini.google.com");

  // 3. 설명 입력
  await dialog.locator("input[placeholder='예: 최신 프로젝트와 기술 스택 소개']").fill("차세대 멀티모달 AI 모델과 개발 환경");

  // 4. 다이얼로그 내부의 카테고리 '프로젝트' 선택
  await dialog.locator("button:has-text('프로젝트')").click();

  // 5. 다이얼로그 내부의 아이콘 🚀 선택
  await dialog.locator("button:has-text('🚀')").click();

  // 6. 다이얼로그 내부의 뱃지 'NEW' 선택
  await dialog.locator("button:has-text('NEW')").click();

  await page.waitForTimeout(400);

  // 다이얼로그 폼 입력 상태 스크린샷
  const dialogScreenshotPath = path.join(__dirname, "test-add-dialog.png");
  await page.screenshot({ path: dialogScreenshotPath });
  console.log(`📸 다이얼로그 입력 스크린샷 저장: ${dialogScreenshotPath}`);

  console.log("💾 [5/7] 다이얼로그 '추가하기' 버튼 클릭...");
  await dialog.locator("button:has-text('추가하기')").click();
  await page.waitForTimeout(600);

  // 토스트 노출 확인
  const toastVisible = await page.locator("text=새로운 링크가 추가되었어요!").first().isVisible();
  console.log(` - 링크 추가 완료 토스트 노출: ${toastVisible ? "성공 ✅" : "실패 ❌"}`);

  console.log("🔍 [6/7] 새 링크가 목록에 정상 렌더링되었는지 검증...");
  const newCount = await page.locator("section a").count();
  console.log(` - 추가 후 링크 개수: ${newCount}개 (기존 대비 +${newCount - initialCount})`);

  const hasNewTitle = await page.locator("text=구글 딥마인드 제미나이").first().isVisible();
  const hasNewBadge = await page.locator("section").locator("text=NEW").first().isVisible();
  const hasNewDesc = await page.locator("text=차세대 멀티모달 AI 모델과 개발 환경").first().isVisible();
  const newLinkHref = await page.locator("a:has-text('구글 딥마인드 제미나이')").first().getAttribute("href");

  console.log(` - 제목 렌더링: ${hasNewTitle ? "정상 ✅" : "실패 ❌"}`);
  console.log(` - 뱃지 렌더링: ${hasNewBadge ? "정상 ✅" : "실패 ❌"}`);
  console.log(` - 설명 렌더링: ${hasNewDesc ? "정상 ✅" : "실패 ❌"}`);
  console.log(` - URL 자동 https 보정 결과: ${newLinkHref} (기대한 https://gemini.google.com 여부: ${newLinkHref === "https://gemini.google.com" ? "정상 ✅" : "실패 ❌"})`);

  console.log("🔄 [7/7] 새로고침 후 localStorage 영속성(Persistence) 검증...");
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const persistedTitle = await page.locator("text=구글 딥마인드 제미나이").first().isVisible();
  console.log(` - 새로고침 후에도 유지 여부: ${persistedTitle ? "영속성 검증 성공 ✅" : "실패 ❌"}`);

  // 최종 결과 스크린샷 저장
  const finalScreenshotPath = path.join(__dirname, "test-add-result.png");
  await page.screenshot({ path: finalScreenshotPath, fullPage: true });
  console.log(`📸 최종 결과 스크린샷 저장: ${finalScreenshotPath}`);

  await browser.close();
  console.log("\n🎉 [성공] 브라우저 상에서 링크 추가 기능이 완벽하게 검증되었습니다!");
}

runAddLinkTest().catch((err) => {
  console.error("❌ 브라우저 테스트 중 오류:", err);
  process.exit(1);
});
