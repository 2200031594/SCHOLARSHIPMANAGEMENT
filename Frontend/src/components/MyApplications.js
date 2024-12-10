import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyApplications.css';

const MyApplications = () => {
    const [applications, setApplications] = useState([]); // Stores all applications
    const [filteredApplications, setFilteredApplications] = useState([]); // Stores filtered applications
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState(''); // Default is 'All'

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            setError('User not logged in');
            setLoading(false);
            return;
        }

        // Fetch all applications from the backend
        axios.get(`https://scholarshipmanagement.up.railway.app/api/applications/user/${userId}`)
            .then(response => {
                // Map null statuses to 'Pending'
                const updatedApplications = response.data.map(application => ({
                    ...application,
                    status: application.status === null ? 'Pending' : application.status,
                }));
                setApplications(updatedApplications); // Store all applications
                setFilteredApplications(updatedApplications); // Initially, show all
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching applications');
                setLoading(false);
            });
    }, [userId]);

    // Filter applications based on the selected status
    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);

        if (status === '') {
            // Show all applications
            setFilteredApplications(applications);
        } else {
            // Filter applications based on the status
            const filtered = applications.filter(app => app.status === status);
            setFilteredApplications(filtered);
        }
    };

    const handleViewApplication = (applicationId) => {
        console.log(`Viewing application ${applicationId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (filteredApplications.length === 0) {
        return <div>No applications found</div>;
    }

    return (
        <div className="applications-container">
            <div className="status-buttons">
                {/* 4 buttons with white background and black text */}
                <button 
                    className="status-button" 
                    onClick={() => handleStatusFilterChange('')}>
                    All
                </button>
                <button 
                    className="status-button" 
                    onClick={() => handleStatusFilterChange('Pending')}>
                    Pending
                </button>
                <button 
                    className="status-button" 
                    onClick={() => handleStatusFilterChange('Accepted')}>
                    Accepted
                </button>
                <button 
                    className="status-button" 
                    onClick={() => handleStatusFilterChange('Rejected')}>
                    Rejected
                </button>
            </div>

            {/* List of applications */}
            {filteredApplications.map(application => (
                <div className="application-item" key={application.id}>
                    <div className="scholarship-name">{application.scholarship?.name || 'Unknown Scholarship'}</div>
                    <div className="application-status">{application.status}</div>
                    <button onClick={() => handleViewApplication(application.id)}>
                        View Application
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MyApplications;
