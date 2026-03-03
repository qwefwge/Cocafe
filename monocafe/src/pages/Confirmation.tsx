import { Button } from '@/components/ui/Button';
import { Check, MapPin, Clock, Ticket } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentMethod } = location.state || { paymentMethod: 'card' };
  const orderNum = Math.floor(Math.random() * 1000) + 100;

  const isCash = paymentMethod === 'cash';

  return (
    <div className="min-h-screen bg-coffee-600 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl ${isCash ? 'bg-orange-400 shadow-orange-900/20' : 'bg-green-500 shadow-green-900/20'}`}
      >
        {isCash ? <Ticket size={40} strokeWidth={2} /> : <Check size={40} strokeWidth={4} />}
      </motion.div>

      <h1 className="font-hand font-bold text-4xl mb-2">
        {isCash ? 'Pay at Counter' : 'Order Confirmed!'}
      </h1>
      <p className="text-coffee-100 mb-8">
        {isCash ? 'Please show this ticket to the cashier.' : "Sit tight, we're making it fresh."}
      </p>

      <div className="bg-white text-coffee-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl relative">
        {/* Ticket cutout effect */}
        <div className="absolute -left-3 top-1/2 w-6 h-6 bg-coffee-600 rounded-full" />
        <div className="absolute -right-3 top-1/2 w-6 h-6 bg-coffee-600 rounded-full" />
        
        <div className="text-sm text-coffee-400 uppercase tracking-widest font-bold mb-1">Order Number</div>
        <div className="text-5xl font-mono font-bold mb-8">#{orderNum}</div>

        <div className="w-48 h-48 bg-coffee-800 mx-auto rounded-xl mb-6 flex items-center justify-center text-white/20 overflow-hidden relative">
          {/* Placeholder for QR Code */}
          <div className="absolute inset-0 p-4 grid grid-cols-5 gap-1 opacity-50">
             {Array.from({length: 25}).map((_, i) => (
               <div key={i} className={`w-full h-full rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />
             ))}
          </div>
          {isCash && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <span className="font-bold text-white text-center px-4">Scan at Register</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-coffee-50 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-coffee-500 text-xs font-bold uppercase mb-1">
              <Clock size={12} /> Est. Time
            </div>
            <div className="font-bold text-lg">12:45 PM</div>
          </div>
          <div className="bg-coffee-50 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-coffee-500 text-xs font-bold uppercase mb-1">
              <MapPin size={12} /> Pickup
            </div>
            <div className="font-bold text-lg">Shelf A</div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 w-full max-w-sm">
        <Button className="w-full bg-white text-coffee-800 hover:bg-coffee-50" onClick={() => navigate('/')}>
          Back to Home
        </Button>
        {!isCash && (
          <button className="text-coffee-200 text-sm font-bold hover:text-white transition-colors">
            Track my order
          </button>
        )}
      </div>
    </div>
  );
}
