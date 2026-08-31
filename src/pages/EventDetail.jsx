import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { UserData } from '../context/UserContext';
import { Loading } from '../components/Loading';
import { FiCalendar, FiMapPin, FiUsers, FiTag, FiZap, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = UserData();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        toast.error('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Event not found</h2>
        <button onClick={() => navigate('/events')} className="mt-4 text-[var(--primary)] hover:underline">
          Back to all events
        </button>
      </div>
    );
  }

  const isRegistered =
    user.joinedEvents && user.joinedEvents.some((eid) => eid.toString() === event._id);

  const handleRegister = () => {
    navigate(`/register-team/${event._id}`);
  };

  const handleUnregister = async () => {
    try {
      await api.post(`/events/unregister/${event._id}`);
      const updatedJoinedEvents = user.joinedEvents.filter(
        (eid) => eid.toString() !== event._id
      );
      setUser({ ...user, joinedEvents: updatedJoinedEvents });
      toast.success('Successfully unregistered');
    } catch (error) {
      console.error('Error unregistering from event:', error);
      toast.error('Failed to unregister');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="saas-card !p-0 overflow-hidden">
            <div className="relative h-80 sm:h-96">
              <img
                src={event.image.url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-blue-600 text-xs font-bold uppercase tracking-wider shadow-sm">
                  {event.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-green-600 text-xs font-bold uppercase tracking-wider shadow-sm">
                  {event.difficulty}
                </span>
              </div>
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
                {event.title}
              </h1>
              <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed">
                {event.description}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="saas-card sticky top-24">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 border-b border-[var(--border)] pb-4">
              Event Details
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[var(--primary)] shrink-0">
                  <FiCalendar />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Date & Time</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-[var(--accent)] shrink-0">
                  <FiMapPin />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{event.address || event.Address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 shrink-0">
                  <FiUsers />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Team Capacity</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{event.teamSize} Teams Max</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              {isRegistered ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-bold text-sm">
                    <FiCheckCircle /> You are registered
                  </div>
                  <button
                    onClick={handleUnregister}
                    className="w-full py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-600 hover:text-white font-bold transition-all text-sm"
                  >
                    Unregister from event
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  className="w-full py-3 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] font-bold transition-all shadow-lg shadow-blue-500/20 text-sm"
                >
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;