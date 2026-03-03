import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '@/context/MenuContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function MenuPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { items, categories } = useMenu();
  
  const category = categories.find(c => c.id === categoryId);
  const categoryItems = items.filter(i => i.category === categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="pb-24 pt-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-white shadow-sm">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-hand font-bold text-coffee-800">{category.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {categoryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/item/${item.id}`)}
          >
            <Card className="overflow-hidden hover:shadow-md transition-all active:scale-[0.99] cursor-pointer border-none bg-white">
              <div className="relative h-48 w-full">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-coffee-800 shadow-sm">
                  {formatCurrency(item.price)}
                </div>
                {item.tags.length > 0 && (
                   <div className="absolute bottom-3 left-3 flex gap-2">
                     {item.tags.map(tag => (
                       <span key={tag} className="px-2 py-1 bg-green-500/90 text-white text-[10px] uppercase font-bold tracking-wider rounded-lg shadow-sm backdrop-blur-sm">
                         {tag}
                       </span>
                     ))}
                   </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-hand font-bold text-xl text-coffee-800">{item.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-coffee-500 bg-coffee-50 px-2 py-1 rounded-md">
                    <span>🔥</span>
                    <span>{item.calories} cal</span>
                  </div>
                </div>
                <p className="text-sm text-coffee-600 mb-4">{item.description}</p>
                
                {item.allergens.length > 0 && (
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] uppercase font-bold text-coffee-400">Contains:</span>
                    {item.allergens.map(allergen => (
                      <span key={allergen} className="text-[10px] px-1.5 py-0.5 border border-coffee-200 rounded text-coffee-500">
                        {allergen}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
