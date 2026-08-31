import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoadingAnimation } from '../components/Loading';
import { FiPlus, FiImage, FiCalendar, FiMapPin, FiLayers, FiZap, FiUsers } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('address', address);
    formData.append('category', category);
    formData.append('difficulty', difficulty);
    formData.append('teamSize', teamSize);
    formData.append('file', image);

    try {
      await axios.post('/api/events/new', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success('Event created successfully!');
      navigate('/hosted');
    } catch (error) {
      toast.error('Failed to create event. Please try again.');
      console.error('Error creating event:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
          <FiPlus className="text-[var(--primary)]" />
          Create New Event
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Provide the details below to organize your sports event.
        </p>
      </div>

      <div className="saas-card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Summer Basketball Tournament"
                className="common-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                Event Description
              </label>
              <textarea
                id="description"
                rows="4"
                placeholder="Describe your event, rules, and what to expect..."
                className="common-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <FiCalendar /> Date & Time
              </label>
              <input
                type="date"
                id="date"
                className="common-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <FiMapPin /> Location Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="e.g. Central Park Courts, NY"
                className="common-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <FiLayers /> Category
              </label>
              <select
                id="category"
                className="common-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Basketball">Basketball</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Tennis">Tennis</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <FiZap /> Skill Level
              </label>
              <select
                id="difficulty"
                className="common-input"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            <div>
              <label htmlFor="teamSize" className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <FiUsers /> Max Teams
              </label>
              <input
                type="number"
                id="teamSize"
                placeholder="e.g. 10"
                className="common-input"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <FiImage /> Cover Image
              </label>
              <input
                type="file"
                id="image"
                className="common-input !py-1.5"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border)] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-bold hover:bg-[var(--bg)] transition-all"
            >
              Cancel
            </button>
            <button type="submit" className="px-8 py-2.5 rounded-lg bg-[var(--primary)] text-white font-bold hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-blue-500/20" disabled={loading}>
              {loading ? <LoadingAnimation /> : 'Publish Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
