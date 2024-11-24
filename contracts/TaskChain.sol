// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskChain {
    struct Task {
        uint id;
        string name;
        string description;
        uint deadline;
        bool completed;
    }

    mapping(uint => Task) public tasks;
    uint public taskCount = 0;

    // Membuat tugas baru
    function createTask(string memory _name, string memory _description, uint _deadline) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _name, _description, _deadline, false);
    }

    // Memperbarui status atau deadline tugas
    function updateTask(uint _id, bool _completed, uint _newDeadline) public {
        Task storage task = tasks[_id];
        task.completed = _completed;
        task.deadline = _newDeadline;
    }
}
