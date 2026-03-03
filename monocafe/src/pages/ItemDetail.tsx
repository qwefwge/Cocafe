import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '@/context/MenuContext';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Minus, Plus, Heart, Info } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function ItemDetail() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { items } = useMenu();
  const item = items.find(i => i.id === itemId);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [note, setNote] = useState('');

  if (!item) return <div>Item not found</div>;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      options: [selectedSize, note].filter(Boolean)
    });
    toast.success(`Added ${quantity} ${item.name} to cart!`);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white pb-24 relative">
      {/* Image Header */}
      <div className="relative h-72 w-full">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/30 to-transparent">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 rounded-full">
            <ArrowLeft size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 rounded-full">
            <Heart size={24} />
          </Button>
        </div>
      </div>

      {/* Content Container - Overlaps image */}
      <div className="-mt-8 relative z-10 bg-white rounded-t-[2rem] p-6 shadow-lg min-h-[50vh]">
        <div className="w-12 h-1.5 bg-coffee-100 rounded-full mx-auto mb-6" />
        
        <div className="flex justify-between items-start mb-2">
          <h1 className="font-hand font-bold text-3xl text-coffee-800 max-w-[70%] leading-tight">{item.name}</h1>
          <div className="text-right">
            <div className="font-sans font-bold text-2xl text-coffee-800">{formatCurrency(item.price)}</div>
            <div className="text-sm text-coffee-500">{item.calories} kcal</div>
          </div>
        </div>

        <p className="text-coffee-600 mb-6 leading-relaxed">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {item.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-100">
              {tag}
            </span>
          ))}
          {item.allergens.map(allergen => (
             <span key={allergen} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-full border border-orange-100 flex items-center gap-1">
               <Info size={12} /> Contains {allergen}
             </span>
          ))}
        </div>

        {/* Customization */}
        <div className="space-y-6">
          <div>
            <h3 className="font-hand font-bold text-xl mb-3 text-coffee-800">Size</h3>
            <div className="flex gap-3">
              {['Small', 'Regular', 'Large'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "flex-1 py-3 rounded-xl border-2 font-bold transition-all",
                    selectedSize === size 
                      ? "border-coffee-600 bg-coffee-50 text-coffee-800" 
                      : "border-coffee-100 text-coffee-400 hover:border-coffee-200"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-hand font-bold text-xl mb-3 text-coffee-800">Special Instructions</h3>
            <textarea 
              className="w-full p-4 rounded-xl bg-coffee-50 border-none focus:ring-2 focus:ring-coffee-500/20 placeholder:text-coffee-300 min-h-[100px]"
              placeholder="Any allergies? Extra sauce? Let us know..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-coffee-100 flex items-center gap-4 max-w-md mx-auto z-50">
        <div className="flex items-center gap-3 bg-coffee-50 rounded-xl p-1">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm text-coffee-800 hover:bg-coffee-100 transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="font-bold text-lg w-6 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm text-coffee-800 hover:bg-coffee-100 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        <Button className="flex-1 rounded-xl" onClick={handleAddToCart}>
          Add to Order • {formatCurrency(item.price * quantity)}
        </Button>
      </div>
    </div>
  );
}
