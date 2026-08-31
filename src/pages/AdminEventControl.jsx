import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEventControl = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`, { withCredentials: true });
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  const handleRemoveTeam = async (teamId) => {
    if (!window.confirm("Are you sure you want to remove this team? This action cannot be undone.")) {
      return;
    }
    try {
      // Call backend to remove the team from the event and delete the team
      await axios.delete(`/api/events/${id}/teams/${teamId}`, { withCredentials: true });
      // Update local state after removal
      setEvent({
        ...event,
        participants: event.participants.filter(team => team._id !== teamId)
      });
    } catch (error) {
      console.error('Error removing team from event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }
    try {
      await axios.delete(`/api/events/${id}`, { withCredentials: true });
      alert("Event deleted successfully.");
      navigate('/hosted');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!event) return <div className="p-4">Event not found</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Admin Control: {event.title}</h1>
        <button
          onClick={handleDeleteEvent}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete Event
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Registered Teams</h2>
      <div className="space-y-4">
        {event.participants && event.participants.length > 0 ? (
          event.participants.map((team) => (
            <div key={team._id} className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold">{team.name}</h3>
              <p className="text-sm text-gray-600">
                Leader: {team.leader && team.leader.name ? team.leader.name : "Unknown"}
              </p>
              {team.members && team.members.length > 0 && (
                <>
                  <p className="text-sm font-medium">Members:</p>
                  <ul className="list-disc ml-4">
                    {team.members.map((member, index) => (
                      <li key={index}>
                        {member.name} ({member.age} years)
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <button
                onClick={() => handleRemoveTeam(team._id)}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Remove Team
              </button>
            </div>
          ))
        ) : (
          <p>No registered teams found for this event.</p>
        )}
      </div>
    </div>
  );
};

export default AdminEventControl;
