import { defineStore } from 'pinia';

export const useTasks = defineStore({
  id: 'tasks',
  state: () => ({
    logged: false,
    user: {},
    tasks: [],
    tasksOrdered: [],
    id: 0,
    categorie: 'all'
  }),
  actions: {
    createTask(obj) {
      const randomId =  Math.floor(Math.random() * 1000);
      const task = {...obj , id: randomId, finished: false };
      this.tasks.push(task);
      this.orderTasks();
      this.taskCountsByType();
      this.saveTasksToLocalStorage();
    },
    orderTasks() {
      this.tasksOrdered = this.tasks.slice().sort((a, b) => {
        const order = { 'urgent': 0, 'important': 1, 'others': 2 };
        return order[a.tipo] - order[b.tipo];
      });
      this.saveOrderedTasksToLocalStorage();
    },
    saveOrderedTasksToLocalStorage() {
      const orderedTasksJson = JSON.stringify(this.tasksOrdered);
      localStorage.setItem('orderedTasks', orderedTasksJson);
    },
    saveTasksToLocalStorage() {
      const tasksJson = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', tasksJson);
    },
    loadTasksFromLocalStorage() {
      const tasksJson = localStorage.getItem('tasks');
      if (tasksJson) {
        this.tasks = JSON.parse(tasksJson);
      }

      const orderedTasksJson = localStorage.getItem('orderedTasks');
      if (orderedTasksJson) {
        this.tasksOrdered = JSON.parse(orderedTasksJson);
      }
    },
    removerTask(id) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.orderTasks();
        this.saveTasksToLocalStorage(); 
      }
    },
    editTask(id, newTitle, newDescription, newTipo, newFinished) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].title = newTitle;
        this.tasks[taskIndex].description = newDescription;
        this.tasks[taskIndex].tipo = newTipo;
        this.tasks[taskIndex].finished = newFinished 
        this.orderTasks();
      }
    },
    taskCountsByType() {
      const counts = {
        urgent: 0,
        important: 0,
        others: 0,
      };

      this.tasks.forEach(task => {
        counts[task.tipo]++;
      });

      return counts
    },
    countUnfinishedTasks() {
      return this.tasks.filter(task => !task.finished).length;
    },
    saveLoggedStateToLocalStorage() {
      localStorage.setItem('logged', JSON.stringify(this.logged));
    },
    loadLoggedStateFromLocalStorage() {
      const loggedStateJson = localStorage.getItem('logged');
      const userStateJson = localStorage.getItem('user');
      if (loggedStateJson !== null) {
        this.logged = JSON.parse(loggedStateJson);
        this.user = JSON.parse(userStateJson);
      }
    },
  },

});
