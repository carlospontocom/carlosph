
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { auth, db } from './Config/Database.js';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  query, 
  onSnapshot, 
  doc,
  updateDoc,
  deleteDoc, // Import deleteDoc
  where,
  addDoc,
  serverTimestamp,
  getDocs,
  getDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal/index.jsx'; // Import Modal
import { FaRocket } from 'react-icons/fa';

const ADMIN_UID = 'a1oVPW1uDyeyrtKsEGsR1e1DEcF2';

// Helper function to format Firestore Timestamp for chat
const formatTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return '';
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(date);
};

const ProjectCard = ({ project, onUpdateStatus, onDeleteProject }) => {
  const { id, nome, descricao, status, user } = project;
  const currentStatus = status || 'Pendente';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-xl mb-2">{nome}</h3>
      
      <div className="mb-4 border-l-2 border-blue-500 pl-3">
        <p className="font-semibold text-gray-800">Cliente: <span className="font-normal text-gray-600">{user?.nome || 'N/A'}</span></p>
        <p className="font-semibold text-gray-800">Email: <span className="font-normal text-gray-600">{user?.email || 'N/A'}</span></p>
      </div>
      
      <p className="text-gray-700 mb-4">{descricao}</p>
      
      <p className="text-sm text-gray-500 mb-4">Status: <span className="font-bold text-black">{currentStatus}</span></p>

      <div className="flex flex-wrap justify-end gap-2">
        {(currentStatus === 'Pendente' || currentStatus === 'aprovado') && (
          <button onClick={() => onUpdateStatus(id, 'Em andamento')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Iniciar
          </button>
        )}
        {(currentStatus === 'Em andamento') && (
          <button onClick={() => onUpdateStatus(id, 'Concluído')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Concluir
          </button>
        )}
        {(currentStatus === 'Pendente' || currentStatus === 'Em andamento' || currentStatus === 'aprovado') && (
          <button onClick={() => onUpdateStatus(id, 'Cancelado')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Cancelar
          </button>
        )}
        <button onClick={() => onDeleteProject(id)} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors">
            Excluir
        </button>
      </div>
    </div>
  );
};

const ProjectSection = ({ title, projects, onUpdateStatus, onDeleteProject }) => {
    if (projects.length === 0) return null;

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} onUpdateStatus={onUpdateStatus} onDeleteProject={onDeleteProject} />
                ))}
            </div>
        </section>
    );
};

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [projectsWithDetails, setProjectsWithDetails] = useState([]);
  const [usersWithChats, setUsersWithChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [unreadMessagesMap, setUnreadMessagesMap] = useState(new Map());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatView, setChatView] = useState('list'); // 'list' or 'messages'
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

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

  // Fetch Projects with User Details
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const projectsQuery = query(collection(db, 'projetos'));
    const unsubscribeProjects = onSnapshot(projectsQuery, async (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const detailedProjects = await Promise.all(projectsData.map(async (project) => {
        let userData = { nome: 'Usuário Desconhecido', email: 'N/A' };
        if (project.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'usuarios', project.userId));
            if (userDoc.exists()) {
              userData = userDoc.data();
            }
          } catch (error) {
            console.error("Error fetching user data for project:", project.id, error);
          }
        }
        return { ...project, user: userData };
      }));
      
      setProjectsWithDetails(detailedProjects);
      setLoading(false);
    });

    return () => unsubscribeProjects();
  }, [user]);

  // Fetch Users for Chat List
  useEffect(() => {
    if (!user) return;
    const messagesQuery = query(collection(db, 'mensagens'));
    const unsubscribeMessages = onSnapshot(messagesQuery, async (snapshot) => {
      const userIds = new Set(snapshot.docs.map(doc => doc.data().userId));
      const usersData = [];
      for (const userId of userIds) {
        if (!userId) continue;
        const userDoc = await getDoc(doc(db, 'usuarios', userId));
        if (userDoc.exists()) {
          usersData.push({ uid: userId, ...userDoc.data() });
        }
      }
      setUsersWithChats(usersData);
    });

    return () => unsubscribeMessages();
  }, [user]);
  
  // Fetch unread messages count
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

  // Fetch messages for selected chat and scroll to bottom
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

  useEffect(() => {
    if (chatView === 'messages') {
      scrollToBottom();
    }
  }, [messages, chatView]);


  const handleUpdateProjectStatus = async (projectId, newStatus) => {
    const projectRef = doc(db, 'projetos', projectId);
    try {
      await updateDoc(projectRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const handleDeleteProject = (projectId) => {
    setProjectToDelete(projectId);
    setIsModalOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (projectToDelete) {
      const projectRef = doc(db, 'projetos', projectToDelete);
      try {
        await deleteDoc(projectRef);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
      setProjectToDelete(null);
      setIsModalOpen(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    await addDoc(collection(db, "mensagens"), {
      text: newMessage, userId: selectedChat.uid, sender: 'admin', read: false, timestamp: serverTimestamp()
    });
    setNewMessage('');
  };

  const handleSelectChat = async (chatUser) => {
    setSelectedChat(chatUser);
    setChatView('messages');
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
    // Mark messages as read
    const q = query(collection(db, "mensagens"), where("userId", "==", chatUser.uid), where("sender", "==", "user"), where("read", "==", false));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => updateDoc(doc.ref, { read: true }));
  };
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isChatOpen) {
      setChatView('list');
      setSelectedChat(null);
    }
  };

  const handleBackToList = () => {
    setChatView('list');
    setSelectedChat(null);
  };

  const filteredProjects = useMemo(() => ({
    pending: projectsWithDetails.filter(p => !p.status || p.status === 'Pendente' || p.status === 'aprovado'),
    inProgress: projectsWithDetails.filter(p => p.status === 'Em andamento'),
    completed: projectsWithDetails.filter(p => p.status === 'Concluído'),
    canceled: projectsWithDetails.filter(p => p.status === 'Cancelado'),
  }), [projectsWithDetails]);

  const totalUnreadMessages = useMemo(() => {
    return Array.from(unreadMessagesMap.values()).reduce((acc, count) => acc + count, 0);
  }, [unreadMessagesMap]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando painel...</div>;
  }

  {/* variaveis com estilos */}

  const styleContainerMsg = "flex gap-2 px-4 py-3 bg-white rounded-md";
  const styleInputMsg = "border border-blue-600 py-3 px-2 w-full rounded-md";
  const styleBtnMsg= "border border-green-600 py-3 px-3 bg-blue-600 text-white font-semibold rounded-full";
  

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel do Administrador</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-12">
            {projectsWithDetails.length === 0 ? (
              <p>Não há projetos cadastrados.</p>
            ) : (
              <>
                <ProjectSection title="Todos os Projetos" projects={projectsWithDetails} onUpdateStatus={handleUpdateProjectStatus} onDeleteProject={handleDeleteProject} />
                <ProjectSection title="Projetos Pendentes" projects={filteredProjects.pending} onUpdateStatus={handleUpdateProjectStatus} onDeleteProject={handleDeleteProject} />
                <ProjectSection title="Projetos em Andamento" projects={filteredProjects.inProgress} onUpdateStatus={handleUpdateProjectStatus} onDeleteProject={handleDeleteProject} />
                <ProjectSection title="Projetos Concluídos" projects={filteredProjects.completed} onUpdateStatus={handleUpdateProjectStatus} onDeleteProject={handleDeleteProject} />
                <ProjectSection title="Projetos Cancelados" projects={filteredProjects.canceled} onUpdateStatus={handleUpdateProjectStatus} onDeleteProject={handleDeleteProject} />
              </>
            )}
          </div>
          
          <div className="lg:col-span-1">
            {/* Chat Icon */}
            {!isChatOpen && (
                <div className="fixed bottom-8 right-8 z-20">
                    <button onClick={toggleChat} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        {totalUnreadMessages > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{totalUnreadMessages}</span>
                        )}
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed inset-0 bg-white flex flex-col z-50 md:inset-auto md:bottom-8 md:right-8 md:w-96 md:h-auto md:max-h-[calc(100vh-7rem)] md:rounded-lg md:shadow-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b bg-blue-500 text-white flex-shrink-0 md:rounded-t-lg">
                        {chatView === 'messages' ? (
                            <button onClick={handleBackToList} className="text-white hover:text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                        ) : <div className="w-6"></div>} 
                        <h2 className="text-xl font-semibold">Central de Atendimento</h2>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col min-h-0">
                        {/* List View */}
                        {chatView === 'list' && (
                            <div className="overflow-y-auto">
                                {usersWithChats.map(u => (
                                    <div key={u.uid} onClick={() => handleSelectChat(u)} className={`p-4 cursor-pointer flex justify-between items-center border-b hover:bg-gray-50 ${selectedChat?.uid === u.uid ? 'bg-blue-100' : ''}`}>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            <span>{u.nome}</span>
                                        </div>
                                        {unreadMessagesMap.has(u.uid) && <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{unreadMessagesMap.get(u.uid)}</span>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Message View */}
                        {chatView === 'messages' && selectedChat && (
                            <>
                                <div className="p-4 border-b font-bold text-gray-800 bg-gray-50 flex-shrink-0">Conversa com {selectedChat.nome}</div>
                                <div className="flex-1 p-4 overflow-y-auto space-y-2">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                                            <div className={`my-1 p-3 rounded-lg max-w-xs text-sm ${msg.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                                <p>{msg.text}</p>
                                            </div>
                                            {msg.timestamp && (
                                                <span className={`text-xs text-gray-400 mt-1 px-2 ${msg.sender === 'admin' ? 'text-right' : 'text-left'} w-full`}>
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
                            </>
                        )}
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmDeleteProject} 
        title="Confirmar Exclusão"
      >
        <p>Você tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.</p>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
