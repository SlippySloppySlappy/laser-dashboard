import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import JobCard from './JobCard';

type Props = {
  id: string;
  title: string;
  jobs: {id: string; title: string;}[];
};

export default function Lane({id, title, jobs, widthClass}: Props) {
  return (
    <div className="flex flex-col ${widthClass} bg-zinc-900/60 min-h-[60vh] rounded-lg p-3">
      <h2 className="text-center mb-2 text-lime-400 font-semibold">{title}</h2>
      <SortableContext items={jobs.map(j => j.id)}
                       strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {jobs.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      </SortableContext>
    </div>
  );
}