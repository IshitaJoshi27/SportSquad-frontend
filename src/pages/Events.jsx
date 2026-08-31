import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import EventCard from '../components/EventCard';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { Loading } from '../components/Loading';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events/allEvents');
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Browse Events</h1>
          <p className="text-[var(--text-secondary)]">Discover and join sports events happening near you.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search events..."
              className="common-input !mt-0 !pl-10 !py-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 h-10 w-10 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all">
            <FiFilter />
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <div className="saas-card text-center py-10 bg-[var(--surface)]/50 border-dashed">
              <div className="w-12 h-12 bg-[var(--bg)] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                🔎
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">No events match your search</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Try a different keyword or category.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-[var(--primary)] font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;