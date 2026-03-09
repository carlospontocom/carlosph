import React, { useEffect, useState, useMemo } from 'react';
import { auth, db } from './Config/Database.js';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  query, 
  onSnapshot, 
  doc,
  updateDoc,
  deleteDoc,
  where,
  addDoc,
  serverTimestamp,
  getDocs,
  getDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ADMIN_UID = 'a1oVPW1uDyeyrtKsEGsR1e1DEcF2';

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

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [usersWithChats, setUsersWithChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [unreadMessagesMap, setUnreadMessagesMap] = useState(new Map());
  const navigate = useNavigate();

  // Authenticate Admin
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.uid === ADMIN_UID) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  // Decouple chat users from projects
  useEffect(() => {
    if (!user) return;

    // Listen to all messages to discover users who have sent at least one message
    const messagesQuery = query(collection(db, 'mensagens'));
    const unsubscribeMessages = onSnapshot(messagesQuery, async (snapshot) => {
      const userIds = new Set(snapshot.docs.map(doc => doc.data().userId));
      const usersData = [];

      for (const userId of userIds) {
        if (!userId) continue; // Skip if userId is null or undefined
        const userDoc = await getDoc(doc(db, 'usuarios', userId));
        if (userDoc.exists()) {
          usersData.push({ uid: userId, ...userDoc.data() });
        }
      }
      
      setUsersWithChats(usersData);
      setLoading(false);
    });

    return () => unsubscribeMessages();
  }, [user]);

  // Listen for unread messages from users
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "mensagens"), where("sender", "==", "user"), where("read", "==", false));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const unreadMap = new Map();
      snapshot.forEach(doc => {
        const msg = doc.data();
        unreadMap.set(msg.userId, (unreadMap.get(msg.userId) || 0) + 1);
      });
      setUnreadMessagesMap(unreadMap);
    });
    return () => unsubscribe();
  }, [user]);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (!selectedChat) return;
    const q = query(collection(db, "mensagens"), where("userId", "==", selectedChat.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      msgs.sort((a, b) => a.timestamp?.toMillis() - b.timestamp?.toMillis());
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [selectedChat]);

  // Send a message as admin
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    await addDoc(collection(db, "mensagens"), {
      text: newMessage,
      userId: selectedChat.uid,
      sender: 'admin',
      read: false,
      timestamp: serverTimestamp()
    });
    setNewMessage('');
  };

  // Mark messages as read when a chat is selected
  const handleSelectChat = async (chatUser) => {
    setSelectedChat(chatUser);
    const unreadQuery = query(
      collection(db, "mensagens"),
      where("userId", "==", chatUser.uid),
      where("sender", "==", "user"),
      where("read", "==", false)
    );
    const snapshot = await getDocs(unreadQuery);
    snapshot.forEach(doc => {
      updateDoc(doc.ref, { read: true });
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel do Administrador</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">...</div>
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Central de Atendimento</h2>
              <div className="bg-white shadow-md rounded-lg flex flex-col" style={{ height: '70vh' }}>
                <h3 className="font-bold p-4 border-b">Conversas</h3>
                <div className="overflow-y-auto flex-grow">
                  {usersWithChats.map(u => (
                    <div key={u.uid} onClick={() => handleSelectChat(u)} className={`p-3 cursor-pointer flex justify-between items-center ${selectedChat?.uid === u.uid ? 'bg-cyan-100' : 'hover:bg-gray-50'}`}>
                      <span>{u.nome}</span>
                      {unreadMessagesMap.has(u.uid) && <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{unreadMessagesMap.get(u.uid)}</span>}
                    </div>
                  ))}
                </div>
                {selectedChat ? (
                  <div className="flex flex-col h-2/3 border-t">
                    <div className="p-4 border-b font-bold text-gray-800">Conversa com {selectedChat.nome}</div>
                    <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                       {messages.map(msg => (
                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                          <div className={`my-1 p-3 rounded-lg max-w-lg text-sm ${msg.sender === 'admin' ? 'bg-cyan-500 text-white' : 'bg-gray-200'}`}>
                            <p>{msg.text}</p>
                          </div>
                          {msg.timestamp && (
                            <span className={`text-xs text-gray-400 mt-1 px-2 ${msg.sender === 'admin' ? 'text-right' : 'text-left'} w-full`}>
                              {formatTimestamp(msg.timestamp)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2 bg-white">
                      <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-grow border rounded-lg p-2 focus:ring-cyan-500" placeholder="Digite sua resposta..." />
                      <button type="submit" className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700">Enviar</button>
                    </form>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full text-gray-400 p-4">Selecione uma conversa</div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
