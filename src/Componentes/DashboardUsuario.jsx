import React, { useEffect, useState } from 'react';
import { auth, db } from './Config/Database.js';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  getDoc, 
  doc, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Campo from './Campo';
import Select from './Select';
import Chat from './Chat';

const DashboardUsuario = () => {
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    nomeProjeto: '',
    descricao: '',
    tecnologia: ''
  });

  const navigate = useNavigate();
  const tecnologiasOptions = ['React', 'Node.js', 'Python', 'PHP', 'Outro'];

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) {
            setUserData({ ...userDoc.data(), uid: user.uid });
          }

          const q = query(collection(db, 'projetos'), where('userId', '==', user.uid));
          const unsubscribeProjects = onSnapshot(q, (snapshot) => {
            const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);
            setLoading(false);
          });

          return () => unsubscribeProjects();
        } catch (error) {
          console.error("Erro:", error);
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projects.length >= 3 && !editingProject) {
      alert("Limite de 3 projetos atingido.");
      return;
    }

    try {
      if (editingProject) {
        await updateDoc(doc(db, 'projetos', editingProject.id), formData);
      } else {
        await addDoc(collection(db, 'projetos'), {
          ...formData,
          userId: auth.currentUser.uid,
          status: 'pendente',
          createdAt: serverTimestamp()
        });
      }
      closeModal();
    } catch (error) {
      alert("Erro ao salvar projeto.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Excluir este projeto?")) {
      await deleteDoc(doc(db, 'projetos', id));
    }
  };

  const handleApprove = async (id) => {
    await updateDoc(doc(db, 'projetos', id), { status: 'aprovado' });
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({ nomeProjeto: project.nomeProjeto, descricao: project.descricao, tecnologia: project.tecnologia });
    } else {
      setEditingProject(null);
      setFormData({ nomeProjeto: '', descricao: '', tecnologia: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 uppercase">
            BEM-VINDO, {userData?.nome || 'USUÁRIO'}
          </h1>
          <p className="mt-2 text-gray-600">Gerencie seus orçamentos de projetos e fale conosco em tempo real.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Seção de Projetos */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Seus Projetos</h2>
              {projects.length < 3 && (
                <button 
                  onClick={() => openModal()}
                  className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
                >
                  Novo Projeto
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{project.nomeProjeto}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.status === 'aprovado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {project.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 flex-grow">{project.descricao}</p>
                  <p className="text-cyan-600 font-medium text-sm mb-4 italic">#{project.tecnologia}</p>
                  <div className="flex gap-2 mt-auto">
                    <button onClick={() => openModal(project)} className="flex-1 text-xs bg-gray-100 py-2 rounded hover:bg-gray-200">Editar</button>
                    <button onClick={() => handleDelete(project.id)} className="flex-1 text-xs bg-red-50 text-red-600 py-2 rounded hover:bg-red-100">Excluir</button>
                    {project.status !== 'aprovado' && (
                      <button onClick={() => handleApprove(project.id)} className="flex-1 text-xs bg-green-600 text-white py-2 rounded hover:bg-green-700">Aprovar</button>
                    )}
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-400 border-2 border-dashed rounded-xl">
                  Nenhum projeto solicitado ainda.
                </div>
              )}
            </div>
          </section>

          {/* Seção de Chat */}
          <section className="lg:sticky lg:top-24">
             <Chat />
          </section>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{editingProject ? 'Editar Projeto' : 'Solicitar Orçamento'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Campo 
                label="Nome do Projeto" 
                name="nomeProjeto" 
                value={formData.nomeProjeto} 
                onChange={(e) => setFormData({...formData, nomeProjeto: e.target.value})} 
                required 
              />
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
                <textarea 
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-cyan-500 outline-none" 
                  rows="3" 
                  value={formData.descricao} 
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  required
                ></textarea>
              </div>
              <Select 
                label="Tecnologia Principal" 
                options={tecnologiasOptions} 
                value={formData.tecnologia} 
                onChange={(e) => setFormData({...formData, tecnologia: e.target.value})} 
                required 
              />
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={closeModal} className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                <Button text={editingProject ? "Salvar" : "Solicitar"} type="submit" className="flex-1" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUsuario;
