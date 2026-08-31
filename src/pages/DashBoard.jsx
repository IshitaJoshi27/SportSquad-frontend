import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import EventCard from '../components/EventCard';
import { UserData } from '../context/UserContext';
import { FiTrendingUp, FiCalendar } from 'react-icons/fi';

const DashBoard = () => {
  const [events, setEvents] = useState([]);
  const { user } = UserData();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events/allEvents');
        setEvents(data.slice(0, 3)); // Get top 3
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Here's what's happening with your sports squads today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Member Since</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">April 2024</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">
            🏆
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <FiTrendingUp className="text-[var(--accent)]" />
              Latest Opportunities
            </h2>
            <button className="text-sm font-semibold text-[var(--primary)] hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {events.length > 0 ? (
              events.map(event => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <div className="saas-card text-center py-12">
                <div className="w-16 h-16 bg-[var(--bg)] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📅
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">No events yet</h3>
                <p className="text-[var(--text-secondary)] mt-1">Browse available events to get started.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <FiCalendar className="text-[var(--primary)]" />
            Your Schedule
          </h2>
          <div className="saas-card !p-0 overflow-hidden">
            <div className="p-3 border-b border-[var(--border)] bg-[var(--bg)]/50">
              <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Upcoming Games</p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {user.joinedEvents?.length > 0 ? (
                <div className="p-6 text-center text-[var(--text-secondary)] text-sm">
                  Feature coming soon!
                </div>
              ) : (
                <div className="p-6 text-center text-[var(--text-secondary)] text-sm">
                  You haven't joined any events yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;