import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from './Config/Database.js';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  query, 
  onSnapshot, 
  serverTimestamp, 
  where,
  updateDoc,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';

// Helper function to format Firestore Timestamp
const formatTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.toDate) {
    return '';
  }
  const date = timestamp.toDate();
  // Using pt-BR locale for DD/MM/YYYY format
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hasUnread, setHasUnread] = useState(false);
  const scrollRef = useRef();

  // Get user auth state and then user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages
  useEffect(() => {
    if (!currentUser?.uid) return;

    const q = query(collection(db, 'mensagens'), where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      msgs.sort((a, b) => a.timestamp?.toDate() - b.timestamp?.toDate());

      const unreadFromAdmin = msgs.some(msg => msg.sender === 'admin' && !msg.read);
      setHasUnread(unreadFromAdmin);
      
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const markMessagesAsRead = async () => {
    if (!currentUser?.uid || !hasUnread) return;
    const q = query(
      collection(db, 'mensagens'), 
      where('userId', '==', currentUser.uid), 
      where('sender', '==', 'admin'),
      where('read', '==', false)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      updateDoc(doc.ref, { read: true });
    });
    setHasUnread(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a new message WITH userName
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !currentUser || !userData) return;

    try {
      await addDoc(collection(db, 'mensagens'), {
        userId: currentUser.uid,
        userName: userData.nome.toUpperCase(),
        text: newMessage,
        sender: 'user',
        read: false,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error("Erro ao enviar mensagem: ", error);
    }
  };

  if (!currentUser) {
    return (
        <div className="text-center p-8 bg-gray-100 rounded-lg shadow-inner">
            <p className="text-gray-600">Por favor, faça login para usar o chat.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="bg-cyan-600 p-4 text-white flex items-center justify-between">
        <h3 className="font-bold text-lg tracking-wider">CHAT DE SUPORTE</h3>
        {hasUnread && <span className='text-xs bg-red-500 text-white font-bold py-1 px-2 rounded-full'>NOVA MENSAGEM</span>}
      </div>

      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4" onFocus={markMessagesAsRead} onClick={markMessagesAsRead}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm text-sm ${msg.sender === 'user' ? 'bg-cyan-500 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
              <p>{msg.text}</p>
            </div>
            {msg.timestamp && (
              <span className="text-xs text-gray-400 mt-1 px-2">
                {formatTimestamp(msg.timestamp)}
              </span>
            )}
          </div>
        ))}
      </div>

 
      <form onSubmit={handleSendMessage} className="flex gap-1 px-2 mb-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="rounded-full border-gray-300 border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm w-full"
        />
        <button type="submit" className="bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-700 transition-150 flex items-center justify-center w-10 h-10 shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
