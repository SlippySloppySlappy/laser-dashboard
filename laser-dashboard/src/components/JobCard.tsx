import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

type Props = { id: string; title: string; };
export default function JobCard({id, title}: Props) {
  const {attributes, listeners, setNodeRef, transform, transition} =
        useSortable({id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef}
         {...attributes} {...listeners}
         style={style}
         className="select-none cursor-grab active:cursor-grabbing
                    bg-zinc-800 text-white rounded-xl p-4 shadow-lg">
      {title}
    </div>
  );
}
