import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    try {
      await addDoc(collection(db, "guestbook"), {
        content: text,
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (error) {
      console.error("데이터 저장 실패:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>한 줄 방명록</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="따뜻한 한마디를 남겨주세요"
        />
        <button type="submit" style={styles.button}>등록</button>
      </form>

      <ul style={styles.list}>
        {messages.map((msg) => (
          <li key={msg.id} style={styles.listItem}>
            <span>{msg.content}</span>
            <small style={styles.date}>{msg.createdAt?.toDate().toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "600px", margin: "0 auto", fontFamily: "'Pretendard', sans-serif" },
  title: { textAlign: "center", marginBottom: "30px", color: "#2c3e50" },
  form: { display: "flex", gap: "10px", marginBottom: "30px" },
  input: { flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" },
  button: { padding: "12px 24px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    padding: "15px 20px",
    backgroundColor: "white",
    border: "1px solid #eee",
    marginBottom: "12px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  },
  date: { color: "#95a5a6", fontSize: "0.75rem" },
};

export default App;
