import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import JobCard from './JobCard';

type Props = {
  id: string;
  title: string;
  jobs: {id: string; title: string;}[];
};

export default function Lane({id, title, jobs}: Props) {
  return (
    <div className="flex flex-col w-1/3 bg-zinc-900/60 rounded-lg p-3">
      <h2 className="text-center mb-2 text-lime-400 font-semibold">{title}</h2>
      <SortableContext items={jobs.map(j => j.id)}
                       strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {jobs.map(j => <JobCard key={j.id} {...j} />)}
        </div>
      </SortableContext>
    </div>
  );
}
