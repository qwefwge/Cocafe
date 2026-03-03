import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckSquare, Square } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: 'Coffee Beans (Espresso)', checked: false },
    { id: 2, name: 'Coffee Beans (Decaf)', checked: false },
    { id: 3, name: 'Milk (Whole)', checked: false },
    { id: 4, name: 'Milk (Oat)', checked: false },
    { id: 5, name: 'Milk (Almond)', checked: false },
    { id: 6, name: 'Syrup (Vanilla)', checked: false },
    { id: 7, name: 'Syrup (Caramel)', checked: false },
    { id: 8, name: 'Cups (12oz)', checked: false },
    { id: 9, name: 'Cups (16oz)', checked: false },
    { id: 10, name: 'Lids', checked: false },
    { id: 11, name: 'Napkins', checked: false },
    { id: 12, name: 'Sugar Packets', checked: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const handleSubmit = () => {
    toast.success('Inventory check completed!');
    navigate('/staff/dashboard');
  };

  return (
    <div className="pb-24 pt-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-hand font-bold text-coffee-800">Inventory Check</h1>
      </div>

      <div className="bg-white rounded-2xl border border-coffee-50 overflow-hidden">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 p-4 border-b border-coffee-50 last:border-none hover:bg-coffee-50/50 cursor-pointer"
            onClick={() => toggleItem(item.id)}
          >
            <div className={`text-coffee-600 ${item.checked ? 'text-green-500' : ''}`}>
              {item.checked ? <CheckSquare size={24} /> : <Square size={24} />}
            </div>
            <span className={`font-medium text-lg ${item.checked ? 'text-coffee-400 line-through' : 'text-coffee-800'}`}>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <Button className="w-full bg-coffee-600 hover:bg-coffee-700" onClick={handleSubmit}>
        Submit Checklist
      </Button>
    </div>
  );
}
