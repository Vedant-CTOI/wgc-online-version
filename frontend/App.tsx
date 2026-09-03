import React, { useReducer, useEffect, useState } from 'react';
import { AppState, Action, ViewState, UserProfile, Template, CampaignDraft } from './types';
import { TopNav } from './components/SharedUI';
import { LandingView, RegisterView, LoginView, OTPView, ProfileSetupView } from './views/AuthViews';
import { DashboardView, StoreManagementView } from './views/MainViews';
import { GalleryView, EditorView, PreviewView, GeneratingView, DownloadView } from './views/CampaignViews';
import { HelpView, TermsView, PrivacyView } from './views/MiscViews';
import { MOCK_TEMPLATES } from './constants';

const initialState: AppState = {
  currentView: 'landing',
  user: null,
  draft: null,
  savedCampaigns: [],
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'NAVIGATE':
      // Scroll to top on navigation
      window.scrollTo(0, 0);
      return { ...state, currentView: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: state.user ? { ...state.user, ...action.payload } : null };
    case 'START_CAMPAIGN':
      return { 
        ...state, 
        draft: {
          templateId: action.payload.id,
          selectedStores: state.user?.stores.length ? [state.user.stores[0]] : [],
          logoUrl: state.user?.logoUrl || '',
          useProfileDetails: true,
          selectedSizes: ['1:1'], // Default square
          colorMode: 'color'
        }
      };
    case 'UPDATE_DRAFT':
      return { ...state, draft: state.draft ? { ...state.draft, ...action.payload } : null };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}

const ResponsiveHelper = () => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-xl shadow-2xl z-50 max-w-sm flex items-start space-x-3 transition-opacity">
      <div className="flex-1">
        <p className="text-sm font-bold mb-1 flex items-center">
          <span className="mr-2">📱</span> Responsive Prototype
        </p>
        <p className="text-xs text-gray-300 leading-relaxed">This wireframe adapts to any screen size. Resize your browser window to switch between Desktop (1440px) and Mobile (375px) layouts.</p>
      </div>
      <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white p-1 bg-gray-800 rounded-md transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
};

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions to pass to views
  const navigate = (view: ViewState) => dispatch({ type: 'NAVIGATE', payload: view });
  const login = (user: UserProfile) => dispatch({ type: 'SET_USER', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });
  const startCampaign = (template: Template) => dispatch({ type: 'START_CAMPAIGN', payload: template });
  const updateDraft = (updates: Partial<CampaignDraft>) => dispatch({ type: 'UPDATE_DRAFT', payload: updates });
  const updateUser = (updates: Partial<UserProfile>) => dispatch({ type: 'UPDATE_USER', payload: updates });

  const editCampaign = (campaign: any) => {
    const template = MOCK_TEMPLATES.find(t => t.id === campaign.templateId);
    if (template) {
      dispatch({ type: 'START_CAMPAIGN', payload: template });
      navigate('preview'); // Go to aspect ratio selection first
    }
  };

  // Get full template object for current draft
  const getSelectedTemplate = () => {
    if (!state.draft) return null;
    return MOCK_TEMPLATES.find((t: Template) => t.id === state.draft?.templateId) || null;
  };

  const handleBackToHome = () => {
    navigate(state.user ? 'dashboard' : 'landing');
  };

  // Render the current view
  const renderView = () => {
    switch (state.currentView) {
      case 'landing':
        return <LandingView onNavigate={navigate} onLogin={login} />;
      case 'register':
        return <RegisterView onNavigate={navigate} onLogin={login} />;
      case 'login':
        return <LoginView onNavigate={navigate} onLogin={login} />;
      case 'otp':
        return <OTPView onNavigate={navigate} onLogin={login} />;
      case 'profile_setup':
        return <ProfileSetupView onNavigate={navigate} onLogin={login} />;
      case 'dashboard':
        return state.user ? <DashboardView user={state.user} onNavigate={navigate} onEditCampaign={editCampaign} /> : <LandingView onNavigate={navigate} onLogin={login} />;
      case 'store_management':
        return state.user ? <StoreManagementView user={state.user} onNavigate={navigate} onUpdateUser={updateUser} /> : <LandingView onNavigate={navigate} onLogin={login} />;
      case 'help':
        return <HelpView onBack={handleBackToHome} />;
      case 'terms':
        return <TermsView onBack={handleBackToHome} />;
      case 'privacy':
        return <PrivacyView onBack={handleBackToHome} />;
      case 'gallery':
        return <GalleryView onNavigate={navigate} onSelectTemplate={startCampaign} />;
      case 'editor':
        return <EditorView 
          onNavigate={navigate} 
          selectedTemplate={getSelectedTemplate()} 
          draft={state.draft} 
          updateDraft={updateDraft}
          user={state.user}
        />;
      case 'preview':
        return <PreviewView 
          onNavigate={navigate} 
          selectedTemplate={getSelectedTemplate()} 
          draft={state.draft} 
          updateDraft={updateDraft}
          user={state.user}
        />;
      case 'generating':
        return <GeneratingView onNavigate={navigate} />;
      case 'download':
        return <DownloadView 
          onNavigate={navigate} 
          draft={state.draft} 
          selectedTemplate={getSelectedTemplate()} 
          user={state.user}
        />;
      default:
        return <LandingView onNavigate={navigate} onLogin={login} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <ResponsiveHelper />
      <TopNav 
        isLoggedIn={!!state.user} 
        onNavigate={navigate} 
        onLogout={logout} 
      />
      <main className="flex-grow">
        {renderView()}
      </main>
      
      {/* Simple Footer for Landing */}
      {state.currentView === 'landing' && (
        <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 Platform. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0 text-sm text-gray-500">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('terms'); }} className="hover:text-gray-900">Terms</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('privacy'); }} className="hover:text-gray-900">Privacy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('help'); }} className="hover:text-gray-900">Support</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
