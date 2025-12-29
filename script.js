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
let filterbtns=document.getElementById("filters")
let pendingcount=document.getElementById("pending-count")
let completedcount=document.getElementById("completed-count")
let canceldcount=document.getElementById("canceled-count")
getdata()
function getdata(filterd=false,status="all"){
        tasklist.innerHTML=""
 
    pendingcount.textContent=0

    completedcount.textContent=0

    canceldcount.textContent=0
    tasks.forEach((task)=>{
          if(task.status==="pending")
    pendingcount.textContent=String(parseInt(pendingcount.textContent)+1)
else if (task.status==="completed")
    completedcount.textContent=String(parseInt(completedcount.textContent)+1)
else 
    canceldcount.textContent=String(parseInt(canceldcount.textContent)+1)
    })
        if(!filterd||status==="all"){
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
                                        <time datetime="${task.date}">${task.date}</time>
                                    </span>
                                    
                                    <span class="task-created" data-date-type="created">
                                        أضيفت: <time datetime="${task.originDate}">${task.originDate}</time>
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Status Badge -->
                            <span class="task-status-badge ${task.status}" data-status-type="badge">
                                ${getStatusName(task.status)}
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
     else{
if(!tasks.filter((e)=>e.status==status).length)
    emptyState.style.display="block"
    tasks.filter((e)=>e.status==status).forEach((task)=>{
      
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
                                        <time datetime="${task.date}">${task.date}</time>
                                    </span>
                                    
                                    <span class="task-created" data-date-type="created">
                                        أضيفت: <time datetime="${task.originDate}">${task.originDate}</time>
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Status Badge -->
                            <span class="task-status-badge ${task.status}" data-status-type="badge">
                                ${getStatusName(task.status)}
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
function getStatusName(status){
switch(status){
    case ("pending"):return "قيد الإنتظار";
    
    case ("completed"):return "مكتملة"
    case("canceled"):return "مهمة"
    case("all"):return "جميع المهمام"
}
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
        status: selectstatus.value,
        originDate:new Date()
  .toString()
  .replace(/ GMT.*/, '')

    };
  if(task.status==="pending")
    pendingcount.textContent=String(parseInt(pendingcount.textContent)+1)
else if (task.status==="completed")
    completedcount.textContent=String(parseInt(completedcount.textContent)+1)
else 
    canceldcount.textContent=String(parseInt(canceldcount.textContent)+1)
    tasks.push(task);    
                  
localStorage.setItem("tasks", JSON.stringify(tasks));
getdata()
});
filterbtns.addEventListener(("click"),(e)=>{
    if(e.target.closest(".filter-btn")){
        Array.from(document.querySelectorAll(".filter-btn")).forEach((e)=>{
            e.classList.remove("active")
     
        })
        const taskItem = e.target.closest(".filter-btn"); 
        taskItem.classList.add("active")
        getdata(true,taskItem.dataset.filter)
    }
})
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
if(!tasks.length)
emptyState.style.display="block"
localStorage.setItem("tasks",JSON.stringify(tasks))
getdata()
    }

    if (e.target.closest(".cancel-edit-btn")) {
        const taskItem = e.target.closest(".task-item");
        taskItem.querySelector(".edit-form").style.display = "none";
       
        taskItem.querySelector(".remove-form").style.display = "none";
    }
    
});


