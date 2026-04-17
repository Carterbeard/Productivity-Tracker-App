const API_URL = 'http://localhost:8080'

async function getGoal(date,goal_type){
    //need to filter through date and goal
    let response = await fetch(`${API_URL}/retrieve/goals/${date}/${goal_type}`);
    if(!response.ok){
        throw new Error("Unable to fetch goal");
    }
    const goal_array = await response.json();
    //goal_array should be an array of goal_type, target, date
    
    if(goal_array.length === 0) throw new Error("No goals found");
    return goal_array[0].target
}

async function setGoal(goal_type, target) {
    const goal_data = {
        goal_type: goal_type,
        target: target,
        date: getDate()
    };

    try{
        const response = await fetch(`${API_URL}/set/goal`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(goal_data)
        });
        if(response.ok){
            console.log("goal saved");
        }
    } catch(error){
        console.error("error saving goal", error)
    }
}

async function getCurrentData(date) {
    let response = await fetch(`${API_URL}/retrieve/day/${date}`);
    if(!response.ok){
        throw new Error("Unable to fetch today's data");
    }
    const data_array = await response.json()
    if(data_array.length === 0) throw new Error("No data found");
    return{
        screen_time: data_array[0].screen_time,
        study_time: data_array[0].hours_studied,
        sleep: data_array[0].sleep,
        steps: data_array[0].steps
    }
}