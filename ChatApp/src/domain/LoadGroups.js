class LoadGroups {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    execute(callback) {
        try {
            // Use the repository to load groups and listen for changes
            const unsubscribe = this.groupRepository.getAllGroups(callback);
            return unsubscribe; // Return the unsubscribe function to the caller
        } catch (error) {
            console.error("Error in LoadGroups use case:", error);
            throw error;
        }
    }
}

export default LoadGroups;