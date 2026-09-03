export type ViewState = 
  | 'landing' 
  | 'register' 
  | 'login'
  | 'otp' 
  | 'profile_setup' 
  | 'dashboard' 
  | 'gallery' 
  | 'editor' 
  | 'preview' 
  | 'generating' 
  | 'download'
  | 'store_management'
  | 'help'
  | 'terms'
  | 'privacy';

export interface StoreInfo {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
}

export interface UserProfile {
  name: string;
  userId: string;
  mobile: string;
  email?: string;
  gst: string;
  businessName: string;
  storeDetails: string;
  stores: StoreInfo[];
  logoUrl?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  ratioClass: string;
  defaultText: {
    headline: string;
    subheadline: string;
    offer: string;
  };
  colorScheme: {
    bg: string;
    text: string;
    accent: string;
  };
}

export interface CampaignDraft {
  templateId: string;
  selectedStores: StoreInfo[];
  logoUrl: string;
  useProfileDetails: boolean;
  selectedSizes: string[];
  colorMode: 'color' | 'bw';
}

export interface AppState {
  currentView: ViewState;
  user: UserProfile | null;
  draft: CampaignDraft | null;
  savedCampaigns: any[];
}

export type Action =
  | { type: 'NAVIGATE'; payload: ViewState }
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'UPDATE_USER'; payload: Partial<UserProfile> }
  | { type: 'START_CAMPAIGN'; payload: Template }
  | { type: 'UPDATE_DRAFT'; payload: Partial<CampaignDraft> }
  | { type: 'SAVE_CAMPAIGN' }
  | { type: 'LOGOUT' };
