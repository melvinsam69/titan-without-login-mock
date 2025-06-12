import React, { useState } from 'react';
import { Clock, AlertTriangle, Calendar} from 'lucide-react';
import Modal from './Modal';

// Mock data for delayed projects (replace with actual data source)
const mockDelayedProjects = [
  {
    id: '1',
    initiativeName: 'World time (through City Disc) with India Time focus',
    milestone: 'POC Manufacturing',
    deadline: '2025-12-01',
    primaryResponsibility: 'Avinash',
    department: 'Movement',
    status: 'Behind Schedule',
  },
  {
    id: '2',
    initiativeName: 'Thin Automatics ; 3.60 mm ~ 3.80 mm thickness',
    milestone: 'Mass Production',
    deadline: '2025-11-15',
    primaryResponsibility: 'Avinash',
    department: 'Movement',
    status: 'Behind Schedule',
  },
  {
    id: '3',
    initiativeName: 'Multifunction Mechanical movement with pushers',
    milestone: 'Certification',
    deadline: '2025-10-30',
    primaryResponsibility: 'Avinash',
    department: 'Movement',
    status: 'Behind Schedule',
  },
];

const DelayManagement: React.FC = () => {
  const [showDelayModal, setShowDelayModal] = useState(false);

  // Function to calculate delay duration in years or months
  const calculateDelay = (deadline: string): string => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = today.getTime() - deadlineDate.getTime();
    const diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.42)); // Approximate months
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}${months > 0 ? ` and ${months} month${months > 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months !== 1 ? 's' : ''}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Delay Management</h2>
        <p className="text-gray-600">Monitor and manage project delays</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-amber-500 text-white rounded-lg">
              <Clock size={20} />
            </div>
            <h3 className="font-semibold text-amber-800">Pending Reviews</h3>
          </div>
          <p className="text-2xl font-bold text-amber-600">12</p>
          <p className="text-sm text-amber-700">Projects awaiting review</p>
        </div>

        <div
          className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-200"
          onClick={() => setShowDelayModal(true)}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-red-500 text-white rounded-lg">
              <AlertTriangle size={20} />
            </div>
            <h3 className="font-semibold text-red-800">Critical Delays</h3>
          </div>
          <p className="text-2xl font-bold text-red-600">{mockDelayedProjects.length}</p>
          <p className="text-sm text-red-700">Projects behind schedule</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <Calendar size={20} />
            </div>
            <h3 className="font-semibold text-blue-800">Upcoming Deadlines</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">8</p>
          <p className="text-sm text-blue-700">Due in next 7 days</p>
        </div>
      </div>

      <Modal
        isOpen={showDelayModal}
        onClose={() => setShowDelayModal(false)}
        title="Critical Delays Overview">
        <div className="space-y-6">
          <p className="text-gray-700">
            The following projects are currently behind schedule. Review the details and take necessary actions.
          </p>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockDelayedProjects.length === 0 ? (
              <p className="text-gray-500 text-center">No delayed projects found.</p>
            ) : (
              mockDelayedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-red-50 border border-red-200 rounded-lg p-4"
                >
                  <h4 className="font-medium text-red-800">{project.initiativeName}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Milestone:</span> {project.milestone}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Deadline:</span>{' '}
                        {new Date(project.deadline).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Delay:</span>{' '}
                        {calculateDelay(project.deadline)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Primary Responsibility:</span>{' '}
                        {project.primaryResponsibility}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Department:</span> {project.department}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Status:</span> {project.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowDelayModal(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Delay Management Features</h3>
        <p className="text-sm text-gray-500">
          Click on the Critical Delays card to view detailed delay information, including delay duration and project details.
        </p>
      </div>
    </div>
  );
};

export default DelayManagement;