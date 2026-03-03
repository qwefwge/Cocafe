import { Button } from '@/components/ui/Button';
import { User, Settings, CreditCard, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="pb-24 pt-4 space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-coffee-200 rounded-full flex items-center justify-center text-3xl">
          🎓
        </div>
        <div>
          <h1 className="text-2xl font-hand font-bold text-coffee-800">Alex Student</h1>
          <p className="text-coffee-500 text-sm">Sophomore • ID: 882910</p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-hand font-bold text-coffee-800 px-2">Account</h2>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-coffee-50">
          <Link to="/wallet" className="w-full flex items-center gap-3 p-4 hover:bg-coffee-50 transition-colors border-b border-coffee-50 text-left">
            <CreditCard size={20} className="text-coffee-400" />
            <span className="font-medium text-coffee-700">My Wallet</span>
          </Link>
          {[
            { icon: User, label: 'Personal Info' },
            { icon: Bell, label: 'Notifications' },
            { icon: Settings, label: 'Preferences' },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 p-4 hover:bg-coffee-50 transition-colors border-b border-coffee-50 last:border-none text-left">
              <item.icon size={20} className="text-coffee-400" />
              <span className="font-medium text-coffee-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-hand font-bold text-coffee-800 px-2">Staff Area</h2>
        <Link to="/staff/login">
          <Button variant="outline" className="w-full justify-start gap-3 bg-white border-coffee-200 text-coffee-600">
            <User size={20} />
            Staff Login
          </Button>
        </Link>
      </div>

      <Button variant="ghost" className="w-full text-red-400 hover:text-red-500 hover:bg-red-50">
        <LogOut size={18} className="mr-2" /> Log Out
      </Button>
    </div>
  );
}
