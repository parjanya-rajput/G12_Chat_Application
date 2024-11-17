import { useState, useEffect } from 'react';
import GroupRepository from '../data/GroupRepository'; // Adjust the import path according to your project structure
import LoadGroups from './LoadGroups'; // Import the LoadGroups class

const GetAllGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize LoadGroups with the GroupRepository
    const loadGroups = new LoadGroups(GroupRepository);

    useEffect(() => {
        setLoading(true);

        // Use LoadGroups to set up the real-time listener for groups
        const unsubscribe = loadGroups.execute((result) => {
            console.log(result); // Log the groups including members and messages for debugging
            setGroups(result);
            setLoading(false);
        });

        // Handle errors
        unsubscribe.catch((err) => {
            setError(err.message);
            setLoading(false);
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe && unsubscribe();
    }, []);

    return { groups, loading, error };
};

export default GetAllGroups;
