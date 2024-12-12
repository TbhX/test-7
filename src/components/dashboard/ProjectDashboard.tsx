import React from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { BackButton } from '../common/BackButton';
import { useProjectData } from './useProjectData';
import { ChatSection } from './sections/ChatSection';
import { FilesSection } from './sections/FilesSection';
import { UpdatesSection } from './sections/UpdatesSection';

export function ProjectDashboard() {
  const {
    project,
    isLoading,
    error,
    sendMessage,
    uploadFile
  } = useProjectData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner size="lg" className="text-indigo-500" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Erreur</h2>
          <p className="text-gray-400">{error || 'Échec du chargement des données'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <BackButton onClick={() => window.location.href = '/'} label="Retour à l'accueil" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Tableau de Bord
          </h1>
          <div className="flex items-center gap-4 text-gray-300">
            <span>Statut: {project.status}</span>
            <span>•</span>
            <span>Dernière mise à jour: {new Date(project.lastUpdate).toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ChatSection
              messages={project.messages}
              onSendMessage={sendMessage}
            />
            <UpdatesSection updates={project.updates} />
          </div>

          <div className="space-y-8">
            <FilesSection
              files={project.files}
              onUploadFile={uploadFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}