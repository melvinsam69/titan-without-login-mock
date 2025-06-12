// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateInitiative from './components/CreateInitiative';
import CreateProject from './components/CreateProject';
import DelayManagement from './components/DelayManagement';
import ReportPage from './components/ReportPage';
import InitiativeDetails from './components/InitiativeDetails';
import { Initiative, Project } from './types';
import Header from './components/Header';

function App() {
  const [initiatives, setInitiatives] = React.useState<Initiative[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleInitiativeSubmit = (initiative: Initiative) => {
    setInitiatives((prev) => [...prev, initiative]);
  };

  const handleProjectSubmit = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <Routes>
        {/* Default route redirects to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* All routes are now public */}
        <Route
          path="/dashboard"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
              <Header onSidebarToggle={toggleSidebar} />
              <Sidebar isOpen={isSidebarOpen} />
              <main className={`${isSidebarOpen ? 'ml-80' : 'ml-16'} min-h-screen pt-16 transition-all duration-300`}>
                <div className="container mx-auto px-8 py-8">
                  <Dashboard initiatives={initiatives} projects={projects} />
                </div>
              </main>
            </div>
          }
        />
        <Route
          path="/create-initiative"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
              <Header onSidebarToggle={toggleSidebar} />
              <Sidebar isOpen={isSidebarOpen} />
              <main className={`${isSidebarOpen ? 'ml-80' : 'ml-16'} min-h-screen pt-16 transition-all duration-300`}>
                <div className="container mx-auto px-8 py-8">
                  <CreateInitiative onInitiativeSubmit={handleInitiativeSubmit} />
                </div>
              </main>
            </div>
          }
        />
        <Route
          path="/create-project"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
              <Header onSidebarToggle={toggleSidebar} />
              <Sidebar isOpen={isSidebarOpen} />
              <main className={`${isSidebarOpen ? 'ml-80' : 'ml-16'} min-h-screen pt-16 transition-all duration-300`}>
                <div className="container mx-auto px-8 py-8">
                  <CreateProject initiatives={initiatives} onProjectSubmit={handleProjectSubmit} />
                </div>
              </main>
            </div>
          }
        />
        <Route
          path="/delay-management"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
              <Header onSidebarToggle={toggleSidebar} />
              <Sidebar isOpen={isSidebarOpen} />
              <main className={`${isSidebarOpen ? 'ml-80' : 'ml-16'} min-h-screen pt-16 transition-all duration-300`}>
                <div className="container mx-auto px-8 py-8">
                  <DelayManagement />
                </div>
              </main>
            </div>
          }
        />
        <Route
          path="/reports"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
              <Header onSidebarToggle={toggleSidebar} />
              <Sidebar isOpen={isSidebarOpen} />
              <main className={`${isSidebarOpen ? 'ml-80' : 'ml-16'} min-h-screen pt-16 transition-all duration-300`}>
                <div className="container mx-auto px-8 py-8">
                  <ReportPage initiatives={initiatives} projects={projects} />
                </div>
              </main>
            </div>
          }
        />
        <Route
          path="/initiative/:id"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
              <Header onSidebarToggle={toggleSidebar} />
              <Sidebar isOpen={isSidebarOpen} />
              <main className={`${isSidebarOpen ? 'ml-80' : 'ml-16'} min-h-screen pt-16 transition-all duration-300`}>
                <div className="container mx-auto px-8 py-8">
                  <InitiativeDetails initiatives={initiatives} />
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;