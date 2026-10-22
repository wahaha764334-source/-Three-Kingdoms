import { firebaseConfig } from "./firebase-config.js?v=20261023";

const chatForm = document.getElementById("chat-form");
const chatNameInput = document.getElementById("chat-name");
const chatMessageInput = document.getElementById("chat-message");
const chatSendButton = document.getElementById("chat-send");
const chatMessages = document.getElementById("chat-messages");
const chatStatus = document.getElementById("chat-status");
const chatNameStorageKey = "qunxiong-chat-name";
const maxMessages = 50;
const maxNameLength = 12;
const maxMessageLength = 120;
const sendCooldownMs = 3000;

function setChatStatus(message, status = "") {
  chatStatus.textContent = message;
  chatStatus.dataset.status = status;
}

function isFirebaseConfigured() {
  return firebaseConfig.apiKey !== "YOUR_API_KEY"
    && firebaseConfig.projectId !== "YOUR_PROJECT_ID"
    && firebaseConfig.appId !== "YOUR_APP_ID";
}

function renderMessages(messages) {
  const fragment = document.createDocumentFragment();
  if (messages.length === 0) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent = "聊天室尚無訊息，來打聲招呼吧。";
    fragment.append(empty);
  }

  for (const message of messages) {
    const entry = document.createElement("article");
    entry.className = "chat-entry";

    const header = document.createElement("div");
    header.className = "chat-entry-header";

    const name = document.createElement("strong");
    name.textContent = typeof message.name === "string"
      ? Array.from(message.name).slice(0, maxNameLength).join("")
      : "無名玩家";

    const time = document.createElement("time");
    if (message.createdAt && typeof message.createdAt.toDate === "function") {
      const date = message.createdAt.toDate();
      if (!Number.isNaN(date.getTime())) {
        time.dateTime = date.toISOString();
        time.textContent = date.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" });
        time.title = date.toLocaleString("zh-TW");
      } else {
        time.textContent = "時間未知";
      }
    } else {
      time.textContent = "剛剛";
    }

    const text = document.createElement("p");
    text.textContent = typeof message.text === "string"
      ? Array.from(message.text).slice(0, maxMessageLength).join("")
      : "";
    header.append(name, time);
    entry.append(header, text);
    fragment.append(entry);
  }

  chatMessages.replaceChildren(fragment);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function cleanName(value) {
  return Array.from(value.replace(/[\u0000-\u001f\u007f]/g, "").trim()).slice(0, maxNameLength).join("");
}

function cleanMessage(value) {
  return Array.from(value.replace(/\r?\n/g, " ").trim()).slice(0, maxMessageLength).join("");
}

function initializeUnconfiguredChat() {
  setChatStatus("尚未設定", "error");
  chatMessages.replaceChildren();
  const setupMessage = document.createElement("p");
  setupMessage.className = "chat-empty";
  setupMessage.textContent = "聊天室尚未連接 Firebase。完成 Firebase 專案設定後，所有玩家就能在此即時聊天。";
  chatMessages.append(setupMessage);
  chatNameInput.disabled = true;
  chatMessageInput.disabled = true;
  chatSendButton.disabled = true;
}

async function initializeChat() {
  if (!isFirebaseConfigured()) {
    initializeUnconfiguredChat();
    return;
  }

  setChatStatus("連線中");
  try {
    const [appSdk, authSdk, firestoreSdk] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js")
    ]);
    const app = appSdk.initializeApp(firebaseConfig);
    const auth = authSdk.getAuth(app);
    const database = firestoreSdk.getFirestore(app);
    const userCredential = await authSdk.signInAnonymously(auth);
    const messagesQuery = firestoreSdk.query(
      firestoreSdk.collection(database, "publicChat"),
      firestoreSdk.orderBy("createdAt", "desc"),
      firestoreSdk.limit(maxMessages)
    );

    firestoreSdk.onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((document) => document.data()).reverse();
      renderMessages(messages);
      setChatStatus("已連線", "connected");
    }, (error) => {
      console.error("無法接收聊天室訊息：", error);
      setChatStatus("讀取失敗", "error");
      chatMessages.replaceChildren();
      const errorMessage = document.createElement("p");
      errorMessage.className = "chat-empty";
      errorMessage.textContent = "目前無法讀取聊天室，請稍後重新整理。";
      chatMessages.append(errorMessage);
    });

    let lastSentAt = 0;
    chatForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (chatSendButton.disabled) return;

      const name = cleanName(chatNameInput.value);
      const text = cleanMessage(chatMessageInput.value);
      if (!name) {
        setChatStatus("請輸入暱稱", "error");
        chatNameInput.focus();
        return;
      }
      if (!text) {
        chatMessageInput.focus();
        return;
      }

      const now = Date.now();
      const remainingMs = sendCooldownMs - (now - lastSentAt);
      if (remainingMs > 0) {
        setChatStatus(`請等 ${Math.ceil(remainingMs / 1000)} 秒再傳送`, "error");
        return;
      }

      chatNameInput.value = name;
      chatMessageInput.value = text;
      try {
        localStorage.setItem(chatNameStorageKey, name);
      } catch (error) {
        console.warn("無法儲存聊天室暱稱：", error);
      }

      chatSendButton.disabled = true;
      try {
        await firestoreSdk.addDoc(firestoreSdk.collection(database, "publicChat"), {
          uid: userCredential.user.uid,
          name,
          text,
          createdAt: firestoreSdk.serverTimestamp()
        });
        lastSentAt = Date.now();
        chatMessageInput.value = "";
        setChatStatus("已傳送", "connected");
      } catch (error) {
        console.error("無法傳送聊天室訊息：", error);
        setChatStatus("傳送失敗，請稍後重試", "error");
      } finally {
        chatSendButton.disabled = false;
      }
    });
  } catch (error) {
    console.error("聊天室連線失敗：", error);
    setChatStatus("連線失敗", "error");
    chatMessages.replaceChildren();
    const errorMessage = document.createElement("p");
    errorMessage.className = "chat-empty";
    errorMessage.textContent = "無法連接聊天室，請檢查 Firebase 設定與網路連線。";
    chatMessages.append(errorMessage);
  }
}

try {
  chatNameInput.value = cleanName(localStorage.getItem(chatNameStorageKey) || "");
} catch (error) {
  console.warn("無法讀取已儲存的聊天室暱稱：", error);
}

initializeChat();
