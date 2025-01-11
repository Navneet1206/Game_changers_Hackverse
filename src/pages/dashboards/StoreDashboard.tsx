import React, { useEffect, useState } from 'react';
import { Package, ShoppingCart, TrendingUp, AlertCircle, Search, Truck, FileText, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LowStockItem {
  id: string;
  name: string;
  current: number;
  minimum: number;
}

interface RecentOrder {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: string;
}

const StoreDashboard = () => {
  const { user } = useAuth();
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [todaysOrders, setTodaysOrders] = useState<number | null>(null);
  const [revenueToday, setRevenueToday] = useState<number | null>(null);
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[] | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/store/${user?.id}/dashboard`);
        const data = await response.json();
        setTotalProducts(data.totalProducts);
        setTodaysOrders(data.todaysOrders);
        setRevenueToday(data.revenueToday);
        setLowStockItems(data.lowStockItems);
        setRecentOrders(data.recentOrders);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Products</h3>
                <p className="text-2xl font-semibold">{totalProducts ?? 'Loading...'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Today's Orders</h3>
                <p className="text-2xl font-semibold">{todaysOrders ?? 'Loading...'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Revenue Today</h3>
                <p className="text-2xl font-semibold">{revenueToday ? `$${revenueToday}` : 'Loading...'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Low Stock Items</h3>
                <p className="text-2xl font-semibold">{lowStockItems ? lowStockItems.length : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
              <div className="mt-4 space-y-4">
                {lowStockItems ? (
                  lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Current Stock: {item.current}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-red-600">Below minimum ({item.minimum})</p>
                        <button className="mt-1 text-sm text-blue-600 hover:text-blue-500">Order Now</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading low stock items...</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <div className="mt-4 space-y-4">
                {recentOrders ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.items} items · {order.total}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading recent orders...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                  <Search className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Search Inventory</span>
                </button>
                <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                  <Truck className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">New Order</span>
                </button>
                <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
                  <FileText className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Generate Report</span>
                </button>
                <button className="p-4 bg-yellow-50 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors">
                  <Settings className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;