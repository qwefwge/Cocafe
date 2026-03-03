import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { MenuProvider } from '@/context/MenuContext';
import { WalletProvider } from '@/context/WalletContext';
import { OrderProvider } from '@/context/OrderContext';
import { CharityProvider } from '@/context/CharityContext';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import ItemDetail from '@/pages/ItemDetail';
import Checkout from '@/pages/Checkout';
import Confirmation from '@/pages/Confirmation';
import Charity from '@/pages/Charity';
import MyOrders from '@/pages/MyOrders';
import Profile from '@/pages/Profile';
import StaffLogin from '@/pages/staff/Login';
import StaffDashboard from '@/pages/staff/Dashboard';
import KioskStart from '@/pages/KioskStart';
import AddMenuItem from '@/pages/staff/AddMenuItem';
import WalletPage from '@/pages/Wallet';
import Inventory from '@/pages/staff/Inventory';
import CashRecon from '@/pages/staff/CashRecon';

export default function App() {
  return (
    <MenuProvider>
      <WalletProvider>
        <OrderProvider>
          <CharityProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/kiosk" element={<KioskStart />} />
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="menu/:categoryId" element={<Menu />} />
                    <Route path="item/:itemId" element={<ItemDetail />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="confirmation" element={<Confirmation />} />
                    <Route path="charity" element={<Charity />} />
                    <Route path="orders" element={<MyOrders />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="wallet" element={<WalletPage />} />
                    <Route path="staff/login" element={<StaffLogin />} />
                    <Route path="staff/dashboard" element={<StaffDashboard />} />
                    <Route path="staff/add-item" element={<AddMenuItem />} />
                    <Route path="staff/inventory" element={<Inventory />} />
                    <Route path="staff/recon" element={<CashRecon />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </CharityProvider>
        </OrderProvider>
      </WalletProvider>
    </MenuProvider>
  );
}
