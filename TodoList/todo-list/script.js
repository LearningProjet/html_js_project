window.addEventListener('load', startJs)

function startJs () {
    const inputTodo = document.getElementById('todo-add');
    const btnAdd = document.getElementById('btn-add');
    const todosContainer = document.getElementById('list-container')
    const resultsTasks = document.getElementById('result-tasks');
    const resultsCompleted = document.getElementById('result-completed');
    const btnDeleteAll = document.getElementById('btn-delete-all');
    const btnDeleteSelected = document.getElementById('btn-delete-selected');
    const allFilter = document.getElementById('filter-list-completed-all')
    const pendingFilter = document.getElementById('filter-list-completed-pending')
    const completedFilter = document.getElementById('filter-list-completed-option')


    btnAdd.addEventListener('click', addTodoItem);
    inputTodo.addEventListener('keyup', function(event) {
        if(event.code == 'Enter') {
            addTodoItem();
        }
    })

    function addTodoItem () {
        const todoObject = {
            value: inputTodo.value,
            id: Date.now()
        }
        if(inputTodo.value.trim() == "") {
            return
        }
        const element = document.createElement('div');
        element.classList.add('todolist-items');
        element.id = todoObject.id;
        const listElement = `
        <div class="task-title">${todoObject.value}</div>
        <div class="todolist-items-btns">
            <div id="completed-item">Complete</div>
            <div id="delete-item">Delete</div>
        </div>`;
        element.innerHTML += listElement;
        todosContainer.append(element);
        inputTodo.value = "";

        const completeItem = element.querySelector('#completed-item');
        completeItem.addEventListener('click', function() {
            if(element.classList.contains('completed-task')) {
                element.classList.remove('completed-task');
                element.setAttribute('completed', false);
    
                resultsCompleted.innerHTML = parseInt(resultsCompleted.innerHTML) - 1;
                
            } else {
                element.classList.add('completed-task');
                element.setAttribute('completed', true);
    
                resultsCompleted.innerHTML = parseInt(resultsCompleted.innerHTML) + 1;
            }

        })

        const deleteItem = element.querySelector('#delete-item');
        deleteItem.addEventListener('click', function() {
            element.remove();
            updateTotalTasks();
        })

        updateTotalTasks();
    }

    function updateTotalTasks() {
        const itemsAll = document.querySelectorAll('.todolist-items')
        resultsTasks.innerHTML = itemsAll.length;
    }

    function updateTotalCompletedTasks() {
        const itemsAllCompleted = document.querySelectorAll('.todolist-items .completed-task')
        resultsCompleted.innerHTML = itemsAllCompleted.length;
    }

    btnDeleteAll.addEventListener('click', function() {
        alert('All the todos will be deleted');
        todosContainer.innerHTML = "";
        updateTotalTasks();
        updateTotalCompletedTasks();
    })

    btnDeleteSelected.addEventListener('click', function() {
        const itemsAll = document.querySelectorAll('.todolist-items');
        itemsAll.forEach(el => {
            if(el.getAttribute('completed')) {
                el.remove()
            }
        })
        updateTotalTasks();
        updateTotalCompletedTasks();
    })

    allFilter.addEventListener('click', function() {
        const itemsAll = document.querySelectorAll('.todolist-items');
        itemsAll.forEach(el => {
            el.classList.remove('hidden');
        })
    })

    pendingFilter.addEventListener('click', function() {
        const itemsAll = document.querySelectorAll('.todolist-items');
        itemsAll.forEach(el => {
            if(el.getAttribute('completed') == null) {
                el.classList.remove('hidden')
            } else {
                el.classList.add('hidden')
            }
        })
    })

    completedFilter.addEventListener('click', function() {
        const itemsAll = document.querySelectorAll('.todolist-items');
        itemsAll.forEach(el => {
            if(el.getAttribute('completed') == null) {
                el.classList.add('hidden')
            } else {
                el.classList.remove('hidden')
            }
        })
    })

}
