import { useState, useEffect } from 'react';
import UserRepository from "../data/UserRepository"

const GetAllUsers = () => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const result = await UserRepository.getAllUsers();
                console.log(result);
                setUsers(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default GetAllUsers;
