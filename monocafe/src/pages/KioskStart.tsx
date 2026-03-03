import { Button } from '@/components/ui/Button';
import { ShoppingBag, CreditCard, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function KioskStart() {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute top-10 left-10 text-coffee-200 rotate-12">
        <ShoppingBag size={120} strokeWidth={1} />
      </div>
      <div className="absolute bottom-10 right-10 text-coffee-200 -rotate-12">
        <CreditCard size={120} strokeWidth={1} />
      </div>

      <div className="z-10 text-center max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="w-20 h-20 bg-crimson-500 rounded-full flex items-center justify-center text-white font-hand font-bold text-4xl mx-auto mb-4 shadow-lg">M</div>
          <h1 className="font-hand font-bold text-6xl text-coffee-800 mb-2">Monocafe</h1>
          <p className="text-coffee-600 text-xl font-medium">Fresh • Fast • Friendly</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={item}>
            <button 
              onClick={() => navigate('/')}
              className="w-full aspect-square bg-white rounded-[2rem] shadow-xl border-2 border-transparent hover:border-coffee-500 hover:scale-105 transition-all flex flex-col items-center justify-center gap-4 p-6 group"
            >
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors">
                <ShoppingBag size={48} />
              </div>
              <span className="font-hand font-bold text-3xl text-coffee-800">Order</span>
            </button>
          </motion.div>

          <motion.div variants={item}>
            <div className="w-full aspect-square bg-white/50 rounded-[2rem] border-2 border-coffee-100 flex flex-col items-center justify-center gap-4 p-6 opacity-60">
              <div className="w-24 h-24 bg-coffee-100 rounded-full flex items-center justify-center text-coffee-400">
                <CreditCard size={48} />
              </div>
              <span className="font-hand font-bold text-3xl text-coffee-400">Pay</span>
              <span className="text-xs font-bold uppercase tracking-wider text-coffee-400 bg-coffee-100 px-2 py-1 rounded">Step 2</span>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="w-full aspect-square bg-white/50 rounded-[2rem] border-2 border-coffee-100 flex flex-col items-center justify-center gap-4 p-6 opacity-60">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <MapPin size={48} />
              </div>
              <span className="font-hand font-bold text-3xl text-coffee-400">Pick Up</span>
              <span className="text-xs font-bold uppercase tracking-wider text-coffee-400 bg-coffee-100 px-2 py-1 rounded">Step 3</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-coffee-400 font-hand text-xl"
        >
          Touch "Order" to start
        </motion.p>
      </div>

      {/* Hidden/Subtle Staff Access */}
      <button 
        onClick={() => navigate('/staff/login')}
        className="absolute bottom-4 right-4 text-coffee-200 hover:text-coffee-400 transition-colors p-2"
      >
        <div className="w-2 h-2 bg-current rounded-full" />
      </button>
    </div>
  );
}
