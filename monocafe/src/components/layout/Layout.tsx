import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Home, Heart, ShoppingBag, User, Menu as MenuIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const location = useLocation();
  const isStaffMode = location.pathname.startsWith('/staff');
  const isKioskMode = location.pathname.startsWith('/kiosk');

  // Hide nav on specific screens if needed
  const hideNav = isStaffMode || isKioskMode;

  const navItems = [
    { icon: Home, label: 'Order', path: '/' },
    { icon: Heart, label: 'Charity', path: '/charity' },
    { icon: ShoppingBag, label: 'My Orders', path: '/orders' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 text-coffee-800 font-sans selection:bg-green-500/30">
      <div className="mx-auto max-w-md min-h-screen bg-white shadow-2xl overflow-hidden relative pb-20">
        {/* Header / Top Bar could go here */}
        <header className="px-6 py-4 flex items-center justify-between bg-cream-50/50 backdrop-blur-sm sticky top-0 z-40">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-crimson-500 rounded-full flex items-center justify-center text-white font-hand font-bold text-lg">M</div>
             <span className="font-hand text-xl font-bold text-coffee-800">Monocafe</span>
           </div>
           {!hideNav && (
             <div className="w-8 h-8 rounded-full bg-coffee-100 flex items-center justify-center">
               <MenuIcon size={18} className="text-coffee-800" />
             </div>
           )}
        </header>

        <main className="px-4 pb-4">
          <Outlet />
        </main>

        {!hideNav && <BottomNav items={navItems} />}
      </div>
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'font-sans font-medium text-coffee-800 bg-white shadow-lg rounded-xl border border-coffee-100',
          style: {
            background: '#fff',
            color: '#4A372F',
          },
        }}
      />
    </div>
  );
}
