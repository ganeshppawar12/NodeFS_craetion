const fs = require('fs');
const path = require('path');
const readline = require('readline');

// File path for storing tasks
const filePath = path.join(__dirname, 'tasks.txt');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to read tasks from file
const readTasks = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

// Function to write tasks to file
const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
};

// Function to add a new task
const addTask = () => {
    rl.question('Enter a new task: ', (task) => {
        const tasks = readTasks();
        tasks.push({ task, completed: false });
        writeTasks(tasks);
        console.log('Task added successfully!');
        rl.close();
    });
};

// Function to view tasks
const viewTasks = () => {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('\n📝 Task List:');
        tasks.forEach((t, i) => {
            console.log(`${i + 1}. ${t.completed ? '[✔] ' : '[ ] '} ${t.task}`);
        });
    }
    rl.close();
};

// Function to mark a task as complete
const markComplete = () => {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('No tasks to mark as complete.');
        return rl.close();
    }
    viewTasks();
    rl.question('Enter task number to mark as complete: ', (num) => {
        const index = parseInt(num) - 1;
        if (tasks[index]) {
            tasks[index].completed = true;
            writeTasks(tasks);
            console.log('Task marked as complete!');
        } else {
            console.log('Invalid task number.');
        }
        rl.close();
    });
};

// Function to remove a task
const removeTask = () => {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('No tasks to remove.');
        return rl.close();
    }
    viewTasks();
    rl.question('Enter task number to remove: ', (num) => {
        const index = parseInt(num) - 1;
        if (tasks[index]) {
            tasks.splice(index, 1);
            writeTasks(tasks);
            console.log('Task removed successfully!');
        } else {
            console.log('Invalid task number.');
        }
        rl.close();
    });
};

// CLI Menu
console.log('\n📌 To-Do List Menu:');
console.log('1. Add Task');
console.log('2. View Tasks');
console.log('3. Mark Task as Complete');
console.log('4. Remove Task');

rl.question('\nSelect an option (1-4): ', (option) => {
    switch (option) {
        case '1':
            addTask();
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            markComplete();
            break;
        case '4':
            removeTask();
            break;
        default:
            console.log('Invalid option. Please choose a valid number (1-4).');
            rl.close();
    }
});
