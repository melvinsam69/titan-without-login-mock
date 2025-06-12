import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Target, FolderOpen, Download } from 'lucide-react';
import { Initiative, Project } from '../types';
import * as XLSX from 'xlsx';

interface ReportPageProps {
  initiatives: Initiative[];
  projects: Project[];
}

const ReportPage: React.FC<ReportPageProps> = ({ initiatives, projects }) => {
  const [activeReport, setActiveReport] = useState<'shaping' | 'initiative' | 'project'>('shaping');

  // Transform initiatives and projects into report data
  const shapingGoalsData = initiatives.map((initiative, _index) => ({
    driver: initiative.driver || 'N/A',
    focusArea: initiative.formData?.function || 'N/A',
    initiative: initiative.initiativeName || initiative.name || 'N/A',
    projects: projects
      .filter((project) => project.initiativeId === initiative.id)
      .map((project) => project.initiativeName || 'Unnamed Project')
      .join(', ') || 'No Projects',
  }));

  const initiativeReportData = initiatives.map((initiative) => ({
    iscmGoal: 'Customer Satisfaction', // Mocked as not directly available in Initiative type
    functionalGoal: initiative.formData?.function || 'N/A',
    initiative: initiative.initiativeName || initiative.name || 'N/A',
    exploration: initiative.formData?.exploration || 'N/A',
    evaluation: initiative.formData?.evaluation || 'N/A',
    poc: initiative.formData?.poc || 'N/A',
    validation: initiative.formData?.validation || 'N/A',
    estimation: initiative.formData?.estimation || 'N/A',
    decision: initiative.formData?.decision || 'N/A',
    ipr: initiative.formData?.ipr || 'N/A',
    certification: initiative.formData?.certification || 'N/A',
    primary: initiative.formData?.primary || 'N/A',
    associate: initiative.formData?.associate || 'N/A',
    reviewFrequency: Array.isArray(initiative.formData?.reviewFrequency) ? initiative.formData.reviewFrequency.join(', ') : initiative.formData?.reviewFrequency || 'N/A', reviewForum: initiative.formData?.reviewForum || 'N/A',
  }));

  const projectReportData = projects.map((project) => ({
    projectName: project.initiativeName || 'Unnamed Project',
    initiative: initiatives.find((init) => init.id === project.initiativeId)?.initiativeName || 'N/A',
    status: project.status || 'N/A',
    timeline: project.timeForMass || 'N/A',
    primaryResponsibility: project.primaryResponsibility || 'N/A',
    feasibility: project.feasibility || 'N/A',
    designValidation: project.designValidation || 'N/A',
    techDataRelease: project.techDataRelease || 'N/A',
  }));

  const reportButtons = [
    {
      id: 'shaping',
      label: 'Shaping Goals',
      icon: Target,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: 'initiative',
      label: 'Initiative Report',
      icon: BarChart3,
      color: 'bg-emerald-600 hover:bg-emerald-700',
    },
    {
      id: 'project',
      label: 'Project Report',
      icon: FolderOpen,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const downloadExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Shaping Goals Sheet
    const shapingSheetData = shapingGoalsData.map((row) => ({
      Driver: row.driver,
      'Focus Area': row.focusArea,
      Initiative: row.initiative,
      Projects: row.projects,
    }));
    const shapingSheet = XLSX.utils.json_to_sheet(shapingSheetData);
    XLSX.utils.book_append_sheet(workbook, shapingSheet, 'Shaping Goals');

    // Initiative Report Sheet
    const initiativeSheetData = initiativeReportData.map((row) => ({
      'ISCM Goal': row.iscmGoal,
      'Functional Goal': row.functionalGoal,
      Initiative: row.initiative,
      Exploration: row.exploration,
      Evaluation: row.evaluation,
      POC: row.poc,
      Validation: row.validation,
      Primary: row.primary,
      'Review Forum': row.reviewForum,
    }));
    const initiativeSheet = XLSX.utils.json_to_sheet(initiativeSheetData);
    XLSX.utils.book_append_sheet(workbook, initiativeSheet, 'Initiative Report');

    // Project Report Sheet
    const projectSheetData = projectReportData.map((row) => ({
      'Project Name': row.projectName,
      Initiative: row.initiative,
      Status: row.status,
      Timeline: row.timeline,
      'Primary Responsibility': row.primaryResponsibility,
      Feasibility: row.feasibility,
      'Design Validation': row.designValidation,
      'Tech Data Release': row.techDataRelease,
    }));
    const projectSheet = XLSX.utils.json_to_sheet(projectSheetData);
    XLSX.utils.book_append_sheet(workbook, projectSheet, 'Project Report');

    // Download the Excel file
    XLSX.writeFile(workbook, 'Reports.xlsx');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reports & Analytics
          </h1>
        </div>
      </div>

      {/* Report Type Buttons and Download Button */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        {reportButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.id}
              onClick={() => setActiveReport(button.id as any)}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium
                transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105
                ${activeReport === button.id
                  ? button.color + ' scale-105'
                  : 'bg-gray-500 hover:bg-gray-600'
                }
              `}
            >
              <Icon size={20} />
              <span>{button.label}</span>
            </button>
          );
        })}
        <button
          onClick={downloadExcel}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download size={20} />
          <span>Download as Excel</span>
        </button>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {activeReport === 'shaping' && (
          <div>
            <div className="bg-blue-600 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Shaping Goals Report</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus Area</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initiative</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shapingGoalsData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {row.driver}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.focusArea}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <Link
                            to={`/initiative/${initiatives[index]?.id || index + 1}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                          >
                            {row.initiative}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.projects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeReport === 'initiative' && (
          <div>
            <div className="bg-emerald-600 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Initiative Report</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISCM Goal</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Functional Goal</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initiative</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exploration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">POC</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Forum</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {initiativeReportData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">{row.iscmGoal}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{row.functionalGoal}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">{row.initiative}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.exploration === 'Completed' ? 'bg-green-100 text-green-800' :
                              row.exploration === 'WIP' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {row.exploration}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.evaluation === 'Completed' ? 'bg-green-100 text-green-800' :
                              row.evaluation === 'WIP' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {row.evaluation}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.poc === 'Completed' ? 'bg-green-100 text-green-800' :
                              row.poc === 'WIP' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {row.poc}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.validation === 'Completed' ? 'bg-green-100 text-green-800' :
                              row.validation === 'WIP' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {row.validation}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{row.primary}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{row.reviewForum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeReport === 'project' && (
          <div>
            <div className="bg-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Project Report</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initiative</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Responsibility</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feasibility</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Design Validation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Data Release</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projectReportData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.projectName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{row.initiative}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              row.status === 'WIP' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.timeline}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.primaryResponsibility}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.feasibility === 'Completed' ? 'bg-green-100 text-green-800' :
                              row.feasibility === 'WIP' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {row.feasibility}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.designValidation === 'Completed' ? 'bg-green-100 text-green-800' :
                              row.designValidation === 'WIP' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {row.designValidation}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${row.techDataRelease === 'Completed' ? 'bg-green-100 text-green-800' :
                              row.techDataRelease === 'WIP' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {row.techDataRelease}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;