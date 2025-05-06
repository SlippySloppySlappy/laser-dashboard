import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {motion} from 'framer-motion';
import clsx from 'clsx';

export default function JobCard({job}:{job:Job}) {
  const {attributes, listeners, setNodeRef, transform, transition} =
        useSortable({id: job.id});
  const style = {transform: CSS.Transform.toString(transform), transition};

  const badgeColour =
    job.priority === 'High' ? 'bg-red-500'
    : job.priority === 'Med' ? 'bg-yellow-500'
    : 'bg-green-500';

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes} {...listeners}
      style={style}
      layout
      className={clsx(
        'select-none cursor-grab active:cursor-grabbing rounded-xl shadow-lg',
        job.status === 'processing'
          ? 'bg-zinc-700 text-white w-full'
          : 'bg-zinc-800 text-white w-56'
      )}>

      {/* ---------- HEADER ---------- */}
      <div className="flex justify-center items-center gap-3 py-2 border-b border-zinc-600">
        <span className="text-lg font-bold">{job.id}</span>
        <span className={clsx('px-2 py-0.5 text-xs rounded', badgeColour)}>
          {job.priority}
        </span>
      </div>

      {/* ---------- SUB‑HEADER (processing only) ---------- */}
      {job.status === 'processing' && (
        <div className="text-center space-y-1 py-3 border-b border-zinc-600">
          <div className="font-medium">{job.manager}</div>
          <div className="text-xs opacity-80 flex justify-center gap-4">
            <span>{job.nsheets} sheets</span>
            <span>{job.timeAllowedMin} min</span>
          </div>

          {/* progress bar */}
          <div className="h-2 w-11/12 mx-auto bg-zinc-900 rounded">
            <div
              style={{width: `${job.progressPct}%`}}
              className="h-full bg-lime-500 rounded">
            </div>
          </div>
        </div>
      )}

      {/* ---------- DETAILS ---------- */}
      {job.status === 'processing' && (
        <table className="w-full text-xs text-center my-3">
          <thead>
            <tr className="opacity-70">
              <th>Subnest</th><th>NC</th><th>Mat</th>
              <th>Thk</th><th>#</th><th>Loc.</th><th>Done</th>
            </tr>
          </thead>
          <tbody>
            {job.details.map(d => (
              <tr key={d.ncName} className="border-t border-zinc-700">
                <td>{d.subnest}</td>
                <td>{d.ncName}</td>
                <td>{d.material}</td>
                <td>{d.thickness}</td>
                <td>{d.sheetNo}</td>
                <td>{d.location}</td>
                <td>{d.doneAt ? d.doneAt : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
}

