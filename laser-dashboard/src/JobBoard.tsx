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

export default function JobBoard() {
  const [lanes, setLanes] = useState<Record<LaneKey, {id: string; title: string;}[]>>({
    ready: [{id: 'J-1023', title: 'Job 1023'}, {id: 'J-1024', title: 'Job 1024'}],
    processing: [{id: 'J-1021', title: 'Job 1021'}],
    done: [{id: 'J-1017', title: 'Job 1017'}],
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
      <div className="flex gap-4 p-6">
        {(Object.keys(lanes) as LaneKey[]).map(key => (
          <Lane key={key} id={key} title={laneNames[key]} jobs={lanes[key]} />
        ))}
      </div>
    </DndContext>
  );
}
