
import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from './Config/Database.js';
import { onAuthStateChanged } from 'firebase/auth';
import { FaRocket } from 'react-icons/fa';
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
  if (!timestamp || !timestamp.toDate) return '';
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(date);
};

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hasUnread, setHasUnread] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

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

  // Fetch messages and check for unread
  useEffect(() => {
    if (!currentUser?.uid) return;

    const q = query(collection(db, 'mensagens'), where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      msgs.sort((a, b) => a.timestamp?.toMillis() - b.timestamp?.toMillis());

      const unreadFromAdmin = msgs.some(msg => msg.sender === 'admin' && !msg.read);
      setHasUnread(unreadFromAdmin);
      
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !currentUser || !userData) return;

    try {
      await addDoc(collection(db, 'mensagens'), {
        userId: currentUser.uid,
        userName: userData.nome, // Storing user name for admin view
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

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
    if (!isChatOpen) {
        // Timeout to allow the chat window to be visible before marking as read
        setTimeout(() => {
            markMessagesAsRead();
        }, 100)
    }
  };

  if (!currentUser) {
    return null; // Don't render the chat if the user is not logged in
  }

{/* variaveis com estilos */}

  const styleContainerMsg = "flex gap-2 px-4 py-3 bg-white rounded-md";
  const styleInputMsg = "border border-blue-600 py-3 px-2 w-full rounded-md";
  const styleBtnMsg= "border border-green-600 py-3 px-3 bg-blue-600 text-white font-semibold rounded-full";
  

  return (
    <div>
        {/* Chat Icon */}
        {!isChatOpen && (
            <div className="fixed bottom-8 right-8 z-20">
                <button onClick={toggleChat} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    {hasUnread && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">!</span>
                    )}
                </button>
            </div>
        )}

        {/* Chat Window */}
        {isChatOpen && (
            <div className="fixed inset-0 bg-white flex flex-col z-50 md:inset-auto md:bottom-8 md:right-8 md:w-96 md:h-auto md:max-h-[calc(100vh-7rem)] md:rounded-lg md:shadow-lg rounded-md">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-blue-500 text-white flex-shrink-0 md:rounded-t-lg">
                    <h2 className="text-xl font-semibold">Central de Atendimento</h2>
                    <button onClick={toggleChat} className="text-white hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 p-4 overflow-y-auto space-y-2">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`my-1 p-3 rounded-lg max-w-xs text-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                    <p>{msg.text}</p>
                                </div>
                                {msg.timestamp && (
                                    <span className={`text-xs text-gray-400 mt-1 px-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'} w-full`}>
                                        {formatTimestamp(msg.timestamp)}
                                    </span>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                        
                        
                    </div>
                    <form onSubmit={handleSendMessage} className={styleContainerMsg}>
                        <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} className={styleInputMsg} placeholder="Digite sua resposta..." />
                        <button type="submit" className={styleBtnMsg}>
                        <FaRocket/>
                        </button>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default Chat;
