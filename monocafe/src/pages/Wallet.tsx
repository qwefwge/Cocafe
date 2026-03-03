import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowLeft, Wallet as WalletIcon, Plus, History, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function WalletPage() {
  const { balance, addFunds, transactions } = useWallet();
  const navigate = useNavigate();
  const [showTopUp, setShowTopUp] = useState(false);

  const handleTopUp = (amount: number) => {
    // In a real app, this would generate a QR code for the cashier to scan
    // For this demo, we simulate the cashier confirming the cash
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.promise(promise, {
      loading: 'Processing cash top-up...',
      success: `Added ${formatCurrency(amount)} to wallet!`,
      error: 'Failed to add funds',
    });

    promise.then(() => {
      addFunds(amount);
      setShowTopUp(false);
    });
  };

  return (
    <div className="pb-24 pt-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-hand font-bold text-coffee-800">My Wallet</h1>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-coffee-800 to-coffee-900 text-white border-none shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-crimson-500/20 rounded-full -ml-8 -mb-8 blur-xl" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2 text-coffee-200">
              <WalletIcon size={20} />
              <span className="font-medium">Monocafe Balance</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-hand font-bold">M</div>
          </div>
          
          <div className="text-5xl font-bold font-mono tracking-tight mb-2">
            {formatCurrency(balance)}
          </div>
          <p className="text-coffee-200 text-sm">Available to spend</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          className="h-auto py-4 flex flex-col gap-2 bg-crimson-500 hover:bg-crimson-600 text-white border-none shadow-lg shadow-crimson-500/20"
          onClick={() => setShowTopUp(true)}
        >
          <Plus size={24} />
          <span className="font-bold">Top Up Cash</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col gap-2 bg-white border-coffee-100 text-coffee-600"
          onClick={() => navigate('/orders')}
        >
          <History size={24} />
          <span className="font-bold">History</span>
        </Button>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h2 className="text-xl font-hand font-bold text-coffee-800 px-2">Recent Activity</h2>
        <div className="bg-white rounded-2xl border border-coffee-50 overflow-hidden">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 border-b border-coffee-50 last:border-none hover:bg-coffee-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  tx.type === 'credit' ? "bg-green-100 text-green-600" : "bg-coffee-100 text-coffee-600"
                )}>
                  {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <div className="font-bold text-coffee-800">{tx.description}</div>
                  <div className="text-xs text-coffee-400">{tx.date}</div>
                </div>
              </div>
              <div className={cn(
                "font-bold font-mono",
                tx.type === 'credit' ? "text-green-600" : "text-coffee-800"
              )}>
                {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Up Modal */}
      <AnimatePresence>
        {showTopUp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setShowTopUp(false)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-6 z-50 max-w-md mx-auto"
            >
              <div className="w-12 h-1.5 bg-coffee-100 rounded-full mx-auto mb-6" />
              <h2 className="text-2xl font-hand font-bold text-coffee-800 mb-2">Top Up Wallet</h2>
              <p className="text-coffee-500 mb-6">Select an amount to load with cash at the counter.</p>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[5, 10, 20, 50].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleTopUp(amount)}
                    className="py-4 rounded-xl border-2 border-coffee-100 font-bold text-coffee-800 hover:border-crimson-500 hover:bg-crimson-50 transition-colors text-lg"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full" onClick={() => setShowTopUp(false)}>
                Cancel
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
