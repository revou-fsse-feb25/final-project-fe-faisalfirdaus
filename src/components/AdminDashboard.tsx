"use client";

import { useState, useEffect } from "react";

interface DashboardStat {
  name: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stats: DashboardStat[] = [
    {
      name: "Total Products",
      value: 120,
      change: "+5%",
      changeType: "increase",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      name: "Total Users",
      value: 2430,
      change: "+12%",
      changeType: "increase",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      name: "Total Orders",
      value: 342,
      change: "+2.5%",
      changeType: "increase",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
    {
      name: "Revenue",
      value: "$12,430",
      change: "-3%",
      changeType: "decrease",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-05-20",
      status: "Completed",
      amount: "$125.00",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-05-19",
      status: "Processing",
      amount: "$75.50",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-05-18",
      status: "Completed",
      amount: "$220.00",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-05-17",
      status: "Cancelled",
      amount: "$45.99",
    },
    {
      id: "ORD-005",
      customer: "Michael Brown",
      date: "2023-05-16",
      status: "Completed",
      amount: "$180.25",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-300">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div
                className={`p-3 rounded-full ${
                  stat.changeType === "increase"
                    ? "bg-green-900/30 text-green-400"
                    : stat.changeType === "decrease"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-blue-900/30 text-blue-400"
                }`}
              >
                {stat.icon}
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p
                    className={`ml-2 text-sm ${
                      stat.changeType === "increase"
                        ? "text-green-400"
                        : stat.changeType === "decrease"
                        ? "text-red-400"
                        : "text-blue-400"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-4">
            Revenue Overview
          </h3>
          <div className="h-64 flex items-end justify-between px-2">
            {/* Simple bar chart visualization */}
            {[60, 45, 75, 50, 80, 65, 70].map((height, index) => (
              <div key={index} className="w-1/12 flex flex-col items-center">
                <div
                  className="w-full bg-blue-600 rounded-t-sm"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-4">
            Product Categories
          </h3>
          <div className="h-64 flex items-center justify-center">
            {/* Simple donut chart visualization */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeDasharray="100 0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="4"
                  strokeDasharray="65 35"
                  strokeDashoffset="-100"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  strokeDasharray="40 60"
                  strokeDashoffset="-165"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#EF4444"
                  strokeWidth="4"
                  strokeDasharray="25 75"
                  strokeDashoffset="-205"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xl font-bold text-white">120</span>
                <span className="block text-xs text-gray-400">
                  Total Products
                </span>
              </div>
            </div>
            <div className="ml-8 space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-300">Electronics (40%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-300">Furniture (25%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-300">Clothing (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-300">Other (15%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Recent Orders</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-900 text-green-200"
                          : order.status === "Processing"
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-red-900 text-red-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
