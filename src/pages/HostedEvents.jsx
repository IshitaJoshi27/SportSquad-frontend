import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { FiUsers, FiPlus, FiSettings } from 'react-icons/fi';
import { Loading } from '../components/Loading';

const HostedEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostedEvents = async () => {
      try {
        const { data } = await api.get('/events/hosted');
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hosted events:', error);
        setLoading(false);
      }
    };

    fetchHostedEvents();
  }, []);

  const handleAdminControl = (id) => {
    navigate(`/admin/events/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
            <FiUsers className="text-[var(--primary)]" />
            Events You Host
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Manage the tournaments and games you've organized.
          </p>
        </div>
        <Link
          to="/createevent"
          className="btn-primary !py-2 !rounded-lg !text-sm flex items-center gap-2"
        >
          <FiPlus />
          Create New
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event._id} className="relative group">
                <EventCard event={event} />
                <button
                  onClick={() => handleAdminControl(event._id)}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] text-sm font-bold hover:bg-[var(--bg)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-sm"
                >
                  <FiSettings className="text-lg" />
                  Event Admin Dashboard
                </button>
              </div>
            ))
          ) : (
            <div className="saas-card text-center py-10 bg-[var(--surface)]/50 border-dashed">
              <div className="w-12 h-12 bg-[var(--bg)] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                📣
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">No hosted events</h3>
              <p className="text-[var(--text-secondary)] text-sm mt-1">Organize your first event to build your squad's legacy.</p>
              <Link
                to="/createevent"
                className="mt-4 inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline text-sm"
              >
                Create your first event <FiPlus />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HostedEvents;