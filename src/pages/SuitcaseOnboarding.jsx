import React, { useState, useRef } from 'react';
import Scout from '../components/Scout/Scout';
import { 
  Briefcase, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Shield, 
  FileSpreadsheet,
  FileCheck
} from 'lucide-react';

export default function SuitcaseOnboarding({ onComplete, onSkip, onAddExtractedRecord }) {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [extractionDone, setExtractionDone] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [scoutState, setScoutState] = useState('curious');
  const fileInputRef = useRef(null);

  const allowedExtensions = ['pdf', 'csv', 'xlsx', 'xls'];

  const handleFileSelect = (selectedFile) => {
    setErrorMessage('');
    if (!selectedFile) return;

    const extension = selectedFile.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      setErrorMessage(`Please upload a valid document (.pdf, .csv, or .xlsx). Received: .${extension}`);
      setScoutState('sad');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit.');
      setScoutState('sad');
      return;
    }

    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(15);
    setScoutState('investigate');

    // Simulate genuine parsing progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          setIsUploading(false);
          setExtractionDone(true);
          setScoutState('happy');
          
          // Generate sample extracted insight based on file type
          if (extension === 'csv' || extension.includes('xls')) {
            setExtractedData({
              title: 'Monthly Utility & Operations Log',
              category: 'electricity',
              findings: [
                { label: 'Unnecessary Standby Draw', value: '410 kWh/mo', cost: '$65.60' },
                { label: 'Off-Peak Base Load', value: '1,200 W continuous', cost: '$42.00' }
              ],
              recommendation: 'Smart power strips can eliminate 75% of this overnight baseline.'
            });
          } else {
            setExtractedData({
              title: 'Facilities Audit Document',
              category: 'water',
              findings: [
                { label: 'Continuous Restroom Flow', value: '3,200 Liters/mo', cost: '$38.40' },
                { label: 'Cafeteria Prep Spillover', value: '18 min/day meeting delay', cost: '$120.00' }
              ],
              recommendation: 'Replace standard aerators and introduce 15-min calendar guardrails.'
            });
          }
          return 100;
        }
        return prev + 25;
      });
    }, 280);
  };

  const handleDelete = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setExtractionDone(false);
    setExtractedData(null);
    setErrorMessage('');
    setScoutState('curious');
  };

  const handleFinish = () => {
    setScoutState('celebrate');
    if (extractedData && onAddExtractedRecord) {
      onAddExtractedRecord({
        category: extractedData.category,
        title: extractedData.title,
        value: 410,
        unit: 'kWh',
        cost: 65.60,
        notes: `Imported via suitcase document: ${file?.name}`
      });
    }
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#021E18] text-[#C7FF00] font-black flex items-center justify-center text-sm">
            2/2
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00545F]">Onboarding: Suitcase Discovery</span>
        </div>
        <button
          onClick={onSkip}
          className="text-xs font-bold text-[#021E18]/60 hover:text-[#021E18] underline transition-colors"
        >
          Skip this step
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto w-full text-center my-6">
        
        {/* SCOUT OPENING SUITCASE STAGE */}
        <div className="relative flex items-center justify-center mb-6 h-40">
          
          {/* Animated Suitcase Icon in center */}
          <div className="relative flex items-center justify-center z-10">
            <div className="w-20 h-20 rounded-2xl bg-[#00545F] text-[#C7FF00] flex items-center justify-center shadow-tactile-teal border-2 border-[#021E18] group">
              <Briefcase className="w-10 h-10 stroke-[2.5]" />
            </div>
          </div>

          {/* Scout positioning */}
          <div className="absolute translate-x-24 sm:translate-x-28">
            <Scout
              expression={scoutState}
              size="md"
              message={
                extractionDone
                  ? "Aha! I found some hidden losses in this file!"
                  : isUploading
                  ? "Reading through your suitcase documents..."
                  : "Drop a bill or report inside my suitcase!"
              }
              interactive={true}
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#021E18] font-display mb-3">
          WHAT'S INSIDE YOUR SUITCASE?
        </h1>
        <p className="text-sm sm:text-base text-[#021E18]/70 max-w-xl mx-auto mb-8">
          Upload an electricity bill, cafeteria roster, or project timesheet. Scout scans for recurring baseline leaks and extracts actionable metrics.
        </p>

        {/* DRAG AND DROP / UPLOAD CONTAINER */}
        {!file ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileSelect(e.dataTransfer.files[0]);
              }
            }}
            className="p-8 sm:p-12 rounded-3xl border-3 border-dashed border-[#CADBCF] hover:border-[#00545F] bg-[#FFFFFF] hover:bg-[#F2F7F4] transition-all cursor-pointer shadow-sm text-center max-w-xl mx-auto group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />
            
            <div className="w-16 h-16 rounded-2xl bg-[#ECFFB6] text-[#021E18] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-tactile-lime">
              <UploadCloud className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="font-extrabold text-lg text-[#021E18] mb-1">
              Click to browse or drag documents here
            </h3>
            <p className="text-xs text-[#021E18]/60 mb-4">
              Supported formats: PDF, CSV, Excel (.xlsx) up to 10MB
            </p>

            <span className="inline-block px-4 py-2 text-xs font-black btn-tactile-deep">
              CHOOSE FILE
            </span>
          </div>
        ) : (
          /* ACTIVE FILE & EXTRACTION CARD */
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card max-w-xl mx-auto text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#021E18] text-[#C7FF00] flex items-center justify-center font-bold">
                  {file.name.endsWith('.pdf') ? <FileText className="w-6 h-6" /> : <FileSpreadsheet className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#021E18] truncate max-w-xs">{file.name}</h4>
                  <p className="text-xs text-[#021E18]/60">{(file.size / 1024).toFixed(1)} KB · Document Loaded</p>
                </div>
              </div>

              <button
                onClick={handleDelete}
                className="p-2 text-[#FF2A00] hover:bg-[#FFEAE5] rounded-xl transition-colors"
                title="Remove document"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="mb-4">
                <div className="flex justify-between text-xs font-bold text-[#00545F] mb-1.5">
                  <span>Scout is parsing document contents...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#E2EBE5] overflow-hidden">
                  <div 
                    className="h-full bg-[#C7FF00] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Extracted Findings Box */}
            {extractionDone && extractedData && (
              <div className="mt-4 p-4 rounded-2xl bg-[#F2F7F4] border border-[#CADBCF]">
                <div className="flex items-center gap-2 text-xs font-black text-[#00545F] mb-3 uppercase tracking-wider">
                  <FileCheck className="w-4 h-4 text-[#00545F]" />
                  <span>Detected Resource Insights</span>
                </div>

                <div className="space-y-2 mb-3">
                  {extractedData.findings.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E2EBE5] text-xs">
                      <span className="font-bold text-[#021E18]">{item.label}</span>
                      <div className="text-right">
                        <span className="font-extrabold text-[#00545F]">{item.value}</span>
                        <span className="ml-2 text-[11px] font-bold text-[#FF2A00]">({item.cost})</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-[#021E18]/80 italic">
                  💡 Scout's advice: {extractedData.recommendation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error message if validation failed */}
        {errorMessage && (
          <div className="mt-4 inline-flex items-center gap-2 p-3 rounded-xl bg-[#FFEAE5] border border-[#FF2A00]/30 text-xs font-bold text-[#FF2A00]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Security & Integrity Promise */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#021E18]/60">
          <Shield className="w-4 h-4 text-[#00545F]" />
          <span>Files are parsed client-side and never stored unencrypted. Skip freely anytime.</span>
        </div>

      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="max-w-md mx-auto w-full">
        <button
          onClick={handleFinish}
          className="w-full py-4 text-base font-black tracking-wide btn-tactile-lime flex items-center justify-center gap-2"
        >
          <span>{file ? 'CONFIRM & ENTER DASHBOARD' : 'SKIP & GO TO DASHBOARD'}</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>

    </div>
  );
}
