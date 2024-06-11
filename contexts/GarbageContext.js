import React, { createContext, useState, useContext } from 'react';

const GarbageContext = createContext(null);

export const useGarbage = () => useContext(GarbageContext);

const initialUsers = [
  { id: "1", username: "admin", password: "adminpass", contact: "123-456-7890", role: "admin" },
  { id: "2", username: "driver1", password: "driverpass", contact: "234-567-8901", role: "driver" },
  { id: "3", username: "customer1", password: "customerpass", contact: "345-678-9012", role: "customer" }
];

export const GarbageProvider = ({ children }) => {
    const [garbageList, setGarbageList] = useState([]);
    const [users, setUsers] = useState(initialUsers);

    const loadInitialData = (data) => {
        setGarbageList(data);
    };

    const addListing = (newListing) => {
        setGarbageList(current => [...current, newListing]);
    };

    const updateListingStatus = (id, newStatus, driverId = null) => {
        setGarbageList(current =>
            current.map(item => {
                if (item.id === id) {
                    // If the status is being updated by someone other than the accepting driver, return the original item
                    if (item.status === 'accepted' && item.driver_id !== driverId) {
                        console.error('Only the driver who accepted the listing can update its status');
                        return item;
                    }

                    const updatedItem = { ...item, status: newStatus };
                    if (newStatus === 'accepted' && driverId) {
                        const driver = users.find(user => user.id === driverId);
                        if (driver) {
                            updatedItem.driver_id = driverId;
                            updatedItem.driver_name = driver.username;
                            updatedItem.driver_contact = driver.contact;
                        } else {
                            console.error(`Driver with ID ${driverId} not found`);
                        }
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const getUserById = (id) => {
        const user = users.find(user => user.id === id);
        if (!user) {
            console.error(`User with ID ${id} not found`);
        }
        return user;
    };

    const getUserByUsername = (username) => {
        return users.find(user => user.username === username);
    };

    const addUser = (newUser) => {
        setUsers(current => [...current, newUser]);
    };

    return (
        <GarbageContext.Provider value={{ garbageList, addListing, updateListingStatus, loadInitialData, getUserById, getUserByUsername, users, addUser }}>
            {children}
        </GarbageContext.Provider>
    );
};