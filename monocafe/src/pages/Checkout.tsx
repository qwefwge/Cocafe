import { useCart } from '@/context/CartContext';
import { useWallet } from '@/context/WalletContext';
import { useOrders } from '@/context/OrderContext';
import { useCharity } from '@/context/CharityContext';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Trash2, CreditCard, Wallet, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, removeItem, total, clearCart } = useCart();
  const { balance, deductFunds } = useWallet();
  const { addOrder } = useOrders();
  const { addDonation } = useCharity();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr' | 'cash' | 'wallet'>('wallet');

  const charityAmount = 0.35; // Fixed for demo
  const finalTotal = total * 1.08;

  const handlePayment = () => {
    if (paymentMethod === 'wallet') {
      if (balance < finalTotal) {
        toast.error('Insufficient wallet balance. Please top up or choose another method.');
        return;
      }
      deductFunds(finalTotal);
      toast.success('Payment successful!');
    }
    
    // Record the order
    addOrder(items, finalTotal, paymentMethod);
    
    // Record charity donation
    addDonation(charityAmount);

    clearCart();
    navigate('/confirmation', { state: { paymentMethod } });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-24 h-24 bg-coffee-50 rounded-full flex items-center justify-center mb-4 text-4xl">
          🥪
        </div>
        <h2 className="font-hand font-bold text-2xl text-coffee-800 mb-2">Your cart is empty</h2>
        <p className="text-coffee-500 mb-8">Looks like you haven't added anything yet.</p>
        <Button onClick={() => navigate('/')}>Start Ordering</Button>
      </div>
    );
  }

  return (
    <div className="pb-32 pt-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-white shadow-sm">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-hand font-bold text-coffee-800">Checkout</h1>
      </div>

      {/* Order Summary */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <motion.div 
            layout
            key={item.id} 
            className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-coffee-50"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-coffee-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-coffee-800">{item.name}</h3>
                <span className="font-bold text-coffee-600">{formatCurrency(item.price * item.quantity)}</span>
              </div>
              <p className="text-sm text-coffee-400 mb-2">Qty: {item.quantity} {item.options && `• ${item.options.join(', ')}`}</p>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-red-400 text-xs font-bold flex items-center gap-1 hover:text-red-500"
              >
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charity Impact */}
      <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">🌱</div>
        <div>
          <h4 className="font-hand font-bold text-green-800 text-lg">Community Impact</h4>
          <p className="text-xs text-green-700 font-medium">
            {formatCurrency(charityAmount)} from this order supports student charity.
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h3 className="font-hand font-bold text-xl mb-4 text-coffee-800">Payment Method</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={() => setPaymentMethod('wallet')}
            className={cn(
              "flex flex-col items-start gap-2 p-4 rounded-2xl border-2 transition-all relative overflow-hidden",
              paymentMethod === 'wallet'
                ? "border-crimson-500 bg-crimson-50 text-coffee-800"
                : "border-coffee-100 bg-white text-coffee-400 hover:border-coffee-200"
            )}
          >
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center gap-2 font-bold">
                <Wallet size={20} /> Monocafe Wallet
              </div>
              {paymentMethod === 'wallet' && <div className="w-3 h-3 bg-crimson-500 rounded-full" />}
            </div>
            <div className="text-sm">Balance: <span className="font-bold">{formatCurrency(balance)}</span></div>
            {balance < finalTotal && (
              <div className="text-xs text-red-500 font-bold mt-1">Insufficient funds</div>
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'card', icon: CreditCard, label: 'Card' },
            { id: 'qr', icon: QrCode, label: 'QR' },
            { id: 'cash', icon: Wallet, label: 'Cash' },
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id as any)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all",
                paymentMethod === method.id
                  ? "border-coffee-600 bg-coffee-50 text-coffee-800"
                  : "border-coffee-100 bg-white text-coffee-400 hover:border-coffee-200"
              )}
            >
              <method.icon size={24} />
              <span className="text-xs font-bold">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-coffee-50 space-y-3 mb-24">
        <div className="flex justify-between text-coffee-500 text-sm">
          <span>Subtotal</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between text-coffee-500 text-sm">
          <span>Tax (8%)</span>
          <span>{formatCurrency(total * 0.08)}</span>
        </div>
        <div className="h-px bg-coffee-100 my-2" />
        <div className="flex justify-between text-coffee-800 font-bold text-xl">
          <span>Total</span>
          <span>{formatCurrency(finalTotal)}</span>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-coffee-100 max-w-md mx-auto z-50">
        <Button 
          className="w-full rounded-xl shadow-lg shadow-coffee-500/20" 
          size="lg" 
          onClick={handlePayment}
          disabled={paymentMethod === 'wallet' && balance < finalTotal}
        >
          {paymentMethod === 'wallet' && balance < finalTotal ? 'Insufficient Funds' : `Pay ${formatCurrency(finalTotal)}`}
        </Button>
      </div>
    </div>
  );
}
