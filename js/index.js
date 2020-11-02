//Grouping properties and methods in relation to the todoList
let todoList = {
  todos: [],
  displayTodos: function () {
    //if there are no todos, then log 'Your todo list is empty!'
    //else print todo as normal
    if (this.todos.length === 0) { 
      console.log('Your todo list is empty!');
    } else {
      console.log('My Todos:');
      //looks at todoText property of each object in the array
      for (let i = 0; i < this.todos.length; i++) { 
        //check if .completed is true, then add (x)
        //else add ( )
        if (this.todos[i].completed === true) {
          console.log('(x)', this.todos[i].todoText);
        } else { 
          console.log('( )', this.todos[i].todoText);
        }
      }
    }
  },
  addTodo: function (todoText) { 
    //pushing object to todos array
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function (position, todoText) { 
    // Changes object's todoText property's value
    this.todos[position].todoText = todoText;
    this.displayTodos()
  },
  deleteTodo: function (position) { 
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function (position) { 
    let todo = this.todos[position];
    //flip boolean from false to true or true to false in object
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function () { 
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    //get number of completed todos
    for (let i = 0; i < totalTodos; i++) { 
      if (this.todos[i].completed === true) { 
        completedTodos++;
      }
    }

    //if eveything is true, then make everything is false
    //if everything is fase, then make everything is true
    if (completedTodos === totalTodos) {
      //make everything false
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else { 
      for (let i = 0; i < totalTodos; i++) { 
        this.todos[i].completed = true;
      }
    }
    this.displayTodos();
  }
};


//methods inside this object will handle different events like click
let handlers = {
  displayTodos: function () { 
    todoList.displayTodos();
  },
  toggleAll: function () { 
    todoList.toggleAll();
  },
  addTodo: function () { 
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },
  changeTodo: function () { 
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    //clear input was you're done
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
  }
}


