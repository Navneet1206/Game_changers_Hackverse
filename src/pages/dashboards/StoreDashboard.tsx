import React, { useEffect, useState } from 'react';
import { ShoppingCart, Clock, Package, Users, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Order {
  id: string;
  product: string;
  status: string;
  amount: number; // Amount in INR
  date: string;
}

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number; // Price in INR
}

const StoreDashboard = () => {
  const { user } = useAuth();
  const [totalOrders, setTotalOrders] = useState<number | null>(null);
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null);
  const [lowStockProducts, setLowStockProducts] = useState<number | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[] | null>(null);
  const [topProducts, setTopProducts] = useState<Product[] | null>(null);

  // Dummy data for development or fallback (Indian context)
  const mockData = {
    totalOrders: 120,
    totalRevenue: 150000, // INR
    lowStockProducts: 8,
    recentOrders: [
      { id: '1', product: 'Kurta Set', status: 'Delivered', amount: 2500, date: '2023-10-10' },
      { id: '2', product: 'Lehenga Choli', status: 'Shipped', amount: 12000, date: '2023-10-09' },
      { id: '3', product: 'Men\'s Sherwani', status: 'Pending', amount: 8000, date: '2023-10-08' },
    ],
    topProducts: [
      { id: '1', name: 'Saree', stock: 50, price: 3000 },
      { id: '2', name: 'Jutti (Footwear)', stock: 100, price: 1500 },
      { id: '3', name: 'Handmade Jewelry', stock: 30, price: 5000 },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Uncomment the following lines to use real API data
        // const response = await fetch(`/api/store/${user?.id}/dashboard`);
        // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // const data = await response.json();

        // For now, use mock data
        const data = mockData;

        setTotalOrders(data.totalOrders);
        setTotalRevenue(data.totalRevenue);
        setLowStockProducts(data.lowStockProducts);
        setRecentOrders(data.recentOrders);
        setTopProducts(data.topProducts);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data if API fails
        setTotalOrders(mockData.totalOrders);
        setTotalRevenue(mockData.totalRevenue);
        setLowStockProducts(mockData.lowStockProducts);
        setRecentOrders(mockData.recentOrders);
        setTopProducts(mockData.topProducts);
      }
    };

    if (user?.id) fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Orders</h3>
                <p className="text-2xl font-semibold">{totalOrders ?? 'Loading...'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                <p className="text-2xl font-semibold">
                  {totalRevenue ? `₹${totalRevenue.toLocaleString('en-IN')}` : 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Low Stock Products</h3>
                <p className="text-2xl font-semibold">{lowStockProducts ?? 'Loading...'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Last Updated</h3>
                <p className="text-2xl font-semibold">
                  {recentOrders ? recentOrders[0]?.date : 'Loading...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <div className="mt-4 space-y-4">
                {recentOrders ? (
                  recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{order.product}</p>
                        <p className="text-sm text-gray-500">{order.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{order.amount.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading recent orders...</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
              <div className="mt-4 space-y-4">
                {topProducts ? (
                  topProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading top products...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                <ShoppingCart className="h-6 w-6 mx-auto" />
                <span className="mt-2 block text-sm">Add New Product</span>
              </button>
              <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                <Package className="h-6 w-6 mx-auto" />
                <span className="mt-2 block text-sm">Manage Inventory</span>
              </button>
              <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
                <Users className="h-6 w-6 mx-auto" />
                <span className="mt-2 block text-sm">View Customers</span>
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
  );
};

export default StoreDashboard;