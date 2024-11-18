class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository; // Dependency Injection for data layer
    }

    getGroupById(groupId, callback) {
        return new Promise((resolve, reject) => {
            try {
                // Pass the callback for handling group data and the unsubscribe function
                const unsubscribe = this.groupRepository.getGroupById(groupId, (groupData) => {
                    if (!groupData) {
                        return reject(new Error("Group not found"));
                    }
                    callback(groupData); // Invoke the callback with the data
                    resolve(unsubscribe); // Resolve with the unsubscribe function to allow stopping the listener
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default GroupService;