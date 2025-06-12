import React, { useState } from 'react';
import { Save, ChevronDown, ArrowRight, ChevronUp } from 'lucide-react';
import { Initiative, Project } from '../types';
import { supabase } from '../lib/supabase';
import Modal from './Modal';

interface CreateProjectProps {
  initiatives: Initiative[];
  onProjectSubmit: (project: Project) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ initiatives, onProjectSubmit }) => {
  const [step, setStep] = useState(1);
  const [selectedInitiative, setSelectedInitiative] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [milestonesExpanded, setMilestonesExpanded] = useState(false);

  const [reviewMetadata, setReviewMetadata] = useState({
    iscmLevel: '',
    functionalLevel: '',
    departmentLevel: '',
  });

  // State for project form fields, aligned with table data
  const [formData, setFormData] = useState({
    driver: '',
    focusArea: '',
    function: '',
    initiativeName: '',
    tag: 'BAU',
    statusUpdate: 'Not Started',
    feasibility: '',
    designValidation: '',
    techDataRelease: '',
    pocManufacturing: '',
    mvtValidation: '',
    pocWatchAssly: '',
    certification: '',
    massProduction: '',
    timeForMass: '',
    uom: '',
    deliverables2526: '',
    deliverables2627: '',
    primaryResponsibility: '',
    associateResponsibility: '',
    reviewFrequency: [] as string[],
    reviewForum: '',
  });

  // Dropdown options based on table data and form requirements
  const dropdownOptions = {
    driver: [
      { value: '', label: 'Select Driver' },
      { value: 'Movement', label: 'Movement' },
      // Add more drivers as needed
    ],
    focusArea: [
      { value: '', label: 'Select Focus Area' },
      { value: 'Movement - Mechanical Mainline', label: 'Movement - Mechanical Mainline' },
    ],
    function: [
      { value: '', label: 'Select Function' },
      { value: 'Movement', label: 'Movement' },
    ],
    initiativeName: [
      { value: '', label: 'Select Initiative' },
      { value: 'World time (through City Disc) with India Time focus', label: 'World time (through City Disc) with India Time focus' },
      { value: 'Increased Power Reserve (60hrs+) in Mainline Movement', label: 'Increased Power Reserve (60hrs+) in Mainline Movement' },
      { value: 'Multifunction Mechanical movement with pushers', label: 'Multifunction Mechanical movement with pushers' },
      { value: 'Power Reserve Indicator at 12H Position', label: 'Power Reserve Indicator at 12H Position' },
      { value: 'Perpetual Moonphase Complication (accurate to x days)', label: 'Perpetual Moonphase Complication (accurate to x days)' },
      { value: 'Hour / Minute hands at center + Small Seconds @ 6H', label: 'Hour / Minute hands at center + Small Seconds @ 6H' },
      { value: 'Jumping Hours through disc & Minute Indication through Hands', label: 'Jumping Hours through disc & Minute Indication through Hands' },
      { value: '3 Hands at Center + Big Date (2 discs at same level)', label: '3 Hands at Center + Big Date (2 discs at same level)' },
      { value: 'Thin Automatics ; 3.60 mm ~ 3.80 mm thickness', label: 'Thin Automatics ; 3.60 mm ~ 3.80 mm thickness' },
    ],
    tag: [
      { value: 'BAU', label: 'BAU' },
      // Add other tags if needed
    ],
    statusUpdate: [
      { value: 'Not Started', label: 'Not Started' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Delayed', label: 'Delayed' },
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
    reviewForum: [
      { value: '', label: 'Select Review Forum' },
      { value: 'Plant Level', label: 'Plant Level' },
      // Add more forums as needed
    ],
    milestoneStatus: [
      { value: '', label: 'Select Status' },
      { value: 'Yet to Start', label: 'Yet to Start' },
      { value: 'WIP', label: 'WIP' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Dropped', label: 'Dropped' },
    ],
  };

  const handleInitiativeSelect = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInitiative) {
      setStep(2);
    }
  };

  const saveToSupabase = async (project: Project) => {
    try {
      // Save review metadata for project
      const { error: reviewError } = await supabase
        .from('review_form_metadata')
        .insert({
          initiative_id: project.id, // Using project ID as reference
          iscm_level: reviewMetadata.iscmLevel,
          functional_level: reviewMetadata.functionalLevel,
          department_level: reviewMetadata.departmentLevel,
        });

      if (reviewError) {
        console.error('Error saving project review metadata:', reviewError);
      }

      // Save project status
      const { error: goalError } = await supabase
        .from('goals')
        .insert({
          initiative_id: project.id,
          goal_year: new Date().getFullYear().toString(),
          status_update: project.statusUpdate,
          driver: formData.driver,
          department: formData.function,
        });

      if (goalError) {
        console.error('Error saving project status:', goalError);
      }
    } catch (error) {
      console.error('Error saving project to Supabase:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedInit = initiatives.find((init) => init.id === selectedInitiative);
    if (!selectedInit) return;

    const project: Project = {
      id: Date.now().toString(),
      initiativeId: selectedInitiative,
      ...formData,
      reviewMetadata,
      createdAt: new Date(),
      milestones: {
        keyMilestones: '',
        feasibility: formData.feasibility,
        designValidation: formData.designValidation,
        techDataRelease: formData.techDataRelease,
        pocManufacturing: formData.pocManufacturing,
        mvtValidation: formData.mvtValidation,
        pocWatchAssly: formData.pocWatchAssly,
        certification: formData.certification,
        hasProduction: formData.massProduction,
        timeForMass: formData.timeForMass
      }
    };

    // Save to Supabase
    await saveToSupabase(project);

    onProjectSubmit(project);
    setModalMessage(`Project for "${selectedInit.name}" has been successfully created and saved to the database.`);
    setShowModal(true);

    // Reset form
    setStep(1);
    setSelectedInitiative('');
    setReviewMetadata({ iscmLevel: '', functionalLevel: '', departmentLevel: '' });
    setFormData({
      driver: '',
      focusArea: '',
      function: '',
      initiativeName: '',
      tag: 'BAU',
      statusUpdate: 'Not Started',
      feasibility: '',
      designValidation: '',
      techDataRelease: '',
      pocManufacturing: '',
      mvtValidation: '',
      pocWatchAssly: '',
      certification: '',
      massProduction: '',
      timeForMass: '',
      uom: '',
      deliverables2526: '',
      deliverables2627: '',
      primaryResponsibility: '',
      associateResponsibility: '',
      reviewFrequency: [],
      reviewForum: '',
    });
  };

  const handleCheckboxChange = (key: 'reviewFrequency', value: string) => {
    setFormData((prev) => {
      const currentValues = prev[key];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: updatedValues };
    });
  };

  const CustomDropdown: React.FC<{
    value: string | string[];
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
  }> = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
              {value ? options.find((opt) => opt.value === value)?.label : placeholder}
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
                className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Project</h2>
          <p className="text-gray-600">Step 1: Select an Initiative</p>
        </div>

        <form onSubmit={handleInitiativeSelect} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Initiative *</label>
            <CustomDropdown
              value={selectedInitiative}
              onChange={(value) => setSelectedInitiative(value)}
              options={initiatives.map((init) => ({
                value: init.id,
                label: `${init.name} (${init.department} • ${init.goalYear})`,
              }))}
              placeholder="Select an initiative"
            />
          </div>

          {initiatives.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                No initiatives available. Please create an initiative first before creating a project.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={!selectedInitiative}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${selectedInitiative
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <span>Next Step</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  const selectedInit = initiatives.find((init) => init.id === selectedInitiative);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Discussion Form</h2>
        <p className="text-gray-600">Step 2: Complete the project details</p>
        {selectedInit && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
            <h3 className="font-medium text-emerald-800">Selected Initiative:</h3>
            <p className="text-emerald-700">{selectedInit.name}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Driver *</label>
            <CustomDropdown
              value={formData.driver}
              onChange={(value) => setFormData({ ...formData, driver: value })}
              options={dropdownOptions.driver}
              placeholder="Select driver"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Focus Area *</label>
            <CustomDropdown
              value={formData.focusArea}
              onChange={(value) => setFormData({ ...formData, focusArea: value })}
              options={dropdownOptions.focusArea}
              placeholder="Select focus area"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Function *</label>
            <CustomDropdown
              value={formData.function}
              onChange={(value) => setFormData({ ...formData, function: value })}
              options={dropdownOptions.function}
              placeholder="Select function"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Initiative *</label>
            <CustomDropdown
              value={formData.initiativeName}
              onChange={(value) => setFormData({ ...formData, initiativeName: value })}
              options={dropdownOptions.initiativeName}
              placeholder="Select initiative"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <CustomDropdown
              value={formData.tag}
              onChange={(value) => setFormData({ ...formData, tag: value })}
              options={dropdownOptions.tag}
              placeholder="Select tag"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status Update</label>
            <CustomDropdown
              value={formData.statusUpdate}
              onChange={(value) => setFormData({ ...formData, statusUpdate: value })}
              options={dropdownOptions.statusUpdate}
              placeholder="Select status"
            />
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
                  { label: 'Feasibility', key: 'feasibility' },
                  { label: 'Design Validation', key: 'designValidation' },
                  { label: 'Tech Data Release', key: 'techDataRelease' },
                  { label: 'POC Manufacturing', key: 'pocManufacturing' },
                  { label: 'Mvt Validation', key: 'mvtValidation' },
                  { label: 'POC Watch Assembly', key: 'pocWatchAssly' },
                  { label: 'Certification', key: 'certification' },
                  { label: 'Mass Production', key: 'massProduction' },
                  { label: 'Time for Mass', key: 'timeForMass' },
                ].map((milestone) => (
                  <div key={milestone.key} className="bg-white p-3 rounded-lg border border-gray-200">
                    <label className="block text-xs font-medium text-gray-700 mb-1">{milestone.label}</label>
                    <input
                      type="text"
                      value={formData[milestone.key as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [milestone.key]: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-200 focus:border-emerald-500"
                      placeholder="mm-yyyy or status"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-100 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UOM</label>
              <input
                type="text"
                value={formData.uom}
                onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                placeholder="Enter UOM (e.g., 4M)"
              />
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Responsibility *</label>
              <input
                type="text"
                value={formData.primaryResponsibility}
                onChange={(e) => setFormData({ ...formData, primaryResponsibility: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                placeholder="Enter primary responsibility"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Associate Responsibility</label>
              <input
                type="text"
                value={formData.associateResponsibility}
                onChange={(e) => setFormData({ ...formData, associateResponsibility: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                placeholder="Enter associate responsibility"
              />
            </div>
          </div>
        </div>

        <div className="bg-orange-100 p-4 rounded-lg space-y-4">
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

        <div className="bg-yellow-100 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables 25-26</label>
              <textarea
                value={formData.deliverables2526}
                onChange={(e) => setFormData({ ...formData, deliverables2526: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                placeholder="Enter deliverables for FY 25-26"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables 26-27</label>
              <textarea
                value={formData.deliverables2627}
                onChange={(e) => setFormData({ ...formData, deliverables2627: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                placeholder="Enter deliverables for FY 26-27"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setSelectedInitiative('');
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Back to Selection
          </button>

          <div className="space-x-4">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Save size={16} />
              <span>Create Project</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  driver: '',
                  focusArea: '',
                  function: '',
                  initiativeName: '',
                  tag: 'BAU',
                  statusUpdate: 'Not Started',
                  feasibility: '',
                  designValidation: '',
                  techDataRelease: '',
                  pocManufacturing: '',
                  mvtValidation: '',
                  pocWatchAssly: '',
                  certification: '',
                  massProduction: '',
                  timeForMass: '',
                  uom: '',
                  deliverables2526: '',
                  deliverables2627: '',
                  primaryResponsibility: '',
                  associateResponsibility: '',
                  reviewFrequency: [],
                  reviewForum: '',
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
        title="Project Created Successfully"
        type="success"
      >
        <p className="text-gray-700">{modalMessage}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProject;