let addbtn = document.getElementById("add-task-btn")
let formadd = document.getElementById("task-form")
let title = document.getElementById("task-title")
let date = document.getElementById("task-date")
let selectstatus = document.getElementById("task-status")
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let clearbtn=document.getElementById("clear-form-btn")
let tasklist=document.getElementById("task-list")
let emptyState=document.getElementById("empty-state")
let count=0;

getdata()
function getdata(filterd=false){
        tasklist.innerHTML=""
        if(!filterd){
    tasks.forEach((task)=>{
      
        emptyState.style.display="none"
        let listtask=document.createElement("li");
 listtask.innerHTML=`<li class="task-item pending" 
                        data-task-id="${task.id}" 
                        data-task-status="pending" 
                        data-task-date="${task.date}"
                        role="listitem">
                        <div class="task-content">
                        
                            <!-- Task Title -->
                            <div class="task-title-container">
                                <span class="task-title">${task.title}</span>
                                <!-- Task Meta Info -->
                                <div class="task-meta">
                                    <span class="task-date" data-date-type="deadline">
                                        <span class="meta-icon">📅</span>
                                        <time datetime="2024-01-15">${task.date}</time>
                                    </span>
                                    <span class="task-created" data-date-type="created">
                                        أضيفت: <time datetime="${task.date}">${new Date()}</time>
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Status Badge -->
                            <span class="task-status-badge pending" data-status-type="badge">
                                قيد الانتظار
                            </span>
                            
                            <!-- Action Buttons -->
                            <div class="task-actions">
                                <button 
                                    class="task-btn edit-task-btn" 
                                    data-action="edit-task"
                                    aria-label="تعديل المهمة"
                                    title="تعديل"
                                >
                                    <span class="btn-icon">✏️</span>
                                </button>
                                <button 
                                    class="task-btn delete-task-btn" 
                                    data-action="delete-task"
                                    aria-label="حذف المهمة"
                                    title="حذف"
                                >
                                    <span class="btn-icon">🗑️</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="edit-form" style="display: none;" data-edit-form="true">
                            <input type="text" class="edit-title" data-field="title">
                            <input type="date" class="edit-date" data-field="date">
                            <select class="edit-status" data-field="status">
                                <option value="pending">قيد الانتظار</option>
                                <option value="completed">مكتملة</option>
                                <option value="canceled">مهمة</option>
                            </select>
                            <button class="save-edit-btn" data-action="save-edit">💾 حفظ</button>
                            <button class="cancel-edit-btn" data-action="cancel-edit">❌ إلغاء</button>
                        </div>
                         <div class="remove-form" style="display: none;" data-edit-form="true">
                          
                            <button class="remove-edit-btn" data-action="remove-edit">🗑️ حذف</button>
                            <button class="cancel-edit-btn" data-action="cancel-edit">❌ إلغاء</button>
                        </div>
                    </li>`
   tasklist.append(listtask)  
    })}
}
clearbtn.addEventListener("click",()=>{
    title.value=""
    date.value=""
    selectstatus.value="pending"
})
formadd.addEventListener("submit", (e) => {
    e.preventDefault();

    if (title.value.trim() === "" || date.value === "") {
        return;
    }

    let task = {
        id:Date.now(),
        title: title.value,
        date: date.value,
        status: selectstatus.value
    };
    tasks.push(task);    
                  
localStorage.setItem("tasks", JSON.stringify(tasks));
getdata()
});

tasklist.addEventListener("click", (e) => {
    
    if (e.target.closest(".edit-task-btn")) {
        const taskItem = e.target.closest(".task-item");
        const editForm = taskItem.querySelector(".edit-form");
        editForm.style.display = "block";
        editForm.querySelector(".edit-title").value = taskItem.querySelector(".task-title").textContent;
        editForm.querySelector(".edit-date").value = taskItem.dataset.taskDate;
        editForm.querySelector(".edit-status").value = taskItem.dataset.taskStatus;
    }
    else if(e.target.closest(".delete-task-btn")){
          const taskItem = e.target.closest(".task-item");
        const removeform = taskItem.querySelector(".remove-form");
        removeform.style.display = "block";
       
    }

   
    if (e.target.closest(".save-edit-btn")) {
        const taskItem = e.target.closest(".task-item");
        const id = Number(taskItem.dataset.taskId);
        const editForm = taskItem.querySelector(".edit-form");

        const newTitle = editForm.querySelector(".edit-title").value;
        const newDate = editForm.querySelector(".edit-date").value;
        const newStatus = editForm.querySelector(".edit-status").value;

        
        const task = tasks.find(t => t.id === id);
        console.log(task)
        task.title = newTitle;
        task.date = newDate;
        task.status = newStatus;

        localStorage.setItem("tasks", JSON.stringify(tasks));
        getdata();
    }
    if(e.target.closest(".remove-edit-btn")){
        const taskItem = e.target.closest(".task-item");
        const id = (taskItem.dataset.taskId);
        console.log(id)
        const task = tasks.find(t => t.id ==id);
  
        const index = tasks.indexOf(task);
if (index > -1) {
  tasks.splice(index, 1); 
}
localStorage.setItem("tasks",JSON.stringify(tasks))
getdata()
    }

    if (e.target.closest(".cancel-edit-btn")) {
        const taskItem = e.target.closest(".task-item");
        taskItem.querySelector(".edit-form").style.display = "none";
       
        taskItem.querySelector(".remove-form").style.display = "none";
    }
    
});


