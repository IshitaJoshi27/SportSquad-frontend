import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { LoadingAnimation } from '../components/Loading';
import { FiUsers, FiPlus, FiTrash2, FiUser, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

const RegisterTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = UserData();
  const [name, setName] = useState('');
  const [members, setMembers] = useState([{ name: '', age: '' }]);
  const [loading, setLoading] = useState(false);

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const addMember = () => {
    setMembers([...members, { name: '', age: '' }]);
  };

  const removeMember = (index) => {
    if (members.length === 1) return;
    setMembers(members.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/events/register/${id}`, { name, members });
      setUser({ ...user, joinedEvents: [...user.joinedEvents, id] });
      toast.success('Team registered successfully!');
      navigate('/joined');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Error registering team:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
          <FiUsers className="text-[var(--primary)]" />
          Register Team
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Complete the form below to enter the competition.
        </p>
      </div>

      <div className="saas-card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-[var(--text-primary)] mb-2">
              Team Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g. The Sharp Shooters"
              className="common-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Team Members</h3>
              <button
                type="button"
                onClick={addMember}
                className="text-xs font-bold text-[var(--primary)] flex items-center gap-1 hover:underline"
              >
                <FiPlus /> Add Member
              </button>
            </div>

            {members.map((member, index) => (
              <div key={index} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]/30 space-y-3 relative group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Member #{index + 1}</span>
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="Remove member"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="common-input !mt-0 !pl-10 !py-2"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <input
                    type="number"
                    placeholder="Age"
                    className="common-input !mt-0 !py-2"
                    value={member.age}
                    onChange={(e) => handleMemberChange(index, 'age', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--border)]">
            <button type="submit" className="w-full py-3 rounded-xl bg-[var(--primary)] text-white font-bold hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-blue-500/20" disabled={loading}>
              {loading ? <LoadingAnimation /> : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeam;