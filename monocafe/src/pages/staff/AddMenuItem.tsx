import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '@/context/MenuContext';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import toast from 'react-hot-toast';

export default function AddMenuItem() {
  const navigate = useNavigate();
  const { addItem, categories } = useMenu();

  const [formData, setFormData] = useState({
    name: '',
    category: categories[0].id,
    price: '',
    calories: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    tags: '',
    allergens: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast.error('Please fill in required fields');
      return;
    }

    addItem({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      calories: parseInt(formData.calories) || 0,
      description: formData.description,
      image: formData.image,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      allergens: formData.allergens.split(',').map(t => t.trim()).filter(Boolean)
    });

    toast.success('Item added to menu!');
    navigate('/staff/dashboard');
  };

  return (
    <div className="pb-24 pt-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-hand font-bold text-coffee-800">Add Menu Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Preview */}
        <div className="relative h-48 rounded-2xl bg-coffee-50 overflow-hidden border-2 border-dashed border-coffee-200 group">
          <img src={formData.image} alt="Preview" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
            <div className="bg-white p-2 rounded-full shadow-sm mb-2">
              <Upload size={20} className="text-coffee-600" />
            </div>
            <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">Change Image URL below</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-coffee-600 mb-1">Item Name *</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500/20 outline-none"
              placeholder="e.g. Spicy Chicken Wrap"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-coffee-600 mb-1">Price ($) *</label>
              <input
                required
                type="number"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full p-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500/20 outline-none"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-coffee-600 mb-1">Calories</label>
              <input
                type="number"
                value={formData.calories}
                onChange={e => setFormData({...formData, calories: e.target.value})}
                className="w-full p-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500/20 outline-none"
                placeholder="e.g. 450"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-coffee-600 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full p-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500/20 outline-none bg-white"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-coffee-600 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500/20 outline-none h-24 resize-none"
              placeholder="Describe the ingredients..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-coffee-600 mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})}
              className="w-full p-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500/20 outline-none text-sm text-coffee-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-coffee-600 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
              className="w-full p-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500/20 outline-none"
              placeholder="Spicy, Vegan, Gluten-Free"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-coffee-600 mb-1">Allergens (comma separated)</label>
            <input
              type="text"
              value={formData.allergens}
              onChange={e => setFormData({...formData, allergens: e.target.value})}
              className="w-full p-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500/20 outline-none"
              placeholder="Nuts, Dairy, Soy"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full bg-crimson-500 hover:bg-crimson-600 text-white">
            Add Item to Menu
          </Button>
        </div>
      </form>
    </div>
  );
}
