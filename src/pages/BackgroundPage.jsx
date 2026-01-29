import { useState } from 'react';
import { removeBackground } from '../api/bgRemoval';
import { Upload, Image as ImageIcon, Loader, Download, Sparkles, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundPage = () => {
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOriginalPreview(URL.createObjectURL(selectedFile));
      setProcessedImage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      const blob = await removeBackground(file);
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      toast.success('Background removed successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'removed-bg.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center sm:text-left">
           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600">Background Removal</h1>
           <p className="mt-2 text-slate-500">Instantly remove backgrounds from your images using advanced AI processing.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original Section */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass rounded-2xl shadow-xl border border-white/40 overflow-hidden flex flex-col h-full group"
           >
             <div className="p-4 border-b border-white/20 bg-white/40 flex justify-between items-center backdrop-blur-md">
                <span className="font-bold text-slate-700 flex items-center gap-2">
                   <div className="p-1.5 bg-indigo-100 rounded-lg">
                      <ImageIcon className="h-4 w-4 text-indigo-600" />
                   </div>
                   Original Image
                </span>
                {originalPreview && (
                   <button 
                     onClick={() => { setFile(null); setOriginalPreview(null); setProcessedImage(null); }}
                     className="px-3 py-1 rounded-full text-xs bg-white text-red-500 border border-red-100 hover:bg-red-50 font-bold transition-colors shadow-sm"
                   >
                     Clear
                   </button>
                )}
             </div>

             <div className="p-8 flex-1 flex flex-col justify-center bg-white/30">
               <div className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center min-h-[350px] ${originalPreview ? 'border-primary-500/50 bg-primary-50/10' : 'border-slate-300 hover:border-primary-400 hover:bg-white/60'}`}>
                 <AnimatePresence mode="wait">
                   {originalPreview ? (
                     <motion.img 
                        key="preview"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        src={originalPreview} 
                        alt="Original" 
                        className="max-h-80 w-auto rounded-xl shadow-lg object-contain" 
                     />
                   ) : (
                     <motion.div
                       key="upload"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="text-center p-6"
                     >
                       <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                          <Upload className="h-10 w-10 text-indigo-500" />
                       </div>
                       <label htmlFor="file-upload" className="relative cursor-pointer">
                         <span className="block text-xl font-bold text-slate-700 hover:text-indigo-600 transition-colors mb-2">
                           Upload Image
                         </span>
                         <span className="block text-sm text-slate-500">Drag & drop or click to browse</span>
                         <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                       </label>
                       <p className="mt-6 text-xs font-medium text-slate-400 bg-white/50 px-3 py-1 rounded-full inline-block">Supported formats: PNG, JPG, JPEG</p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             </div>

             <div className="p-6 pt-0 mt-auto bg-white/30">
               <button
                 onClick={handleUpload}
                 disabled={!file || loading}
                 className="w-full btn-primary py-4 rounded-xl text-base font-bold shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
               >
                 {loading ? (
                   <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Removing Background...
                   </>
                 ) : (
                   <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Remove Background
                   </>
                 )}
               </button>
             </div>
           </motion.div>

           {/* Processed Section */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass rounded-2xl shadow-xl border border-white/40 overflow-hidden flex flex-col h-full"
           >
              <div className="p-4 border-b border-white/20 bg-white/40 backdrop-blur-md">
                 <span className="font-bold text-slate-700 flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                       <RefreshCw className="h-4 w-4 text-green-600" />
                    </div>
                    Processed Result
                 </span>
              </div>
              
              <div className="p-8 flex-1 flex flex-col justify-center bg-white/30">
                 <div className="border border-white/50 rounded-2xl overflow-hidden min-h-[350px] flex items-center justify-center relative bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3itP/WfADjg5OfFqwHdwC379+kWMDwjqR9WAA2DwoOoFygAAr74j4Q3D0/EAAAAASUVORK5CYII=')] bg-repeat shadow-inner">
                    <AnimatePresence mode="wait">
                       {processedImage ? (
                          <motion.img 
                             key="processed"
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             src={processedImage} 
                             alt="Processed" 
                             className="max-h-80 w-auto object-contain relative z-10 drop-shadow-2xl" 
                          />
                       ) : (
                          <motion.div
                             key="empty"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             className="text-center text-slate-400"
                          >
                             <div className="bg-white/80 p-6 rounded-full inline-block mb-4 shadow-sm">
                                <ImageIcon className="h-10 w-10 text-slate-300" />
                             </div>
                             <p className="text-base font-bold text-slate-500">No result yet</p>
                             <p className="text-xs font-medium opacity-60 mt-1">Process an image to see the transparency</p>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </div>

              <div className="p-6 pt-0 mt-auto bg-white/30">
                 <button
                   onClick={handleDownload}
                   disabled={!processedImage}
                   className="w-full flex justify-center items-center py-4 px-4 border border-slate-200 rounded-xl shadow-lg text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] hover:-translate-y-0.5"
                 >
                   <Download className="h-5 w-5 mr-2 text-slate-500" />
                   Download PNG
                 </button>
              </div>
           </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BackgroundPage;
