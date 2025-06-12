export interface Initiative {
  initiativeName: string;
  id: string;
  name: string;
  goalYear: string;
  driver: string;
  forYourInformation: string;
  department: string;
  statusUpdate?: string;
  formData: {
    function: string;
    exploration: string;
    evaluation: string;
    poc: string;
    validation: string;
    estimation: string;
    decision: string;
    ipr: string;
    watch: string;
    certification: string;
    year2526: string;
    year2627: string;
    primary: string;
    associate: string;
    reviewFrequency: string;
    reviewForum: string;
  };
  reviewMetadata?: {
    iscmLevel: string;
    functionalLevel: string;
    departmentLevel: string;
  };
  createdAt: Date;
}

export interface Project {
  primaryResponsibility: string;
  feasibility: string;
  designValidation: string;
  techDataRelease: string;
  timeForMass: string;
  status: string;
  id: string;
  initiativeId: string;
  initiativeName: string;
  statusUpdate?: string;
  milestones: {
    keyMilestones: string;
    feasibility: string;
    designValidation: string;
    techDataRelease: string;
    pocManufacturing: string;
    mvtValidation: string;
    pocWatchAssly: string;
    certification: string;
    hasProduction: string;
    timeForMass: string;
  };
  reviewMetadata?: {
    iscmLevel: string;
    functionalLevel: string;
    departmentLevel: string;
  };
  createdAt: Date;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface ReviewFormMetadata {
  id?: string;
  initiativeId: string;
  iscmLevel: string;
  functionalLevel: string;
  departmentLevel: string;
  createdAt?: Date;
  updatedAt?: Date;
}