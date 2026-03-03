import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CashRecon() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    hundreds: 0,
    fifties: 0,
    twenties: 0,
    tens: 0,
    fives: 0,
    ones: 0,
    coins: 0,
  });

  const total = 
    counts.hundreds * 100 +
    counts.fifties * 50 +
    counts.twenties * 20 +
    counts.tens * 10 +
    counts.fives * 5 +
    counts.ones * 1 +
    counts.coins;

  const handleChange = (field: keyof typeof counts, value: string) => {
    const num = parseInt(value) || 0;
    setCounts(prev => ({ ...prev, [field]: num }));
  };

  const handleSubmit = () => {
    toast.success(`Reconciliation complete. Total: ${formatCurrency(total)}`);
    navigate('/staff/dashboard');
  };

  return (
    <div className="pb-24 pt-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-hand font-bold text-coffee-800">Cash Recon</h1>
      </div>

      <div className="bg-white rounded-2xl border border-coffee-50 p-6 space-y-4">
        {[
          { label: '$100 Bills', field: 'hundreds' },
          { label: '$50 Bills', field: 'fifties' },
          { label: '$20 Bills', field: 'twenties' },
          { label: '$10 Bills', field: 'tens' },
          { label: '$5 Bills', field: 'fives' },
          { label: '$1 Bills', field: 'ones' },
        ].map((item) => (
          <div key={item.field} className="flex items-center justify-between">
            <label className="font-bold text-coffee-700">{item.label}</label>
            <input
              type="number"
              className="w-24 p-2 rounded-lg border border-coffee-200 text-right font-mono"
              value={counts[item.field as keyof typeof counts] || ''}
              onChange={(e) => handleChange(item.field as keyof typeof counts, e.target.value)}
              placeholder="0"
            />
          </div>
        ))}
        
        <div className="flex items-center justify-between pt-4 border-t border-coffee-100">
          <label className="font-bold text-coffee-700">Total Coins ($)</label>
          <input
            type="number"
            step="0.01"
            className="w-24 p-2 rounded-lg border border-coffee-200 text-right font-mono"
            value={counts.coins || ''}
            onChange={(e) => setCounts(prev => ({ ...prev, coins: parseFloat(e.target.value) || 0 }))}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="bg-coffee-800 text-white p-6 rounded-2xl flex justify-between items-center">
        <span className="font-hand font-bold text-xl">Total Counted</span>
        <span className="font-mono font-bold text-2xl">{formatCurrency(total)}</span>
      </div>

      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
        Submit Reconciliation
      </Button>
    </div>
  );
}
