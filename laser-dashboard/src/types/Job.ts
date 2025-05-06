export interface Job {
    id: string;
    priority: 'Low' | 'Med' | 'High';
    manager: string;
    nsheets: number;
    timeAllowedMin: number;
    progressPct: number;
    status: 'ready' | 'processing' | 'done';
  
    details: {
      subnest: string;
      ncName: string;
      material: string;
      thickness: number;
      sheetNo: number;
      location: string;
      doneAt?: string;
    }[];
  }
  