import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { 
  Smartphone, 
  X, 
  Copy, 
  Check, 
  Share2, 
  Download, 
  WifiOff, 
  ExternalLink,
  Sparkles,
  QrCode
} from 'lucide-react';

interface OpenOnPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const OpenOnPhoneModal: React.FC<OpenOnPhoneModalProps> = ({
  isOpen,
  onClose,
  isDarkMode = false,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'ios' | 'android' | 'flutter'>('qr');

  // Determine current public URL
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://ais-pre-6cu7b6465uywj3zciicgbn-781986126564.asia-east1.run.app';

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(currentUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#004D35',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR:', err));
  }, [isOpen, currentUrl]);

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF6EF] dark:bg-emerald-950/80 text-[#006B45] dark:text-emerald-400 flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Use on Your Phone</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Open instantly or install as a native home-screen app
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 flex gap-2 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-2 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'qr'
                ? 'border-[#006B45] text-[#006B45] dark:text-emerald-400 dark:border-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR Code</span>
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`pb-2.5 px-2 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ios'
                ? 'border-[#006B45] text-[#006B45] dark:text-emerald-400 dark:border-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>iPhone / Safari</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`pb-2.5 px-2 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'android'
                ? 'border-[#006B45] text-[#006B45] dark:text-emerald-400 dark:border-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Android / Chrome</span>
          </button>

          <button
            onClick={() => setActiveTab('flutter')}
            className={`pb-2.5 px-2 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'flutter'
                ? 'border-[#006B45] text-[#006B45] dark:text-emerald-400 dark:border-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flutter APK</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'qr' && (
            <div className="flex flex-col items-center text-center">
              {/* Alert explaining why 404 happens before Share */}
              <div className="w-full mb-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-left flex items-start gap-2 text-xs">
                <div className="text-amber-600 dark:text-amber-400 font-bold shrink-0 mt-0.5">💡 Tip:</div>
                <div className="text-amber-800 dark:text-amber-200 text-[11px] leading-relaxed">
                  If the link says <em>"Page not found"</em>, click the <strong>"Share"</strong> button in the top-right corner of Google AI Studio to publish and activate the public link for your phone!
                </div>
              </div>

              <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 mb-3 ring-4 ring-emerald-50 dark:ring-emerald-950/40">
                {qrDataUrl ? (
                  <img 
                    src={qrDataUrl} 
                    alt="Scan to open on phone" 
                    className="w-48 h-48 rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
                    Generating QR code...
                  </div>
                )}
              </div>

              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Scan with your phone camera or copy the link below
              </p>

              {/* Direct link box */}
              <div className="w-full flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <input 
                  type="text" 
                  readOnly 
                  value={currentUrl} 
                  className="flex-1 bg-transparent text-xs font-mono px-2 outline-none text-slate-600 dark:text-slate-300 truncate select-all"
                />
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#006B45] text-white text-xs font-bold hover:bg-[#004D35] transition shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ios' && (
            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="w-6 h-6 rounded-full bg-[#006B45] text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">Open in Safari</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Scan the QR code or paste the link into the Safari browser on your iPhone.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="w-6 h-6 rounded-full bg-[#006B45] text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">Tap the Share Button</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Tap the Share icon at the bottom of the Safari screen (square with arrow pointing up).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="w-6 h-6 rounded-full bg-[#006B45] text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">Select "Add to Home Screen"</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Scroll down and tap <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>. EduAttend will appear as an app icon on your iPhone!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'android' && (
            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="w-6 h-6 rounded-full bg-[#006B45] text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">Open in Chrome</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Scan the QR code or paste the link into Google Chrome on your Android phone.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="w-6 h-6 rounded-full bg-[#006B45] text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">Tap the Three Dots Menu (⋮)</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">In the top right corner of Chrome, tap the three vertical dots.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="w-6 h-6 rounded-full bg-[#006B45] text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">Tap "Install App" or "Add to Home screen"</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Chrome will install EduAttend directly onto your home screen with offline capability and standalone mode.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flutter' && (
            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <p className="font-bold text-xs">Complete Flutter Source with Android Scaffold</p>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Includes full Dart code, Android Gradle scripts, AndroidManifest.xml, QR scanner, and offline SQLite sync.
                </p>
                <a
                  href="/api/download/flutter-app"
                  download="eduattend-flutter-app.zip"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#006B45] hover:bg-[#004D35] text-white font-bold text-xs shadow-sm transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Flutter Android Source (.ZIP)</span>
                </a>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">Build APK on your computer or GitHub:</p>
                <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto">
                  <code>
                    1. Extract the downloaded zip<br/>
                    2. cd flutter_app<br/>
                    3. flutter build apk --release
                  </code>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Output APK: <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">build/app/outputs/flutter-apk/app-release.apk</code>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <WifiOff className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Works offline in Cambodian classrooms</span>
          </div>
          <button 
            onClick={() => window.open(currentUrl, '_blank')}
            className="font-bold text-[#006B45] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
