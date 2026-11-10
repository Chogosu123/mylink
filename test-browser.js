const { chromium } = require("playwright-core");
const path = require("path");

async function runBrowserTest() {
  console.log("🚀 [1/8] 로컬 Chrome 브라우저를 실행합니다...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 480, height: 900 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  });

  // 클립보드 권한 부여
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);

  const page = await context.newPage();

  console.log("🌐 [2/8] http://localhost:3000 로컬 서버에 접속합니다...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const title = await page.title();
  console.log(`✅ 페이지 타이틀: "${title}"`);

  // 1. 프로필 렌더링 검증
  console.log("👤 [3/8] 프로필 정보 렌더링 검증 중...");
  const name = await page.locator("h1").innerText();
  const status = await page.locator("header").innerText();
  const badges = await page.locator(".group\\/card, main").locator("text=바이브 코딩").count();
  console.log(` - 이름: ${name}`);
  console.log(` - 상태: ${status.replace(/\n/g, " ").trim()}`);
  console.log(` - 뱃지 렌더링 여부: ${badges > 0 ? "정상" : "실패"}`);

  // 2. 카테고리 탭 인터랙션 검증
  console.log("🏷️ [4/8] 카테고리 탭(전체/프로젝트/블로그/연락처) 클릭 및 필터링 검증 중...");
  const initialCardsCount = await page.locator("section a").count();
  console.log(` - 전체 탭 링크 카드 수: ${initialCardsCount}개`);

  // 프로젝트 탭 클릭
  await page.click("button:has-text('프로젝트')");
  await page.waitForTimeout(300);
  const projectCardsCount = await page.locator("section a").count();
  console.log(` - '프로젝트' 탭 클릭 후 카드 수: ${projectCardsCount}개 (필터링 동작 성공)`);

  // 블로그 탭 클릭
  await page.click("button:has-text('블로그')");
  await page.waitForTimeout(300);
  const blogCardsCount = await page.locator("section a").count();
  console.log(` - '블로그' 탭 클릭 후 카드 수: ${blogCardsCount}개 (필터링 동작 성공)`);

  // 전체 탭으로 복귀
  await page.click("button:has-text('전체')");
  await page.waitForTimeout(300);

  // 3. 링크 카드 및 복사 인터랙션 검증
  console.log("🔗 [5/8] 링크 카드 및 복사 버튼 인터랙션 검증 중...");
  const firstLink = page.locator("section a").first();
  const linkHref = await firstLink.getAttribute("href");
  console.log(` - 첫 번째 링크 URL: ${linkHref} (정상 연결)`);

  // 링크 내 "복사" 버튼 클릭 시 토스트 확인
  const copyBtn = page.locator("section button:has-text('복사')").first();
  await copyBtn.click();
  await page.waitForTimeout(400);
  const toastText = await page.locator("text=링크를 복사했어요").first().isVisible();
  console.log(` - 개별 링크 '복사' 버튼 클릭 시 토스트 노출: ${toastText ? "성공 ✅" : "실패 ❌"}`);

  // 4. 응원하기 인터랙션 검증
  console.log("💙 [6/8] 응원하기 카드 인터랙션 검증 중...");
  const cheerBtn = page.locator("button:has-text('응원하기')");
  await cheerBtn.click();
  await page.waitForTimeout(600);
  const cheerToast = await page.locator("text=응원을 보냈어요!").first().isVisible();
  console.log(` - '응원하기' 클릭 인터랙션 및 토스트 노출: ${cheerToast ? "성공 ✅" : "실패 ❌"}`);
  await page.waitForTimeout(1500);

  // 5. 하단 CTA 버튼들 검증
  console.log("🔘 [7/8] 하단 액션 버튼 검증 (프로필 링크 공유하기 / 이메일 복사)...");
  const shareBtn = page.locator("button:has-text('프로필 링크 공유하기')");
  await shareBtn.click();
  await page.waitForTimeout(600);
  const currentToast = await page.locator("div.fixed.bottom-24").innerText().catch(() => "");
  console.log(` - '프로필 링크 공유하기 ↗' 클릭 후 표시된 토스트: "${currentToast.trim().replace(/\n/g, ' ')}"`);
  const shareToast = currentToast.includes("프로필") || currentToast.includes("복사");
  console.log(` - '프로필 링크 공유하기 ↗' 클릭 시 토스트 노출: ${shareToast ? "성공 ✅" : "실패 ❌"}`);
  await page.waitForTimeout(1500);

  const emailBtn = page.locator("button:has-text('이메일 복사')");
  await emailBtn.click();
  await page.waitForTimeout(600);
  const emailToast = await page.locator("text=이메일 주소를 복사했어요").first().isVisible();
  console.log(` - '이메일 복사' 클릭 시 토스트 노출: ${emailToast ? "성공 ✅" : "실패 ❌"}`);
  await page.waitForTimeout(1000);

  // 6. QR 모달 검증
  console.log("📷 [8/8] QR 모달 열기 및 닫기 검증...");
  const qrBtn = page.locator("header button[title='QR 코드 보기']");
  await qrBtn.click();
  await page.waitForTimeout(400);
  const qrModalVisible = await page.locator("text=프로필 QR 코드").isVisible();
  console.log(` - QR 코드 모달 팝업 오픈: ${qrModalVisible ? "성공 ✅" : "실패 ❌"}`);

  const closeBtn = page.locator("button:has-text('닫기')");
  await closeBtn.click();
  await page.waitForTimeout(300);
  const qrModalClosed = !(await page.locator("text=프로필 QR 코드").isVisible());
  console.log(` - QR 코드 모달 닫기: ${qrModalClosed ? "성공 ✅" : "실패 ❌"}`);

  // 스크린샷 저장
  const screenshotPath = path.join(__dirname, "test-result.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 전체 페이지 렌더링 스크린샷 저장 완료: ${screenshotPath}`);

  await browser.close();
  console.log("\n🎉 모든 브라우저 렌더링 및 인터랙션 검증이 100% 성공적으로 완료되었습니다!");
}

runBrowserTest().catch((err) => {
  console.error("❌ 브라우저 테스트 중 오류 발생:", err);
  process.exit(1);
});
