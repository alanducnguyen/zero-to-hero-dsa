import type { VisualState } from '@/engine/types';
import { ArrayViz } from './ArrayViz';
import { StackQueueViz } from './StackQueueViz';
import { LinkedListViz } from './LinkedListViz';
import { TreeViz } from './TreeViz';
import { GraphViz } from './GraphViz';
import { MatrixViz } from './MatrixViz';
import { HeapViz } from './HeapViz';
import { MapViz } from './MapViz';
import { EventLoopViz } from './EventLoopViz';

export function Visual({ v }: { v: VisualState }) {
  switch (v.kind) {
    case 'array': return <ArrayViz v={v} />;
    case 'stackqueue': return <StackQueueViz v={v} />;
    case 'linkedlist': return <LinkedListViz v={v} />;
    case 'tree': return <TreeViz v={v} />;
    case 'graph': return <GraphViz v={v} />;
    case 'matrix': return <MatrixViz v={v} />;
    case 'heap': return <HeapViz v={v} />;
    case 'map': return <MapViz v={v} />;
    case 'eventloop': return <EventLoopViz v={v} />;
    case 'composite':
      return (
        <div className={v.layout === 'row' ? 'flex flex-wrap items-start justify-center gap-8' : 'flex flex-col items-center gap-6'}>
          {v.parts.map((p, i) => <Visual key={i} v={p} />)}
        </div>
      );
  }
}
