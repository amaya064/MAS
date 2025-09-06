import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendar, 
  FaTools, 
  FaUserFriends, 
  FaCheckCircle, 
  FaSave,
  FaBuilding,
  FaCog
} from 'react-icons/fa';

export default function Machine_maintenance_schedule() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    month: '',
    department: '',
    machineName: '',
    startDate: '',
    endDate: '',
    nextScheduleDate: '',
    frequency: '',
    pmTeam: '',
    checkType: ''
  });

  // Fetch machines from database
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/machines');
        setMachines(response.data.data);
      } catch (error) {
        console.error('Error fetching machines:', error);
        alert('Failed to fetch machines. Please check if the server is running.');
      }
    };

    fetchMachines();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/machines/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        alert('Maintenance schedule created successfully!');
        // Reset form
        setFormData({
          month: '',
          department: '',
          machineName: '',
          startDate: '',
          endDate: '',
          nextScheduleDate: '',
          frequency: '',
          pmTeam: '',
          checkType: ''
        });
      }
    } catch (error) {
      console.error('Error creating maintenance schedule:', error);
      alert(error.response?.data?.message || 'Failed to create maintenance schedule');
    } finally {
      setLoading(false);
    }
  };

  // Options for dropdowns
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const departments = [
    'Maintenance', 'Production', 'Quality Control', 'Engineering',
    'Operations', 'Technical Support', 'Facilities', 'Health & Safety'
  ];

  const frequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];
  
  const pmTeams = Array.from({length: 20}, (_, i) => `PMT-${(i + 1).toString().padStart(2, '0')}`);
  
  const checkTypes = ['A-Check', 'B-Check', 'C-Check'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (similar to your other components) */}
      <aside className="w-56 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl">
        {/* ... your existing sidebar code ... */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl mb-3">
              <FaCalendar className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Machine Maintenance Schedule
            </h1>
            <p className="text-gray-600 text-sm">
              Schedule and manage machine maintenance activities
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Month Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FaCalendar className="inline mr-2 text-teal-500 text-xs" />
                    Month
                  </label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  >
                    <option value="">Select Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>

                {/* Department Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FaBuilding className="inline mr-2 text-teal-500 text-xs" />
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Machine Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FaCog className="inline mr-2 text-teal-500 text-xs" />
                    Machine
                  </label>
                  <select
                    name="machineName"
                    value={formData.machineName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  >
                    <option value="">Select Machine</option>
                    {machines.map(machine => (
                      <option key={machine._id} value={machine.machineName}>
                        {machine.machineName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PM Team Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FaUserFriends className="inline mr-2 text-teal-500 text-xs" />
                    PM Team
                  </label>
                  <select
                    name="pmTeam"
                    value={formData.pmTeam}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  >
                    <option value="">Select PM Team</option>
                    {pmTeams.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  />
                </div>

                {/* Next Schedule Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Next Schedule Date
                  </label>
                  <input
                    type="date"
                    name="nextScheduleDate"
                    value={formData.nextScheduleDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  />
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  >
                    <option value="">Select Frequency</option>
                    {frequencies.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                </div>

                {/* Check Type */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FaCheckCircle className="inline mr-2 text-teal-500 text-xs" />
                    Check Type
                  </label>
                  <select
                    name="checkType"
                    value={formData.checkType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    required
                  >
                    <option value="">Select Check Type</option>
                    {checkTypes.map(check => (
                      <option key={check} value={check}>{check}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <FaSave className="mr-2 text-sm" />
                  {loading ? 'Saving...' : 'Save Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}