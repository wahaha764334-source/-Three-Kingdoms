# Firebase 聊天室設定

此遊戲使用 Firebase Authentication 的匿名登入與 Cloud Firestore 提供公開即時聊天室。玩家不需要建立帳號；聊天室暱稱不是身分驗證，也不應輸入真實姓名或其他個人資料。

## 建立 Firebase 專案

1. 到 [Firebase Console](https://console.firebase.google.com/) 登入 Google 帳號並建立專案。
2. 在專案總覽新增一個 Web app，記下 Firebase 提供的 `apiKey`、`authDomain`、`projectId`、`appId`。
3. 開啟 **Authentication → Sign-in method**，啟用 **Anonymous** 登入。
4. 開啟 **Firestore Database → Create database**，選擇正式環境模式並建立資料庫。
5. 在 Firestore 的 **Rules** 頁籤，將規則替換成以下內容並發布：

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAnonymous() {
      return request.auth != null
        && request.auth.token.firebase.sign_in_provider == 'anonymous';
    }

    match /publicChat/{messageId} {
      allow read: if isAnonymous();
      allow create: if isAnonymous()
        && request.resource.data.keys().hasAll(['uid', 'name', 'text', 'createdAt'])
        && request.resource.data.keys().hasOnly(['uid', 'name', 'text', 'createdAt'])
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0
        && request.resource.data.name.size() <= 12
        && request.resource.data.text is string
        && request.resource.data.text.size() > 0
        && request.resource.data.text.size() <= 120
        && request.resource.data.createdAt == request.time;
      allow update, delete: if false;
    }
  }
}
```

## 加入 Web app 設定並發布

在 `firebase-config.js` 中，將 `YOUR_API_KEY`、`YOUR_PROJECT_ID`、`YOUR_APP_ID` 和 `YOUR_PROJECT_ID.firebaseapp.com` 換成 Firebase Web app 設定中的值。此設定會出現在公開網頁原始碼中；Firebase Web API key 是用來識別專案的公開設定，不可用服務帳戶私鑰或管理員憑證取代。

把 `index.html`、`game.js`、`style.css`、`chat.js`、`firebase-config.js` 更新到 GitHub 儲存庫根目錄。重新部署完成後，重新整理遊戲即可測試聊天室。

## 費用與使用限制

- 所有人都能讀取聊天室；只有已匿名登入的玩家能新增訊息，不能修改或刪除已送出的訊息。
- 畫面只顯示最近 50 則訊息；暱稱保存在玩家自己的瀏覽器中。
- 網頁端每 3 秒限制送出一次，且字數限制為 120 字。這是基本防洗版措施，不是伺服器端的完整速率限制；公開聊天室仍可能遭遇垃圾訊息。
- 本遊戲聊天室只使用 Firebase Spark 免費方案，不要連結帳單帳戶或升級至付費方案。Spark 方案不會自動向你收費；若用量超過免費額度，聊天室功能可能暫時受到限制或停止，等待額度重置即可。
- 不要啟用需要升級方案的 Firebase 產品、備份或付費用量；只要保持 Spark 方案即可。
