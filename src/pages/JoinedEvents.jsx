import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import EventCard from '../components/EventCard';
import { Loading } from '../components/Loading';
import { FiCheckSquare, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const JoinedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const { data } = await api.get('/events/joined');
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching joined events:', error);
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
            <FiCheckSquare className="text-[var(--accent)]" />
            Your Joined Events
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Keep track of the sports events you're participating in.
          </p>
        </div>
        <Link
          to="/events"
          className="btn-secondary !py-2 !rounded-lg !text-sm flex items-center gap-2"
        >
          <FiCalendar />
          Discover More
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {events.length > 0 ? (
            events.map(event => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <div className="saas-card text-center py-10 bg-[var(--surface)]/50 border-dashed">
              <div className="w-12 h-12 bg-[var(--bg)] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                🙌
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">No events joined yet</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Ready to play? Find an event and join a team today!</p>
              <Link
                to="/events"
                className="mt-4 inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline text-sm"
              >
                Browse available events <FiCalendar />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;