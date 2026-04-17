const study_select = document.querySelector('.select_study_time');
const study_options = document.querySelectorAll('.options_list li');
const study_options_wrapper = document.querySelector('.options_wrapper')
const emoji_select = document.getElementById('emoji_input')
const emoji_options = document.querySelectorAll('.emoji_list li')
const emoji_list_wrapper = document.querySelector('.emoji_list_wrapper')
const edit_btn = document.querySelector('.edit_btn');
const goal_section = document.querySelector('.goal_section');
const inner_circles = document.querySelectorAll('.inner_circle')
const edit_popups = document.querySelectorAll('.edit_popup');
const submit_btn = document.querySelector('.submit_btn');
const sync_btn = document.querySelector('.sync_btn');
const submit_edit_btns = document.querySelectorAll('.submit_edit')

study_select.addEventListener('click',() => {
    study_options_wrapper.style.display = 'block';
})

study_options.forEach(option => {
    option.addEventListener('click', () => {
        study_select.innerHTML = option.innerHTML;
        study_options_wrapper.style.display = 'none';
    })
})

window.addEventListener('click', (e) => {
    const selected_circle = e.target.closest('.inner_circle');
    const edit_popup = e.target.closest('.edit_popup');

    if (!study_select.contains(e.target)){
        study_options_wrapper.style.display = 'none';
    };
    if (!emoji_select.contains(e.target)) {
        emoji_list_wrapper.style.display = 'none';
    };
    if (!selected_circle && !edit_popup) {
        edit_popups.forEach(popup => {
            popup.style.visibility = 'hidden';
            popup.style.opacity = '0';
        });
    }
    //close any of the popups if anywhere but the popup is clicked
});


emoji_select.addEventListener('click',() => {
    emoji_list_wrapper.style.display = 'block'
})

emoji_options.forEach(option => {
    option.addEventListener('click', () => {
        emoji_select.value = option.innerHTML;
        emoji_list_wrapper.style.display = 'none';
    })
})

edit_btn.addEventListener('click',()=>{
    const is_edit = goal_section.classList.toggle('edit_mode');
    edit_btn.textContent = is_edit ? 'SAVE' : 'EDIT';
    //toggles between edit mode and normal mode

    inner_circles.forEach(inner_circle => {
        if(is_edit){
            inner_circle.setAttribute('data-original', inner_circle.innerHTML);
            inner_circle.innerHTML = 'modify goal';
            //in edit mode circle says: modify goal
        } else {
            updateGoals();
            const original = inner_circle.getAttribute('data-original');
            inner_circle.innerHTML = original;
            edit_popups.forEach(edit_popup => {
                edit_popup.style.visibility = 'hidden';
                edit_popup.style.opacity = '0';
            })
            //when save button is clicked hide any popups and set data in circle to what the goal is
        }
    })
})

inner_circles.forEach(inner_circle => {
    const selected_goal = inner_circle.closest('.goal_item');
    //finds the goal (circle) clicked
    const edit_popup = selected_goal.querySelector('.edit_popup');
    //finds the edit popup with the corresponding goal
    const edit_input = edit_popup.querySelector('input');
    const submit_btn = edit_popup.querySelector('button');
    inner_circle.addEventListener('click', () => {
        const is_edit = goal_section.classList.contains("edit_mode")
        
        edit_popups.forEach(edit_popup => {
                edit_popup.style.visibility = 'hidden';
                edit_popup.style.opacity = '0';
        });
        //when another circle is clicked close all other popups

        //if circle is clicked in edit mode:
        if(is_edit){
            //if popup is already open close it
            if(edit_popup.style.visibility == 'visible'){
                edit_popup.style.visibility = 'hidden';
                edit_popup.style.opacity = '0';
            } else {
                edit_popup.style.visibility = 'visible';
                edit_popup.style.opacity = '1';
                //open edit popup

                setTimeout(() => {
                    edit_input.focus();
                }, 10);
                //cursor appears in input box
                
                submit_btn.addEventListener('click', () => {
                    set_new_goal(selected_goal,edit_input,inner_circle,edit_popup);
                })
                //change goal when submit button is clicked
                
                edit_input.addEventListener('keydown', (e) => {
                    if(e.key === 'Enter'){
                        set_new_goal(selected_goal,edit_input,inner_circle,edit_popup)
                    }
                })
                //change goal if enter key is pressed
            }
        }
        
    })
})

function set_new_goal(goal, input, circle, popup){
    const new_goal = input.value;
    if(new_goal != ""){
        if(goal.id === 'steps'){
            formatted_value = Number(new_goal).toLocaleString();
        } else {
            if(new_goal === "1"){
                formatted_value = new_goal + 'hr'
            } else {
                formatted_value = new_goal + 'hrs'
            }
        }
        circle.setAttribute('data-original', formatted_value);

        popup.style.visibility = 'hidden';
        popup.style.opacity = '0';
        //remove popup

        input.value = "";
        //reset input
    }
}

// notification

function showNotification(message, type='error') {
    const container = document.getElementById('notification_container');
    // create the notification

    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;

    // add notification to the container
    container.appendChild(notification);

    // show the notification
    notification.classList.add('show');

    // remove the notification after 3.5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3500);
}

// get and clean to do list

function getToDoData() {
    const toDoRows = document.querySelectorAll('.to_do_list label');
    let isValid = true;
    let cleanData = [];

    // loop through each label
    toDoRows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const textInput = row.querySelector('input[type="text"]').value.trim();

        if (textInput === "") return;

        // check for < > to stop html injection
        if (textInput.includes("<") || textInput.includes(">")) {
            showNotification("Invalid input: Please do not use < or >");
            isValid = false;
            return;
        }

        // add clean labels to array with checkbox value
        cleanData.push({
            task: textInput,
            isComplete: checkbox.checked
        });
    });

    // only return data if valid
    if (isValid) {
        return cleanData;
    } else {
        return null;
    }
}

// submit button

submit_btn.addEventListener('click', () => {
    // get all data
    const currentStudyTime = study_select.textContent;
    const currentMood = emoji_select.value;
    const currentToDoList = getToDoData();
    // need to get daily goals

    // check for valid to do list
    if (currentToDoList === null) return;

    // check if mood has been selected
    if (currentMood === "") {
        showNotification("Please select a mood");
        return;
    }

    // send data to db

    showNotification("Submitted successfully :)", "success");
});

//creates formatted version of today's date
function getDate(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2,'0');
    const month = String(today.getMonth()+1).padStart(2,'0');
    const year = String(today.getFullYear()).slice(-2);
    const date = `${day}-${month}-${year}`;
    return date;
}


//SYNC BUTTON:
sync_btn.addEventListener('click', ()=>{
    const date = getDate();
    updateGoals();
})

submit_edit_btns.forEach(submit_edit_btn =>{
    submit_edit_btn.addEventListener('click', async(e) => {
        const popup = e.target.closest('.edit_popup');
        const input = popup.querySelector('input')
        const new_value = input.value;
        const goal_type = e.target.closest('.goal_item').id
        if(new_value){
            console.log(`Setting ${goal_type} to ${new_value}`)
            await setGoal(goal_type,new_value);
            input.value = "";
        }
    })
})


async function updateGoals(){
    goal_ids = ['sleep','steps','study_time','screen_time'];
    for (const goal_id of goal_ids) {
        const goal_container = document.getElementById(goal_id);
        const inside_circle = goal_container.querySelector('.inner_circle');
        const completion = goal_container.querySelector('.completion')
        const remaining = goal_container.querySelector('.remaining')
        const edit_popup_p = goal_container.querySelector('.edit_popup p')
        const circle = goal_container.querySelector('.circle')
        try {
            const target = await getGoal(getDate(), goal_id);
            const current_data = await getCurrentData(getDate());
            const difference = target - current_data;
            const percentage = Math.round((current_data/target)*100)
            if (goal_id !== 'steps') {
                if(target !== 1){
                    inside_circle.innerHTML = `${target}hrs`;
                    edit_popup_p.innerHTML = `Current goal: ${target} hours`;
                } else {
                    inside_circle.innerHTML = `${target}hr`;
                    edit_popup_p.innerHTML = `Current goal: ${target} hour`;
                }
                completion.innerHTML = `${current_data.goal_id}/${target} hours completed`;
                if(difference>0){
                    remaining.innerHTML = `Remaining: ${difference} hours`
                } else {
                    remaining.innerHTML = `Remaining: 0 hours`
                }
                if(goal_id === 'sleep'){
                    circle.style.background = `conic-gradient(#5a4ed1 ${percentage}, rgba(255,255,255,0.15) 0)`;
                } else if (goal_id === 'study_time'){
                    circle.style.background = `conic-gradient(#f4d03f ${percentage}, rgba(255,255,255,0.15) 0)`;
                } else if (goal_id === 'screen_time'){
                    circle.style.background = `conic-gradient(#f64747 ${percentage}, rgba(255,255,255,0.15) 0)`;
                }
            } else {
                inside_circle.innerHTML = target;
                edit_popup_p.innerHTML = `Current goal: ${target} steps`
                completion.innerHTML = `${current_data.goal_id}/${target} steps complete`;
                circle.style.background = `conic-gradient(#00bbf0 ${percentage}, rgba(255,255,255,0.15) 0)`;
                if(difference>0){
                    remaining.innerHTML = `Remaining: ${difference} steps`
                } else {
                    remaining.innerHTML = `Remaining: 0 steps`
                }
            }
        } catch (error) {
            console.error(`Error loading ${goal_id}:`, error);
            inside_circle.innerHTML = "0";
        }
    }
}

async function updateToDo(){
    
}