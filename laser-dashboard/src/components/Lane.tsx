import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import JobCard from './JobCard';
import { Job } from '../types/Job';          // adjust path if needed

type Props = {
  title: string;
  jobs: Job[];
  spanClass: string;                        // NEW: grid‑column span
};

export default function Lane({ title, jobs, spanClass }: Props) {
  return (
    <div
      className={`flex flex-col ${spanClass} bg-zinc-900/60 min-h-[60vh] rounded-lg p-3`}
    >
      <h2 className="text-center mb-2 text-lime-400 font-semibold">{title}</h2>

      <SortableContext
        items={jobs.map(j => j.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
          {jobs.map(j => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
