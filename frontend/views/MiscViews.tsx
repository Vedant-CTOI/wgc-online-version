import React from 'react';
import { PageHeader } from '../components/SharedUI';

interface MiscViewProps {
  onBack: () => void;
}

export const HelpView: React.FC<MiscViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader title="Help & Support" onBack={onBack} />
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900">How do I create a new campaign?</h4>
              <p className="text-gray-600 text-sm mt-1">Navigate to your dashboard and click the "Create New Campaign" button. You can then select a template, choose your aspect ratios, and customize the content.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Can I add multiple stores to one campaign?</h4>
              <p className="text-gray-600 text-sm mt-1">Yes! During the customization step, you can select multiple stores from your account. The platform will automatically generate separate images for each store you select.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">What formats can I download?</h4>
              <p className="text-gray-600 text-sm mt-1">You can download your campaigns in PNG format for digital use (social media, WhatsApp) or PDF format for high-quality printing.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-600 text-sm mb-4">Our support team is available Monday through Friday, 9am to 6pm.</p>
          <a href="mailto:support@platform.com" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary-50 text-primary-700 hover:bg-primary-100 px-4 py-2.5 text-sm">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export const TermsView: React.FC<MiscViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader title="Terms & Conditions" onBack={onBack} />
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-sm sm:prose-base max-w-none text-gray-600">
        <p>Last updated: October 2023</p>
        
        <h3 className="text-gray-900 font-bold mt-6 mb-2">1. Acceptance of Terms</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        
        <h3 className="text-gray-900 font-bold mt-6 mb-2">2. User License</h3>
        <p>Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.</p>
        
        <h3 className="text-gray-900 font-bold mt-6 mb-2">3. Disclaimer</h3>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc.</p>
      </div>
    </div>
  );
};

export const PrivacyView: React.FC<MiscViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader title="Privacy Policy" onBack={onBack} />
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-sm sm:prose-base max-w-none text-gray-600">
        <p>Last updated: October 2023</p>
        
        <h3 className="text-gray-900 font-bold mt-6 mb-2">1. Information We Collect</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
        
        <h3 className="text-gray-900 font-bold mt-6 mb-2">2. How We Use Your Information</h3>
        <p>Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante.</p>
        
        <h3 className="text-gray-900 font-bold mt-6 mb-2">3. Data Security</h3>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.</p>
      </div>
    </div>
  );
};
