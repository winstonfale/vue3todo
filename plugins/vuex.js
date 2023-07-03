import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            todoList: [],
        };
    },
    mutations: {
        SET_TODO_LIST(state, todoList) {
            state.todoList = todoList;
        },
        ADD_TASK(state, task) {
            state.todoList.push(task);
            localStorage.setItem('todo_local_storage', JSON.stringify(state.todoList));
        },
        REMOVE_TASK(state, index) {
            state.todoList.splice(index, 1);
            localStorage.setItem('todo_local_storage', JSON.stringify(state.todoList));
        },
        DONE_TASK(state, index) {
            state.todoList[index]['completed'] = true;
            localStorage.setItem('todo_local_storage', JSON.stringify(state.todoList));
        },
        REMOVE_DONE_TASK(state) {
            state.todoList = state.todoList.filter(item => item.completed !== true);
            localStorage.setItem('todo_local_storage', JSON.stringify(state.todoList));
        },

        REMOVE_ALL_TASK(state) {
            state.todoList = []
            localStorage.setItem('todo_local_storage', JSON.stringify(state.todoList));
        }

    },
    actions: {
        initializeTodoList({ commit }) {
            const storedTodoList = localStorage.getItem('todo_local_storage');
            if (storedTodoList) {
                commit('SET_TODO_LIST', JSON.parse(storedTodoList));
            }
        },
        addTask({ commit }, task) {
            commit('ADD_TASK', task);
        },
        removeTask({ commit }, index) {
            commit('REMOVE_TASK', index);
        },
        doneTask({ commit }, index) {
            commit('DONE_TASK', index);
        },
        removeDoneTask({ commit }) {
            commit('REMOVE_DONE_TASK');
        },

        removeAllTask({ commit }) {
            commit('REMOVE_ALL_TASK');
        },

    },

    getters: {
        getTodoList: (state) => state.todoList
    }
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    // Install the store instance as a plugin
});
