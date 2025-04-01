import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Star } from 'lucide-react';
import { Player } from '../types';

interface SortablePlayerProps {
  player: Player;
  index: number;
}

export function SortablePlayer({ player }: SortablePlayerProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ 
    id: player.id,
    data: {
      type: 'player',
      player
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    position: 'relative' as const,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-3 rounded-xl shadow-sm border ${
        isDragging 
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-500 ring-opacity-50' 
          : isOver 
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200'
      } hover:border-blue-500 transition-all duration-200`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{player.accountName}</p>
          <p className="text-sm text-gray-600">TH {player.townhallLevel}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4" />
            <span className="text-sm">{player.previousStars}/21</span>
          </div>
          <p className="text-sm text-gray-600">{player.previousPercentage}%</p>
        </div>
      </div>
    </div>
  );
}