const { chromium } = require("playwright-core");
const path = require("path");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, query, orderBy } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDl8-I7UQzzQ0niUWGZMsUz8DGopXL43vI",
  authDomain: "mylink-project-4ef9e.firebaseapp.com",
  projectId: "mylink-project-4ef9e",
  storageBucket: "mylink-project-4ef9e.firebasestorage.app",
  messagingSenderId: "670378030271",
  appId: "1:670378030271:web:ab7dc87a29e86544d5c20a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runStep4Test() {
  console.log("🚀 [1/5] 로컬 Chrome 브라우저 실행 중...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 480, height: 950 },
  });

  const page = await context.newPage();

  console.log("🌐 [2/5] http://localhost:3000 접속 중...");
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  console.log("📝 [3/5] 링크 추가 모달 열기 및 '테스트' / 'https://test.com' 입력...");
  const addBtn = page.locator("button:has-text('새 링크 추가')").first();
  await addBtn.click();
  await page.waitForTimeout(500);

  await page.locator("#link-title-input").fill("테스트");
  await page.locator("#link-url-input").fill("https://test.com");
  await page.waitForTimeout(300);

  console.log("💾 [4/5] '추가하기' 클릭하여 Firestore에 저장 요청...");
  await page.locator("button:has-text('추가하기')").click();
  await page.waitForTimeout(2000);

  // 스크린샷 캡처
  const screenshotPath = path.join(__dirname, "test-step4-result.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 스크린샷 저장 완료: ${screenshotPath}`);

  await browser.close();

  console.log("🔥 [5/5] Firestore Database 직접 조회하여 users/anonymous/links 데이터 검증...");
  const colRef = collection(db, "users", "anonymous", "links");
  const snapshot = await getDocs(colRef);
  console.log(` - Firestore 내 links 문서 수: ${snapshot.docs.length}개`);
  
  const testDocs = snapshot.docs.filter(d => d.data().title === "테스트" && d.data().url === "https://test.com");
  console.log(` - '테스트' ('https://test.com') 일치 문서 수: ${testDocs.length}개`);

  if (testDocs.length > 0) {
    const docData = testDocs[0].data();
    console.log(" - 검증 성공! 문서 데이터:", {
      id: testDocs[0].id,
      title: docData.title,
      url: docData.url,
      hasCreatedAt: !!docData.createdAt,
      hasUpdatedAt: !!docData.updatedAt
    });
    console.log("\n🎉 Step 4 기능 테스트 완벽 성공!");
  } else {
    throw new Error("Firestore에서 방금 추가된 문서를 찾지 못했습니다.");
  }
}

runStep4Test()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Step 4 테스트 실패:", e);
    process.exit(1);
  });
