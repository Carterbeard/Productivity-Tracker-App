const profile_icon = document.querySelector('.profile_icon_container'
)
const goal_ids = ['sleep','steps','study_time','screen_time'];
const action_list = document.querySelector('.action_list')
const actions = {sleep: "Get some more sleep tonight!",
                steps:"Go for a walk.",
                study_time:"You need to study!",
                screen_time: "Get off your phone."}
const sync_profile_btn = document.getElementById('sync_profile_btn');
const update_profile_btn = document.getElementById('update_profile');
const streak_times = document.querySelectorAll('.streak_time')

document.addEventListener('DOMContentLoaded', () => {
    updateActions();
    updateStreaks();
});

profile_icon.addEventListener('click',()=>{
    window.location.href = 'home.html'
})

function getDate(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2,'0');
    const month = String(today.getMonth()+1).padStart(2,'0');
    const year = String(today.getFullYear()).slice(-2);
    const date = `${day}-${month}-${year}`;
    return date;
}


function getDateBefore(date) {
    const day   = Number(date.slice(0, 2));
    const month = Number(date.slice(3, 5));
    const year  = Number(date.slice(6, 8)) + 2000;

    const d = new Date(year, month - 1, day);
    d.setDate(d.getDate() - 1);

    const newDay   = String(d.getDate()).padStart(2, '0');
    const newMonth = String(d.getMonth() + 1).padStart(2, '0');
    const newYear  = String(d.getFullYear()).slice(-2);
    return `${newDay}-${newMonth}-${newYear}`;
}

async function updateActions(){
    const current_data = await getCurrentData(getDate());
    for (const goal_id of goal_ids){
        try {
            const existingItem = document.getElementById(`action-${goal_id}`);
            const target = await getGoal(getDate(), goal_id);
            const actual_value = current_data[goal_id];
            const difference = target - actual_value;
            if(goal_id !== 'screen_time'){
                if(difference>0 && !existingItem){
                    const list_item = document.createElement('li');
                    list_item.textContent = actions[goal_id];
                    action_list.appendChild(list_item);
                    list_item.id = `action-${goal_id}`;
                }
            } else{
                if(difference<0 && !existingItem){
                    const list_item = document.createElement('li');
                    list_item.textContent = actions[goal_id];
                    action_list.appendChild(list_item);
                    list_item.id = `action-${goal_id}`;
                }
            }
        } catch (error) {
            console.error(`error with goal: ${goal_id} `, error)
        }
    }
}

function updateProfile(){
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    if(first_name){
        if(first_name.value !== ""){
            const p1_item = document.createElement('p');
            p1_item.textContent = first_name.value;
            p1_item.id = 'first_p'
            p1_item.className = 'p_name'
            first_name.replaceWith(p1_item);
            first_name.value = ""
        }
    } else {
        const input1 = document.createElement('input');
        const first_p = document.getElementById('first_p');
        input1.type = 'text';
        input1.id = 'first_name';
        input1.placeholder = '...';
        input1.className = "name_input";
        first_p.replaceWith(input1);
    }
    if(last_name){
        if(last_name.value !== ""){
            const p_item = document.createElement('p');
            p_item.textContent = last_name.value;
            p_item.id = 'last_p'
            p_item.className = 'p_name'
            last_name.replaceWith(p_item);
            last_name.value = ""
        }
    } else {
        const input = document.createElement('input');
        const last_p = document.getElementById('last_p');
        input.type = 'text';
        input.id = 'last_name';
        input.placeholder = '...';
        input.className = "name_input";
        last_p.replaceWith(input);
    }
}

async function getStreaks() {
    let date = getDate();
    let streaks = {
        sleep : 0,
        steps : 0,
        study_time : 0,
        screen_time : 0
    }
    let streak_failed = {
        sleep : false,
        steps : false,
        study_time : false,
        screen_time : false
    }
    for(let i =0; i<7; i++){
        let current_data = await getCurrentData(date);
        for (const goal_id of goal_ids){
            const target = await getGoal(date, goal_id);
            const actual_value = current_data[goal_id];
            const difference = target - actual_value;
            if(goal_id !== 'screen_time' && !streak_failed[goal_id]){
                if(difference<0){
                    streaks[goal_id] += 1;
                } else{
                    streak_failed[goal_id] = true
                }
            } else if (goal_id === 'screen_time' && !streak_failed[goal_id]){
                if(difference>0){
                    streaks[goal_id] += 1;
                } else{
                    streak_failed[goal_id] = true
                }
            }
        }
        date = getDateBefore(date);
    }
    return streaks;
}

async function updateStreaks(){
    const streaks = await getStreaks();
    streak_times.forEach(streak_time => {
        let streak  = String(streaks[streak_time.id])
        streak_time.innerHTML = streak;
        if(streak === "0"){
            streak_time.nextElementSibling.children[1].style.filter = "grayscale(100%)";
        }
    })
}

sync_profile_btn.addEventListener('click', () => {
    updateActions();
    updateStreaks();
})

update_profile_btn.addEventListener('click',()=>{
    updateProfile();
})