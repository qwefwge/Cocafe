import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LogOut, ClipboardList, DollarSign, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/context/OrderContext';
import { formatCurrency } from '@/lib/utils';

const DATA = [
  { name: 'Mon', sales: 400 },
  { name: 'Tue', sales: 300 },
  { name: 'Wed', sales: 550 },
  { name: 'Thu', sales: 450 },
  { name: 'Fri', sales: 600 },
];

export default function StaffDashboard() {
  const navigate = useNavigate();
  const { stats } = useOrders();

  return (
    <div className="pb-24 pt-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-hand font-bold text-coffee-800">Staff Dashboard</h1>
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <LogOut size={20} />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-white border-coffee-100" onClick={() => navigate('/staff/inventory')}>
          <ClipboardList size={24} className="text-coffee-600" />
          <span className="text-sm">Inventory Check</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-white border-coffee-100" onClick={() => navigate('/staff/recon')}>
          <DollarSign size={24} className="text-coffee-600" />
          <span className="text-sm">Cash Recon</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex flex-col gap-2 bg-white border-coffee-100 col-span-2"
          onClick={() => navigate('/staff/add-item')}
        >
          <div className="w-8 h-8 bg-crimson-50 rounded-full flex items-center justify-center text-crimson-500">
            <Plus size={20} />
          </div>
          <span className="text-sm font-bold text-crimson-600">Add Menu Item</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-4">
            <div className="text-green-600 text-xs font-bold uppercase mb-1">Total Revenue</div>
            <div className="text-2xl font-bold text-green-800">{formatCurrency(stats.totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-100">
          <CardContent className="p-4">
            <div className="text-orange-600 text-xs font-bold uppercase mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-orange-800">{stats.totalOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Revenue</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                cursor={{ fill: '#F7F4EB' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="sales" fill="#8C6B5D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Inventory Alerts */}
      <Card className="border-red-100 bg-red-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-red-800">Low Stock Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-red-100">
            <span className="font-medium text-coffee-800">Oat Milk</span>
            <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">2 units left</span>
          </div>
          <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-red-100">
            <span className="font-medium text-coffee-800">Avocados</span>
            <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">5 units left</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
