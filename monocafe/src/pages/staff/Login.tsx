import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StaffLogin() {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin === '1234') {
      toast.success('Welcome back, Staff!');
      navigate('/staff/dashboard');
    } else {
      toast.error('Incorrect PIN');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-coffee-800 flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white">
        <Lock size={32} />
      </div>
      
      <h1 className="text-white font-hand font-bold text-3xl mb-2">Staff Access</h1>
      <p className="text-coffee-200 mb-8">Enter your 4-digit PIN</p>

      <div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-4 h-4 rounded-full transition-colors ${
              pin.length > i ? 'bg-white' : 'bg-white/20'
            }`} 
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="h-16 w-16 rounded-full bg-white/10 text-white font-bold text-2xl hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            {num}
          </button>
        ))}
        <div />
        <button
          onClick={() => handleNumberClick('0')}
          className="h-16 w-16 rounded-full bg-white/10 text-white font-bold text-2xl hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="h-16 w-16 rounded-full text-white/50 hover:text-white transition-colors flex items-center justify-center font-bold"
        >
          ⌫
        </button>
      </div>

      <Button 
        className="mt-8 w-full max-w-[280px] bg-green-500 hover:bg-green-600 text-white border-none"
        onClick={handleSubmit}
        disabled={pin.length !== 4}
      >
        Enter Dashboard
      </Button>
      
      <button onClick={() => navigate('/')} className="mt-6 text-coffee-300 text-sm hover:text-white">
        Back to Kiosk
      </button>
    </div>
  );
}
