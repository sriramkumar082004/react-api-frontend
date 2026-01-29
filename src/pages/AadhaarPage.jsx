import { useState } from 'react';
import { extractAadhaar } from '../api/aadhaar';
import { Upload, FileText, AlertTriangle, Loader, CheckCircle, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const AadhaarPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setData(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      const result = await extractAadhaar(file);
      setData(result);
      toast.success('Extraction successful');
    } catch (error) {
      console.error(error);
      toast.error('Failed to extract data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center sm:text-left">
           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600">Aadhaar Extraction</h1>
           <p className="mt-2 text-slate-500">Upload an Aadhaar card image to automatically extract details using AI OCR.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-2xl shadow-xl h-fit border border-white/40"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3.5 bg-primary-50 rounded-2xl shadow-inner">
                  <Upload className="h-6 w-6 text-primary-600" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-slate-800">Upload Card</h2>
                  <p className="text-sm text-slate-500">Supports JPG, PNG up to 10MB</p>
               </div>
            </div>
            
            <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${preview ? 'border-primary-500 bg-primary-50/10' : 'border-slate-200 hover:border-primary-400 hover:bg-white/50'}`}>
              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div 
                     key="preview"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="relative group"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                      <img src={preview} alt="Preview" className="max-h-64 mx-auto object-contain bg-white" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => { setFile(null); setPreview(null); setData(null); }}
                          className="bg-white text-red-500 rounded-full p-3 shadow-xl hover:bg-red-50 transition-transform hover:scale-110"
                        >
                          <span className="sr-only">Remove</span>
                          <XIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center text-sm text-green-600 font-bold bg-green-50 py-2 px-4 rounded-full w-fit mx-auto border border-green-100">
                       <CheckCircle className="h-4 w-4 mr-2" />
                       Ready to extract
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload-placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8"
                  >
                    <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                       <Smartphone className="h-10 w-10 text-primary-500" />
                    </div>
                    <label htmlFor="file-upload" className="relative cursor-pointer group">
                      <span className="block text-lg font-bold text-slate-700 group-hover:text-primary-600 transition-colors">
                        Click to upload
                      </span>
                      <span className="block text-sm text-slate-400 mt-2">or drag and drop here</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="mt-8 w-full btn-primary py-4 rounded-xl text-base font-bold shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <>
                   <Loader className="animate-spin h-5 w-5 mr-2" />
                   Processing Image...
                </>
              ) : 'Extract Details'}
            </button>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-2xl shadow-xl h-fit border border-white/40"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3.5 bg-green-50 rounded-2xl shadow-inner">
                  <FileText className="h-6 w-6 text-green-600" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-slate-800">Extraction Results</h2>
                  <p className="text-sm text-slate-500">View extracted information below</p>
               </div>
            </div>

            {data ? (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="space-y-6"
              >
                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="p-5 bg-white/60 rounded-xl border border-slate-200 group-hover:border-primary-300 transition-all shadow-sm">
                    <p className="text-xl text-slate-900 font-bold">{data.name || 'Not found'}</p>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date of Birth / Age</label>
                   <div className="p-5 bg-white/60 rounded-xl border border-slate-200 group-hover:border-primary-300 transition-all shadow-sm">
                    <p className="text-xl text-slate-900 font-medium">{data.dob || data.age || 'Not found'}</p>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Aadhaar Number</label>
                   <div className="p-5 bg-primary-50/50 rounded-xl border border-primary-200 group-hover:border-primary-400 transition-all shadow-inner">
                    <p className="text-2xl font-mono text-primary-700 tracking-wider font-bold">{data.aadhaar_number || 'Not found'}</p>
                  </div>
                </div>
                
                {/* Validation Warnings */}
                {(!data.name || !data.aadhaar_number) && (
                  <div className="rounded-xl bg-orange-50 p-4 border border-orange-100 flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-orange-500" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-orange-800">Extraction Incomplete</h3>
                      <p className="mt-1 text-xs text-orange-700 font-medium">Some fields could not be extracted confidently. Please verify the image clarity.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-80 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
                <div className="p-4 bg-slate-100 rounded-full mb-4">
                   <FileText className="h-10 w-10 text-slate-300" />
                </div>
                <p className="text-base font-bold text-slate-500">No results to display</p>
                <p className="text-sm opacity-70 mt-1">Upload a file to see extracted data</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

const XIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default AadhaarPage;
