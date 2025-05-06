import {useState} from 'react';
import {DndContext, closestCenter} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import Lane from './components/Lane';

type LaneKey = 'ready' | 'processing' | 'done';
const laneNames: Record<LaneKey, string> = {
  ready: 'Ready',
  processing: 'Processing',
  done: 'Completed',
};
const laneWidth: Record<LaneKey,string> = {
  ready:     'w-1/4',
  processing:'w-1/2',
  done:      'w-1/4',
};

const laneClass: Record<LaneKey,string> = {
  ready:      'basis-1/4 grow-0 shrink-0',   // 25 %
  processing: 'basis-1/2 grow-0 shrink-0',   // 50 %
  done:       'basis-1/4 grow-0 shrink-0',   // 25 %
};

const laneSpan: Record<LaneKey, string> = {
  ready:      'col-span-1',   // 25 %
  processing: 'col-span-2',   // 50 %
  done:       'col-span-1',   // 25 %
};

type Job = {
  id: string;
  priority: 'Low'|'Med'|'High';
  manager: string;
  nsheets: number;
  timeAllowedMin: number;   // or seconds
  progressPct: number;      // 0–100
  details: {
    subnest: string;
    ncName: string;
    material: string;
    thickness: number;
    sheetNo: number;
    location: string;
    doneAt?: string;
  }[];
  status: 'ready'|'processing'|'done';
};

export default function JobBoard() {
  const [lanes, setLanes] = useState<Record<LaneKey, Job[]>>({
    ready: [
      {
        id: 'J‑1023',
        priority: 'High',
        manager: 'Alice',
        nsheets: 3,
        timeAllowedMin: 45,
        progressPct: 0,
        status: 'ready',
        details: [
          { subnest: 'A1', ncName: 'nest_A1.nc', material: 'MildSteel', thickness: 3,
            sheetNo: 1, location: 'Rack 4‑B', doneAt: undefined },
        ],
      },
      // …add more jobs
    ],
    processing: [
      {
        id: 'J‑1021',
        priority: 'Med',
        manager: 'Bob',
        nsheets: 2,
        timeAllowedMin: 30,
        progressPct: 50,
        status: 'processing',
        details: [
          { subnest: 'B3', ncName: 'nest_B3.nc', material: 'Alu', thickness: 2,
            sheetNo: 1, location: 'Table A', doneAt: '09:15' },
          { subnest: 'B4', ncName: 'nest_B4.nc', material: 'Alu', thickness: 2,
            sheetNo: 2, location: 'Table A', doneAt: undefined },
        ],
      },
    ],
    done: [
      {
        id: 'J‑1017',
        priority: 'Low',
        manager: 'Cara',
        nsheets: 1,
        timeAllowedMin: 20,
        progressPct: 100,
        status: 'done',
        details: [
          { subnest: 'C1', ncName: 'nest_C1.nc', material: 'SS', thickness: 1,
            sheetNo: 1, location: 'Stack‑out', doneAt: '08:30' },
        ],
      },
    ],
  });
  

  function handleDragEnd({active, over}: any) {
    if (!over) return;
    const findLane = (id: string) =>
      (Object.keys(lanes) as LaneKey[]).find(key => lanes[key].some(j => j.id === id))!;
    const from = findLane(active.id);
    const to = findLane(over.id) ?? from;

    if (from === to) {
      const oldIndex = lanes[from].findIndex(j => j.id === active.id);
      const newIndex = lanes[to].findIndex(j => j.id === over.id);
      const reordered = arrayMove(lanes[to], oldIndex, newIndex);
      setLanes({...lanes, [to]: reordered});
    } else {
      const job = lanes[from].find(j => j.id === active.id)!;
      setLanes({
        ...lanes,
        [from]: lanes[from].filter(j => j.id !== active.id),
        [to]:   [...lanes[to], job],
      });
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4 p-6 w-full">
        {(Object.keys(lanes) as LaneKey[]).map(key => (
            <Lane key={key}
                  title={laneNames[key]}
                  jobs={lanes[key]}
                  spanClass={laneSpan[key]}
            />
        ))}
      </div>
    </DndContext>
  );
}
