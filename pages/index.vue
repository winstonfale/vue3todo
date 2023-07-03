<template>
  <div class="container">
    <div class="outer-container">
      <v-card-title>
        <h1 class="text-white">Vue Todo List</h1>
      </v-card-title>

      <div class="custom-card">
        <v-card>
          <div class="column-card custom-header">
            <v-row>
              <v-col cols="2">
                <v-badge color="primary" overlap>
                  <template v-slot:badge>
                    <span class="badge-number">3</span>
                  </template>
                  <span>Tasks</span>
                </v-badge>
              </v-col>

              <v-col cols="2">
                <v-badge color="primary" overlap>
                  <template v-slot:badge>
                    <span class="badge-number">{{ _taskDoneCount }} </span>
                  </template>
                  <span>Done</span>
                </v-badge>
              </v-col>
              <v-col cols="4">
                <v-btn
                  small
                  class="ma-2"
                  color="red"
                  dark
                  outlined
                  @click="removeTaskDone"
                >
                  <v-icon>mdi-delete</v-icon>
                  Task Done
                </v-btn>
              </v-col>

              <v-col cols="4">
                <v-btn
                  @click="removeAllTask"
                  small
                  class="ma-2"
                  color="red"
                  dark
                  outlined
                >
                  <v-icon>mdi-delete</v-icon>
                  Tasks
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <v-card
            class="column-card"
            v-for="(item, index) in todoList"
            :key="index"
          >
            <v-card-text :class="{ done: item.completed }">
              <v-icon
                @click="doneTask(index)"
                :class="{ done: item.completed }"
                class="custom-check"
                >mdi-check-circle</v-icon
              >
              {{ item.task }} {{ item.completed }}

              <v-icon class="float-right" @click="removeTask(index)"
                >mdi-delete</v-icon
              >
            </v-card-text>
          </v-card>

          <div class="column-card custom-header">
            <v-row class="add-task-row">
              <v-col cols="12">
                <div class="custom-input">
                  <v-text-field
                    v-model="newTask"
                    placeholder="Enter a new task"
                    outlined
                    dense
                    rounded
                    class="custom-text-field"
                  ></v-text-field>
                  <v-btn
                    @click="addTask"
                    color="primary"
                    fab
                    small
                    class="add-button"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </div>

    <v-snackbar v-model="showBanner" right bottom>
      This application uses the browser's Local Storage to store data
      <v-btn text @click="showBanner = false"> Close </v-btn>
    </v-snackbar>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      newTask: "",
      showBanner: true, //
    };
  },
  computed: {
    todoList() {
      return this.$store.getters.getTodoList;
    },

    _remainingTaskCount() {
      return this.$store.getters.getTodoList.length;
    },

    _taskDoneCount() {
      return this.$store.getters.getTodoList.filter(
        (item) => item.completed === true
      ).length;
    },
  },

  mounted() {
    // console.log(console.log(this.$store.state.todoList));
    this.$store.dispatch("initializeTodoList");
  },

  methods: {
    addTask() {
      if (this.newTask) {
        this.$store.dispatch("addTask", {
          task: this.newTask,
          completed: false,
        });
        this.newTask = "";
      }
    },
    removeTask(index) {
      this.$store.dispatch("removeTask", index);
    },

    doneTask(index) {
      this.$store.dispatch("doneTask", index);
    },

    removeTaskDone() {
      this.$store.dispatch("removeDoneTask");
    },

    removeAllTask() {
      this.$store.dispatch("removeAllTask");
    },
  },
};
</script>
  
  <style scoped>
.custom-card {
  padding: 20px;
}

.custom-header {
  padding: 10px;
  background: gray;
}

.text-white {
  color: white;
  text-align: center;
}

.outer-container {
  margin-top: 110px;
  width: 400px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  overflow-y: auto;
  background: linear-gradient(to bottom, #5c885c, #000000);
}

.add-task-row {
  margin-top: 20px;
}

.add-task-col {
  padding-right: 0;
}

.column-card {
  background-color: #f0f0f0;
  margin-bottom: 10px;
}

.column-card:last-child {
  margin-bottom: 0;
}

.custom-input {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-input .add-button {
  margin-left: 10px;
}

.custom-text-field {
  flex-grow: 1;
}

.custom-check {
  color: green;
}

.done {
  color: gray;
  text-decoration: line-through;
}
.float-right {
  float: right;
}
</style>

<style>
.v-field__input {
  border: 3px solid blue !important;
  border-radius: 25px;
}
</style>