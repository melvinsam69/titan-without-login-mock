import React, { useState } from 'react';
import { Save, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Initiative, DropdownOption } from '../types';
import { supabase } from '../lib/supabase';
import Modal from './Modal';

interface CreateInitiativeProps {
  onInitiativeSubmit: (initiative: Initiative) => void;
}

const CreateInitiative: React.FC<CreateInitiativeProps> = ({ onInitiativeSubmit }) => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [milestonesExpanded, setMilestonesExpanded] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
    goalYear: '',
    driver: '',
    forYourInformation: '',
    department: '',
    statusUpdate: 'Not Started',
  });

  const [reviewMetadata, setReviewMetadata] = useState({
    iscmLevel: '',
    functionalLevel: '',
    departmentLevel: '',
  });

  // Updated formData to match Initiative interface
  const [formData, setFormData] = useState({
    function: '',
    exploration: '',
    evaluation: '',
    poc: '',
    validation: '',
    estimation: '',
    decision: '',
    ipr: '',
    watch: '',
    certification: '',
    year2526: '',
    year2627: '',
    primary: '',
    associate: '',
    reviewFrequency: [] as string[],
    reviewForum: '',
    initiativeName: '',
    originalPlan: '',
    metrics: '',
    initCategory: '',
    uom: '',
    statusOfCompletion: '',
    socReason: '',
    socTimeline: '',
    actualPlan: '',
    subFunction: '',
    supportingDocument: '',
  });

  const dropdownOptions = {
    goalYear: [
      { value: '2024-25', label: '2024-25' },
      { value: '2025-26', label: '2025-26' },
      { value: '2026-27', label: '2026-27' },
      { value: '2027-28', label: '2027-28' },
    ],
    statusUpdate: [
      { value: 'Not Started', label: 'Not Started' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Delayed', label: 'Delayed' },
    ],
    driver: [
      { value: 'innovation', label: 'Innovation' },
      { value: 'efficiency', label: 'Efficiency' },
      { value: 'growth', label: 'Growth' },
      { value: 'compliance', label: 'Compliance' },
    ],
    forYourInformation: [
      { value: 'stakeholder-update', label: 'Stakeholder Update' },
      { value: 'status-review', label: 'Status Review' },
      { value: 'milestone-tracking', label: 'Milestone Tracking' },
    ],
    department: [
      { value: 'ASSEMBLY', label: 'Assembly' },
      { value: 'ASSY- HSR/ASSY -UNITS', label: 'Assy- HSR/Assy -Units' },
      { value: 'CASE PLANT/PLATING/NEBULA', label: 'Case Plant/Plating/Nebula' },
      { value: 'CENTRAL PLANNING', label: 'Central Planning' },
      { value: 'DATE', label: 'Date' },
      { value: 'ESG', label: 'ESG' },
      { value: 'INNOVATION FUNCTION', label: 'Innovation Function' },
      { value: 'L&D', label: 'L&D' },
      { value: 'MOVT PLANT/OEM/R&D', label: 'Movt Plant/OEM/R&D' },
      { value: 'NPD', label: 'NPD' },
      { value: 'PEOPLE FUNCTION', label: 'People Function' },
      { value: 'QUALITY', label: 'Quality' },
      { value: 'SERVICES', label: 'Services' },
      { value: 'SOURCING', label: 'Sourcing' },
      { value: 'SS CASE PLANT', label: 'SS Case Plant' },
      { value: 'TOOL MFG', label: 'Tool Mfg' },
      { value: 'VENDOR PLATING', label: 'Vendor Plating' },
    ],
    iscmLevel: [
      { value: 'CMO', label: 'CMO' },
    ],
    functionalLevel: [
      { value: 'Function Head', label: 'Function Head' },
    ],
    departmentLevel: [
      { value: 'HOD', label: 'HOD' },
    ],
    initCategory: [
      { value: '', label: 'Select' },
      { value: 'Running Goal', label: 'Running Goal' },
      { value: 'Shaping Goal', label: 'Shaping Goal' },
    ],
    reviewForum: [
      { value: '', label: 'Select' },
      { value: 'ASSY- HSR/ASSY -UNITS', label: 'Assy- HSR/Assy -Units' },
      { value: 'BOUGHT OUT QRM', label: 'Bought Out QRM' },
      { value: 'Case plant/plating/Nebula', label: 'Case plant/plating/Nebula' },
      { value: 'CSF CONNECT', label: 'CSF Connect' },
      { value: 'DATE', label: 'Date' },
      { value: 'DEFECT GROUP CFT', label: 'Defect Group CFT' },
      { value: 'ESG', label: 'ESG' },
      { value: 'ESG REVIEW', label: 'ESG Review' },
      { value: 'INTERNAL AUDIT', label: 'Internal Audit' },
      { value: 'ISCM DIGITALIZATIONA REVIEW', label: 'ISCM Digitalization Review' },
      { value: 'L&D', label: 'L&D' },
      { value: 'MONTHLY REVIEW', label: 'Monthly Review' },
      { value: 'MONTHLY REVIEW/CEO', label: 'Monthly Review/CEO' },
      { value: 'MOVT & ASSY QRM', label: 'Movt & Assy QRM' },
      { value: 'Movt Plant/OEM/R&D', label: 'Movt Plant/OEM/R&D' },
      { value: 'OGQ -QRM', label: 'OGQ -QRM' },
      { value: 'PEOPLE FUNCTION', label: 'People Function' },
      { value: 'PLANNERS MEET', label: 'Planners Meet' },
      { value: 'PLATING CFT', label: 'Plating CFT' },
      { value: 'QEMS MRM', label: 'QEMS MRM' },
      { value: 'SIX SIGMA REVIEW', label: 'Six Sigma Review' },
    ],
    statusOfCompletion: [
      { value: '', label: 'Select' },
      { value: 'Yet_to_start', label: 'Yet to start' },
      { value: 'Ongoing', label: 'Ongoing' },
      { value: 'Completed', label: 'Completed' },
      { value: 'WIP', label: 'WIP' },
      { value: 'Dropped', label: 'Dropped' },
      { value: 'Deferred', label: 'Deferred' },
    ],
    milestoneStatus: [
      { value: '', label: 'Select' },
      { value: 'Yet_to_Start', label: 'Yet to Start' },
      { value: 'WIP', label: 'WIP' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Dropped', label: 'Dropped' },
    ],
  };

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (basicInfo.goalYear && basicInfo.driver && basicInfo.forYourInformation && basicInfo.department) {
      setStep(2);
    }
  };

  const saveToSupabase = async (initiative: Initiative) => {
    try {
      // Save review metadata
      const { error: reviewError } = await supabase
        .from('review_form_metadata')
        .insert({
          initiative_id: initiative.id,
          iscm_level: reviewMetadata.iscmLevel,
          functional_level: reviewMetadata.functionalLevel,
          department_level: reviewMetadata.departmentLevel,
        });

      if (reviewError) {
        console.error('Error saving review metadata:', reviewError);
      }

      // Save goal status
      const { error: goalError } = await supabase
        .from('goals')
        .insert({
          initiative_id: initiative.id,
          goal_year: initiative.goalYear,
          status_update: initiative.statusUpdate,
          driver: initiative.driver,
          department: initiative.department,
        });

      if (goalError) {
        console.error('Error saving goal status:', goalError);
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const initiative: Initiative = {
      id: Date.now().toString(),
      name: `${basicInfo.department} Initiative ${basicInfo.goalYear}`,
      ...basicInfo,
      ...formData,
      reviewMetadata,
      createdAt: new Date(),
      formData: {
        function: formData.function,
        exploration: formData.exploration,
        evaluation: formData.evaluation,
        poc: formData.poc,
        validation: formData.validation,
        estimation: formData.estimation,
        decision: formData.decision,
        ipr: formData.ipr,
        watch: formData.watch,
        certification: formData.certification,
        year2526: formData.year2526,
        year2627: formData.year2627,
        primary: formData.primary,
        associate: formData.associate,
        reviewFrequency: formData.reviewFrequency.join(', '),
        reviewForum: formData.reviewForum
      }
    };

    // Save to Supabase
    await saveToSupabase(initiative);

    onInitiativeSubmit(initiative);
    setModalMessage(`Initiative "${initiative.name}" has been successfully created and saved to the database.`);
    setShowModal(true);

    // Reset form
    setStep(1);
    setBasicInfo({ goalYear: '', driver: '', forYourInformation: '', department: '', statusUpdate: 'Not Started' });
    setReviewMetadata({ iscmLevel: '', functionalLevel: '', departmentLevel: '' });
    setFormData({
      function: '',
      exploration: '',
      evaluation: '',
      poc: '',
      validation: '',
      estimation: '',
      decision: '',
      ipr: '',
      watch: '',
      certification: '',
      year2526: '',
      year2627: '',
      primary: '',
      associate: '',
      reviewFrequency: [],
      reviewForum: '',
      initiativeName: '',
      originalPlan: '',
      metrics: '',
      initCategory: '',
      uom: '',
      statusOfCompletion: '',
      socReason: '',
      socTimeline: '',
      actualPlan: '',
      subFunction: '',
      supportingDocument: '',
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name).join(', ');
      setFormData({ ...formData, supportingDocument: fileNames });
    }
  };

  const handleCheckboxChange = (key: 'reviewFrequency', value: string) => {
    setFormData(prev => {
      const currentValues = prev[key];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: updatedValues };
    });
  };

  const CustomDropdown: React.FC<{
    value: string | string[];
    onChange: (value: string) => void;
    options: DropdownOption[];
    placeholder: string;
  }> = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
              {value ? options.find(opt => opt.value === value)?.label : placeholder}
            </span>
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (step === 1) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Initiative</h2>
          <p className="text-gray-600">Step 1: Basic Information</p>
        </div>

        <form onSubmit={handleBasicSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Year *
              </label>
              <CustomDropdown
                value={basicInfo.goalYear}
                onChange={(value) => setBasicInfo({ ...basicInfo, goalYear: value })}
                options={dropdownOptions.goalYear}
                placeholder="Select goal year"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Update *
              </label>
              <CustomDropdown
                value={basicInfo.statusUpdate}
                onChange={(value) => setBasicInfo({ ...basicInfo, statusUpdate: value })}
                options={dropdownOptions.statusUpdate}
                placeholder="Select status"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Driver *
              </label>
              <CustomDropdown
                value={basicInfo.driver}
                onChange={(value) => setBasicInfo({ ...basicInfo, driver: value })}
                options={dropdownOptions.driver}
                placeholder="Select driver"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Area *
              </label>
              <CustomDropdown
                value={basicInfo.forYourInformation}
                onChange={(value) => setBasicInfo({ ...basicInfo, forYourInformation: value })}
                options={dropdownOptions.forYourInformation}
                placeholder="Select information type"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <CustomDropdown
                value={basicInfo.department}
                onChange={(value) => setBasicInfo({ ...basicInfo, department: value })}
                options={dropdownOptions.department}
                placeholder="Select department"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Next Step</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Discussion Form</h2>
        <p className="text-gray-600">Step 2: Complete the initiative details</p>
      </div>

      <form onSubmit={handleFinalSubmit} className="space-y-6">
        {/* Review Section */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Review Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ISCM Level</label>
              <CustomDropdown
                value={reviewMetadata.iscmLevel}
                onChange={(value) => setReviewMetadata({ ...reviewMetadata, iscmLevel: value })}
                options={dropdownOptions.iscmLevel}
                placeholder="Select ISCM Level"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Functional Level</label>
              <CustomDropdown
                value={reviewMetadata.functionalLevel}
                onChange={(value) => setReviewMetadata({ ...reviewMetadata, functionalLevel: value })}
                options={dropdownOptions.functionalLevel}
                placeholder="Select Functional Level"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department Level</label>
              <CustomDropdown
                value={reviewMetadata.departmentLevel}
                onChange={(value) => setReviewMetadata({ ...reviewMetadata, departmentLevel: value })}
                options={dropdownOptions.departmentLevel}
                placeholder="Select Department Level"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Year *</label>
            <CustomDropdown
              value={basicInfo.goalYear}
              onChange={(value) => setBasicInfo({ ...basicInfo, goalYear: value })}
              options={dropdownOptions.goalYear}
              placeholder="Select goal year"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Function *</label>
            <CustomDropdown
              value={formData.function}
              onChange={(value) => setFormData({ ...formData, function: value })}
              options={dropdownOptions.department}
              placeholder="Select function"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Initiative *</label>
            <textarea
              value={formData.initiativeName}
              onChange={(e) => setFormData({ ...formData, initiativeName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter initiative"
              required
            />
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
              <textarea
                value={formData.originalPlan}
                onChange={(e) => setFormData({ ...formData, originalPlan: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter plan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Metrics</label>
              <textarea
                value={formData.metrics}
                onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter metrics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal Type</label>
              <CustomDropdown
                value={formData.initCategory}
                onChange={(value) => setFormData({ ...formData, initCategory: value })}
                options={dropdownOptions.initCategory}
                placeholder="Select goal type"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Responsibility *</label>
              <input
                type="text"
                value={formData.primary}
                onChange={(e) => setFormData({ ...formData, primary: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter primary responsibility"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Associate Responsibility</label>
              <input
                type="text"
                value={formData.associate}
                onChange={(e) => setFormData({ ...formData, associate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter associate responsibility"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UOM</label>
              <input
                type="text"
                value={formData.uom}
                onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter UOM"
              />
            </div>
          </div>
        </div>

        {/* Compact Key Milestones Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <button
            type="button"
            onClick={() => setMilestonesExpanded(!milestonesExpanded)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-blue-100 transition-colors duration-200 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900">Key Milestones and Stages</h3>
            {milestonesExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {milestonesExpanded && (
            <div className="p-4 pt-0 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Exploration', dateKey: 'exploration' },
                  { label: 'Evaluation', dateKey: 'evaluation' },
                  { label: 'POC', dateKey: 'poc' },
                  { label: 'Validation', dateKey: 'validation' },
                  { label: 'Estimation', dateKey: 'estimation' },
                  { label: 'Decision', dateKey: 'decision' },
                  { label: 'IPR', dateKey: 'ipr' },
                  { label: 'Watch', dateKey: 'watch' },
                  { label: 'Certification', dateKey: 'certification' },
                ].map((milestone) => (
                  <div key={milestone.label} className="bg-white p-3 rounded-lg border border-gray-200">
                    <label className="block text-xs font-medium text-gray-700 mb-1">{milestone.label}</label>
                    <input
                      type="text"
                      value={formData[milestone.dateKey as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [milestone.dateKey]: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-200 focus:border-blue-500"
                      placeholder="mm-yyyy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-orange-100 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Frequency</label>
              <div className="space-y-2">
                {['Monthly', 'Quarterly', 'Yearly'].map((freq) => (
                  <div key={freq} className="flex items-center">
                    <input
                      type="checkbox"
                      id={freq}
                      value={freq}
                      checked={formData.reviewFrequency.includes(freq)}
                      onChange={() => handleCheckboxChange('reviewFrequency', freq)}
                      className="w-5 h-5"
                    />
                    <label htmlFor={freq} className="ml-2">{freq}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Forum</label>
              <CustomDropdown
                value={formData.reviewForum}
                onChange={(value) => setFormData({ ...formData, reviewForum: value })}
                options={dropdownOptions.reviewForum}
                placeholder="Select review forum"
              />
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Documents Upload
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="file"
                id="iscmLevelDocumentsFile0"
                onChange={handleFileChange}
                multiple
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting Documents (if any)
              </label>
              <textarea
                value={formData.supportingDocument}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Selected files will appear here"
              />
            </div>
          </div>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Status Update</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status of Initiative</label>
              <CustomDropdown
                value={formData.statusOfCompletion}
                onChange={(value) => setFormData({ ...formData, statusOfCompletion: value })}
                options={dropdownOptions.statusOfCompletion}
                placeholder="Select status"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <textarea
                value={formData.socReason}
                onChange={(e) => setFormData({ ...formData, socReason: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter reason"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Revised Timeline</label>
              <input
                type="text"
                value={formData.socTimeline}
                onChange={(e) => setFormData({ ...formData, socTimeline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Enter revised timeline"
              />
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">FY:2025–2026 Plan</label>
              <textarea
                value={formData.originalPlan}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">FY:2025–2026 Actual</label>
              <textarea
                value={formData.actualPlan}
                onChange={(e) => setFormData({ ...formData, actualPlan: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Actual for current FY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">FY:2026–2027 Plan</label>
              <textarea
                value={formData.subFunction}
                onChange={(e) => setFormData({ ...formData, subFunction: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                placeholder="Plan for next FY"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Back
          </button>

          <div className="space-x-4">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Save size={16} />
              <span>Submit Initiative</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  function: '',
                  exploration: '',
                  evaluation: '',
                  poc: '',
                  validation: '',
                  estimation: '',
                  decision: '',
                  ipr: '',
                  watch: '',
                  certification: '',
                  year2526: '',
                  year2627: '',
                  primary: '',
                  associate: '',
                  reviewFrequency: [],
                  reviewForum: '',
                  initiativeName: '',
                  originalPlan: '',
                  metrics: '',
                  initCategory: '',
                  uom: '',
                  statusOfCompletion: '',
                  socReason: '',
                  socTimeline: '',
                  actualPlan: '',
                  subFunction: '',
                  supportingDocument: '',
                });
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Initiative Created Successfully"
        type="success"
      >
        <p className="text-gray-700">{modalMessage}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateInitiative;