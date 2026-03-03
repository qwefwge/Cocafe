import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { useMenu } from '@/context/MenuContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { cn, formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const { items, categories } = useMenu();

  return (
    <div className="space-y-8 pb-24">
      {/* Hero / Welcome */}
      <section className="space-y-2 mt-4">
        <h1 className="text-4xl font-hand font-bold text-coffee-800">
          Good Morning! ☀️
        </h1>
        <p className="text-coffee-600 font-sans">
          Hungry? Let's get you something good.
        </p>
      </section>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400 h-5 w-5" />
        <input 
          type="text" 
          placeholder="Search for wraps, drinks..." 
          className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white border border-coffee-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 font-sans placeholder:text-coffee-300"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-coffee-50 rounded-xl text-coffee-600 hover:bg-coffee-100">
          <Filter size={18} />
        </button>
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-hand font-bold text-coffee-800">Categories</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link to={`/menu/${cat.id}`} key={cat.id}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "h-24 rounded-2xl flex flex-col items-center justify-center gap-2 border border-black/5 shadow-sm transition-colors",
                  cat.color
                )}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-hand font-bold text-coffee-800 text-lg">{cat.name.split(' ')[0]}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured / Specials */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-hand font-bold text-coffee-800">Today's Specials</h2>
          <Link to="/menu/specials" className="text-coffee-500 text-sm font-bold hover:underline">See all</Link>
        </div>
        
        <div className="space-y-4">
          {items.filter(i => i.category === 'specials' || i.tags.includes('Chef\'s Choice')).slice(0, 3).map((item) => (
            <Link to={`/item/${item.id}`} key={item.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow border-none bg-white">
                <div className="flex h-28">
                  <div className="w-28 h-full shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-hand font-bold text-lg leading-tight text-coffee-800">{item.name}</h3>
                        <span className="font-sans font-bold text-coffee-600">{formatCurrency(item.price)}</span>
                      </div>
                      <p className="text-xs text-coffee-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {item.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold tracking-wider rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Action */}
      <div className="bg-coffee-800 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-coffee-700 rounded-full opacity-50" />
        <div className="relative z-10">
          <h3 className="font-hand text-2xl font-bold mb-2">Feeling lucky? 🎲</h3>
          <p className="text-coffee-100 text-sm mb-4 max-w-[80%]">Let us pick a healthy meal for you based on your preferences.</p>
          <Button variant="secondary" size="sm" className="rounded-xl">
            Surprise Me
          </Button>
        </div>
      </div>
    </div>
  );
}
