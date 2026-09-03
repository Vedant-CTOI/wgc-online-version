import React, { useState } from 'react';
import { Button, PageHeader, Input } from '../components/SharedUI';
import { ViewState, UserProfile, StoreInfo } from '../types';
import { Plus, Image as ImageIcon, Clock, MoreVertical, Download, Heart, Trash2 } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  onNavigate: (view: ViewState) => void;
  onEditCampaign: (campaign: any) => void;
}

const GRAY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23e5e7eb'/%3E%3Cpath d='M200 220a20 20 0 1 0 0-40 20 20 0 0 0 0 40zm-40 60l30-40 20 20 40-50 30 70H160z' fill='%239ca3af'/%3E%3C/svg%3E";

export const DashboardView: React.FC<DashboardProps> = ({ user, onNavigate, onEditCampaign }) => {
  // Mock saved campaigns with dummy data and categories
  const [savedCampaigns, setSavedCampaigns] = useState([
    { id: 'c1', name: 'Diwali Special', date: 'Oct 24, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Festival', templateId: 't1', ratioClass: 'aspect-square' },
    { id: 'c2', name: 'Weekend Sale', date: 'Oct 22, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Discount', templateId: 't2', ratioClass: 'aspect-[9/16]' },
    { id: 'c3', name: 'Winter Collection', date: 'Oct 15, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'New Arrival', templateId: 't3', ratioClass: 'aspect-video' },
    { id: 'c4', name: 'Store Launch', date: 'Oct 10, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Opening', templateId: 't4', ratioClass: 'aspect-[4/5]' },
  ]);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleFilter = (category: string) => {
    setActiveFilter(prev => prev === category ? null : category);
  };

  const filteredCampaigns = activeFilter 
    ? savedCampaigns.filter(c => c.category === activeFilter)
    : savedCampaigns;

  const handleDownload = (e: React.MouseEvent, campaignName: string) => {
    e.stopPropagation();
    alert(`Downloading ${campaignName} as a ZIP file...`);
  };

  const handleDelete = (id: string) => {
    setSavedCampaigns(prev => prev.filter(c => c.id !== id));
    setOpenMenuId(null);
  };

  const handleFavorite = (name: string) => {
    alert(`${name} added to favourites!`);
    setOpenMenuId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" onClick={() => setOpenMenuId(null)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user.businessName}</h1>
          <p className="text-gray-600 mt-1">Ready to create your next promotion?</p>
        </div>
        <Button size="lg" onClick={() => onNavigate('gallery')} className="w-full sm:w-auto shadow-md">
          <Plus className="w-5 h-5 mr-2" /> Create New Campaign
        </Button>
      </div>

      {/* Quick Stats / Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {['Festival', 'Discount', 'New Arrival', 'Opening'].map((cat) => (
          <div 
            key={cat} 
            onClick={() => toggleFilter(cat)} 
            className={`p-4 rounded-xl border shadow-sm transition-all cursor-pointer flex flex-col items-center justify-center text-center group
              ${activeFilter === cat ? 'bg-primary-50 border-primary-300 shadow-md' : 'bg-white border-gray-200 hover:shadow-md hover:border-primary-300'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
              ${activeFilter === cat ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600 group-hover:bg-primary-100'}`}>
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className={`font-medium text-sm ${activeFilter === cat ? 'text-primary-700' : 'text-gray-800'}`}>{cat}</span>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Your Recent campaigns {activeFilter && <span className="text-primary-600 font-medium text-lg ml-2">({activeFilter})</span>}
          </h2>
          {activeFilter && (
            <button onClick={() => setActiveFilter(null)} className="text-sm text-gray-500 hover:text-gray-900">
              Clear filter
            </button>
          )}
        </div>
        
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-all cursor-pointer flex flex-col"
                onClick={() => onEditCampaign(campaign)}
              >
                <div className={`${campaign.ratioClass} bg-gray-100 relative overflow-hidden flex items-center justify-center`}>
                  <img src={campaign.thumbnail} alt={campaign.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors" 
                      title="Download"
                      onClick={(e) => handleDownload(e, campaign.name)}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center relative mt-auto border-t border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{campaign.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{campaign.date}</p>
                    <p className="text-xs text-gray-400 mt-0.5">By {user.name || 'User'}</p>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === campaign.id ? null : campaign.id);
                    }}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === campaign.id && (
                    <div className="absolute right-4 bottom-12 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-10" onClick={e => e.stopPropagation()}>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        onClick={() => handleFavorite(campaign.name)}
                      >
                        <Heart className="w-4 h-4 mr-2 text-gray-400" /> Add to favourites
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        onClick={() => handleDelete(campaign.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete campaign
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              {activeFilter ? `You haven't created any ${activeFilter} campaigns yet.` : "You haven't created any promotional materials yet."}
            </p>
            <Button onClick={() => onNavigate('gallery')}>Browse Templates</Button>
          </div>
        )}
      </div>
    </div>
  );
};

interface StoreManagementProps {
  user: UserProfile;
  onNavigate: (view: ViewState) => void;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

export const StoreManagementView: React.FC<StoreManagementProps> = ({ user, onNavigate, onUpdateUser }) => {
  const [stores, setStores] = useState<StoreInfo[]>(user.stores || []);

  const handleAddStore = () => {
    setStores([...stores, { id: `s${Date.now()}`, name: '', address: '', contactNumber: '' }]);
  };

  const handleRemoveStore = (idToRemove: string) => {
    if (stores.length > 1) {
      setStores(stores.filter(s => s.id !== idToRemove));
    }
  };

  const handleStoreChange = (id: string, field: keyof StoreInfo, value: string) => {
    setStores(stores.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = () => {
    onUpdateUser({ stores });
    onNavigate('dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader title="Store Management" onBack={() => onNavigate('dashboard')} />
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-600 mb-6">Manage the store details that will be available to auto-fill in your campaigns.</p>
        
        <div className="space-y-6">
          {stores.map((store, index) => (
            <div key={store.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
              {stores.length > 1 && (
                <button 
                  type="button"
                  onClick={() => handleRemoveStore(store.id)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Store {index + 1}</h4>
              <Input 
                label="Store Name" 
                placeholder="e.g. Sharma Electronics"
                value={store.name}
                onChange={(e) => handleStoreChange(store.id, 'name', e.target.value)}
                required
              />
              <Input 
                label="Store Address" 
                placeholder="e.g. 123 Main St, City"
                value={store.address}
                onChange={(e) => handleStoreChange(store.id, 'address', e.target.value)}
                required
              />
              <Input 
                label="Store Contact Number" 
                placeholder="e.g. 98765 43210"
                value={store.contactNumber}
                onChange={(e) => handleStoreChange(store.id, 'contactNumber', e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          fullWidth 
          className="mt-6 border-dashed"
          onClick={handleAddStore}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Another Store
        </Button>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};
