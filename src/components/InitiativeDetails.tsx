import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Target, FileText } from 'lucide-react';
import { Initiative } from '../types';

interface InitiativeDetailsProps {
  initiatives: Initiative[];
}

const InitiativeDetails: React.FC<InitiativeDetailsProps> = ({ initiatives }) => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for demonstration since we don't have real initiative data
  const mockInitiative = {
    id: id || '1',
    name: 'World time (through City Disc) with India Time focus',
    goalYear: '2025-26',
    driver: 'Innovation',
    forYourInformation: 'Stakeholder Update',
    department: 'MOVT PLANT/OEM/R&D',
    formData: {
      function: 'Movement',
      exploration: 'Completed',
      evaluation: 'WIP',
      poc: 'Yet to Start',
      validation: 'Yet to Start',
      estimation: 'Yet to Start',
      decision: 'Yet to Start',
      ipr: 'Yet to Start',
      watch: 'Yet to Start',
      certification: 'Yet to Start',
      year2526: 'Q2 2025',
      year2627: 'Q4 2026',
      primary: 'Avinash',
      associate: 'Team Lead',
      reviewFrequency: 'Monthly',
      reviewForum: 'Plant Level'
    },
    createdAt: new Date('2024-01-15')
  };

  const initiative = initiatives.find(init => init.id === id) || mockInitiative;

  const milestones = [
    { name: 'Exploration', status: initiative.formData.exploration, date: '01-2025' },
    { name: 'Evaluation', status: initiative.formData.evaluation, date: '03-2025' },
    { name: 'POC', status: initiative.formData.poc, date: '06-2025' },
    { name: 'Validation', status: initiative.formData.validation, date: '09-2025' },
    { name: 'Estimation', status: initiative.formData.estimation, date: '12-2025' },
    { name: 'Decision', status: initiative.formData.decision, date: '03-2026' },
    { name: 'IPR', status: initiative.formData.ipr, date: '06-2026' },
    { name: 'Certification', status: initiative.formData.certification, date: '09-2026' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'WIP':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Yet to Start':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              to="/reports"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Reports</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Initiative Details
          </h1>
          <p className="text-gray-600">
            Comprehensive view of initiative progress and milestones
          </p>
        </div>
      </div>

      {/* Initiative Overview */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{initiative.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Goal Year</p>
                <p className="font-semibold text-gray-900">{initiative.goalYear}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Target size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Driver</p>
                <p className="font-semibold text-gray-900">{initiative.driver}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-semibold text-gray-900">{initiative.department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FileText size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Function</p>
                <p className="font-semibold text-gray-900">{initiative.formData.function}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Responsibility Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Responsibility & Review</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Primary Responsibility</p>
              <p className="font-semibold text-gray-900">{initiative.formData.primary}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Associate Responsibility</p>
              <p className="font-semibold text-gray-900">{initiative.formData.associate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Review Frequency</p>
              <p className="font-semibold text-gray-900">{initiative.formData.reviewFrequency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Review Forum</p>
              <p className="font-semibold text-gray-900">{initiative.formData.reviewForum}</p>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Milestone Progress</h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-4 h-4 rounded-full ${
                    milestone.status === 'Completed' ? 'bg-green-500' :
                    milestone.status === 'WIP' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                  <p className="text-sm text-gray-500">Target: {milestone.date}</p>
                </div>
                <div>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(milestone.status)}`}>
                    {milestone.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Information */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">FY 2025-26 Plan</p>
              <p className="font-semibold text-gray-900">{initiative.formData.year2526}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">FY 2026-27 Plan</p>
              <p className="font-semibold text-gray-900">{initiative.formData.year2627}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativeDetails;