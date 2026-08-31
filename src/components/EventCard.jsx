import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { UserData } from '../context/UserContext';
import { Calendar, MapPin, Users, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { user, setUser } = UserData();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRegister = () => {
    navigate(`/register-team/${event._id}`);
  };

  const handleViewDetails = () => {
    navigate(`/events/${event._id}`);
  };

  const handleUnregister = async () => {
    try {
      await api.post(`/events/unregister/${event._id}`);
      const updatedJoinedEvents = user.joinedEvents.filter(
        (eid) => eid.toString() !== event._id
      );
      setUser({ ...user, joinedEvents: updatedJoinedEvents });
    } catch (error) {
      console.error('Error unregistering from event:', error);
    }
  };

  const isRegistered =
    user.joinedEvents && user.joinedEvents.some((eid) => eid.toString() === event._id);

  return (
    <div className="flex flex-col gap-0 !p-0 overflow-hidden group h-full bg-[var(--surface)] border-[1.5px] border-[var(--border)] hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/10 rounded-2xl transition-all duration-300 relative">
      <div className="w-full h-40 overflow-hidden shrink-0 relative">
        <img
          src={event.image?.url || 'https://via.placeholder.com/400x200'}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-md backdrop-blur-md bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/20 shadow-sm">
            {event.category}
          </span>
          <span className={`px-2.5 py-1 rounded-md backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
            event.difficulty?.toLowerCase() === 'hard' ? 'bg-red-500/20 text-red-100 border-red-500/30' :
            event.difficulty?.toLowerCase() === 'medium' ? 'bg-orange-500/20 text-orange-100 border-orange-500/30' :
            'bg-green-500/20 text-green-100 border-green-500/30'
          }`}>
            {event.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1 drop-shadow-md">
            {event.title}
          </h3>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1 bg-[var(--surface)]">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-3 bg-[var(--bg)] p-2.5 rounded-lg border border-[var(--border)]">
           <div className="flex items-center gap-1.5 font-medium">
            <Calendar size={14} className="text-[var(--primary)]" />
            {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-1.5 font-medium">
             <MapPin size={14} className="text-[var(--primary)] shrink-0" />
             <span className="truncate max-w-[90px]">{event.address || event.Address}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mb-3 text-sm text-[var(--text-secondary)] space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="line-clamp-2 leading-relaxed text-[var(--text-primary)]">{event.description}</p>
            <div className="flex justify-between items-center bg-[var(--bg)] p-2.5 rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Users size={16} className="text-[var(--primary)]" />
                <span>Teams: {event.teamSize}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--accent)] font-semibold">
                <TrendingUp size={16} /> 
                <span>Open</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              {isRegistered ? (
                <button
                  onClick={handleUnregister}
                  className="py-2 px-4 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white border border-red-200 dark:border-red-500/20 font-bold transition-all flex-1 text-center shadow-sm"
                >
                  Unregister
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="py-2 px-4 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 font-bold transition-all flex-1 text-center shadow-sm"
                >
                  Register
                </button>
              )}
              <button
                onClick={handleViewDetails}
                className="py-2 px-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg)] hover:border-[var(--primary)] font-bold transition-all flex-1 text-center shadow-sm"
              >
                Details
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-auto w-full py-1.5 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 rounded-md transition-colors text-sm font-medium"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <div className="flex items-center gap-1.5"><ChevronUp size={16} /> <span>Show Less</span></div>
          ) : (
            <div className="flex items-center gap-1.5"><ChevronDown size={16} /> <span>Show More</span></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
