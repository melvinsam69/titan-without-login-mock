import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { TrendingUp, Users, Target, Clock } from 'lucide-react';
import { Initiative, Project } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface DashboardProps {
  initiatives: Initiative[];
  projects: Project[];
}

const Dashboard: React.FC<DashboardProps> = ({ initiatives, projects }) => {
  // Mock data for visualizations
  const driverData = {
    labels: ['Innovation', 'Digital', 'Cost', 'Quality', 'Efficiency'],
    datasets: [
      {
        label: 'Number of Initiatives',
        data: [12, 8, 15, 6, 9],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const statusData = {
    labels: ['Yet to Start', 'WIP', 'Completed', 'Dropped', 'Deferred'],
    datasets: [
      {
        data: [25, 35, 20, 10, 10],
        backgroundColor: [
          'rgba(156, 163, 175, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(156, 163, 175, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const timelineData = {
    labels: ['Exploration', 'Evaluation', 'POC', 'Validation', 'Estimation', 'Decision', 'IPR', 'Certification'],
    datasets: [
      {
        label: 'Planned Timeline',
        data: [2, 4, 6, 8, 10, 12, 14, 16],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Actual Timeline',
        data: [2.5, 4.5, 7, 9, 11, 13, 15, 17],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: false,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Months',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Milestones',
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into your initiative and project portfolio
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <Target size={24} />
            </div>
            <h3 className="font-semibold text-blue-800">Total Initiatives</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{initiatives.length || 0}</p>
          <p className="text-sm text-blue-700">Active initiatives</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <Users size={24} />
            </div>
            <h3 className="font-semibold text-emerald-800">Total Projects</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{projects.length || 0}</p>
          <p className="text-sm text-emerald-700">Active projects</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-amber-500 text-white rounded-lg">
              <Clock size={24} />
            </div>
            <h3 className="font-semibold text-amber-800">Pending Reviews</h3>
          </div>
          <p className="text-3xl font-bold text-amber-600">0</p>
          <p className="text-sm text-amber-700">Awaiting review</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-500 text-white rounded-lg">
              <TrendingUp size={24} />
            </div>
            <h3 className="font-semibold text-purple-800">Completion Rate</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">0%</p>
          <p className="text-sm text-purple-700">Overall progress</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Initiatives per Driver */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Initiatives by Driver</h3>
          <div className="h-80">
            <Bar data={driverData} options={chartOptions} />
          </div>
        </div>

        {/* Pie Chart - Status Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Status Distribution</h3>
          <div className="h-80">
            <Pie data={statusData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Milestone Timeline Analysis</h3>
        <p className="text-gray-600 mb-6">Comparison of planned vs actual milestone completion times</p>
        <div className="h-96">
          <Line data={timelineData} options={lineOptions} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Initiative Created', item: 'Digital Transformation Initiative', time: '2 hours ago', type: 'success' },
            { action: 'Project Updated', item: 'World Time Implementation', time: '4 hours ago', type: 'info' },
            { action: 'Milestone Completed', item: 'POC Manufacturing - Thin Automatics', time: '1 day ago', type: 'success' },
            { action: 'Review Pending', item: 'Multifunction Mechanical Movement', time: '2 days ago', type: 'warning' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'success' ? 'bg-emerald-500' :
                activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.item}</p>
              </div>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;