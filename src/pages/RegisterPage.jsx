import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, ArrowRight, Loader, User } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(email, password);
    setLoading(false);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-hidden">
        {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-400/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-400/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full max-w-xl z-10 relative">
        <div className="mx-auto w-full max-w-sm lg:w-96 p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <span className="text-white font-bold text-xl">S</span>
               </div>
               <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 tracking-tight">StudentSys</span>
            </div>
            
            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start managing your students efficiently today.
            </p>
          </motion.div>

          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <div className="mt-1 relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-10"
                      placeholder="Enter your email"
                    />
                  </div>
                </motion.div>

                <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 }}
                >
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="mt-1 relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pl-10"
                      placeholder="min 8 chars"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex justify-center items-center"
                  >
                     {loading ? (
                       <Loader className="animate-spin h-5 w-5" />
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>

              <div className="mt-6 text-center">
                 <p className="text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                      Sign in instead
                    </Link>
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Image/Feature */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 h-full w-full object-cover">
           {/* Abstract Background */}
           <div className="absolute inset-0 bg-gradient-to-bl from-secondary-900 via-slate-900 to-primary-900" />
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay" />
           
           {/* Decorative elements */}
           <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl filter animate-pulse-slow" />
           <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl filter animate-pulse-slow" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-20 z-10 text-white">
          <blockquote className="space-y-4">
             <div className="h-1 w-20 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mb-6"></div>
             <p className="text-2xl font-light leading-relaxed opacity-90">
                &ldquo;Join thousands of educational institutions using StudentSys to streamline their operations and focus on what matters most - education.&rdquo;
             </p>
             <footer className="mt-8">
                <p className="text-lg font-bold text-white">StudentSys Team</p>
                <p className="text-sm text-secondary-200">Building the Future</p>
             </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
