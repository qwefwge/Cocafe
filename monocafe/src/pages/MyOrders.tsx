import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useOrders } from '@/context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function MyOrders() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  return (
    <div className="pb-24 pt-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-white shadow-sm">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-hand font-bold text-coffee-800">My Orders</h1>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-10 text-coffee-500">
            No orders yet. Time to get some food!
          </div>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="bg-white border-coffee-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-coffee-800 text-lg">Order #{order.id}</div>
                    <div className="text-xs text-coffee-400 flex items-center gap-1">
                      <Clock size={12} /> {new Date(order.date).toLocaleString()}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                    order.status === 'Ready' || order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-coffee-50 text-coffee-500'
                  }`}>
                    {order.status}
                  </div>
                </div>
                
                <div className="text-sm text-coffee-600 mb-3">
                  {order.items.map(i => i.name).join(', ')}
                </div>

                <div className="flex justify-between items-center border-t border-coffee-50 pt-3">
                  <span className="font-bold text-coffee-800">{formatCurrency(order.total)}</span>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">Reorder</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
