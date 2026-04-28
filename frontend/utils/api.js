const Database_API_URL = 'http://localhost:8080'
const Python_API_URL = 'http://localhost:8081'

async function getGoal(dateSet,goalType){
    //need to filter through date and goal
    let response = await fetch(`${Database_API_URL}/retrieve/goals/${dateSet}/${goalType}`);
    if(!response.ok){
        return 0; 
    }
    const text = await response.text();
    if (!text) return 0;

    const goal_array = JSON.parse(text);
    
    if(goal_array.length === 0) return 0;
    return goal_array[0].target
}

async function setGoal(goal_type, target) {
    const goal_data = {
        goalType: goal_type,
        target: target,
        dateSet: getDate()
    };

    try{
        const response = await fetch(`${Database_API_URL}/set/goal`,{
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
    let response = await fetch(`${Database_API_URL}/retrieve/day/${date}`);
    if(!response.ok){
        throw new Error("Unable to fetch today's data");
    }

    const text = await response.text();
    if (!text) return {};
    const data = JSON.parse(text);

    
    if(data.length === 0) throw new Error("No data found");
    
    return{
        screen_time: data.screenTime,
        study_time: data.hoursStudied,
        sleep: data.sleep,
        steps: data.steps
    }
}

async function setCurrentData(steps,sleep,hours_studied,screen_time){
    const current_data = {
        date: getDate(),
        steps: parseInt(steps),
        sleep: parseFloat(sleep),
        hoursStudied: parseFloat(hours_studied),
        screenTime: parseFloat(screen_time)
    }

    try{
        const response = await fetch(`${Database_API_URL}/set/day`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(current_data)
        });
        if(response.ok){
            console.log("current data saved");
        }
    } catch(error){
        console.error("error saving current data", error)
    }
}

async function getToDo(){
    let response = await fetch(`${Database_API_URL}/retrieve/todo`)
    if(!response.ok){
        throw new Error("Unable to fetch the to-do list")
    }
    const todos_array = await response.json();
    if(todos_array.length === 0) throw new Error("No data found");
    return todos_array
}

async function setToDo(task,isComplete){
    const to_do_data = {
        task: task,
        completed: isComplete,
        dateSet: getDate()
    }

    try{
        const response = await fetch(`${Database_API_URL}/set/todo`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(to_do_data)
        });
        if(response.ok){
            console.log("to-do list saved");
        }
    } catch(error){
        console.error("error saving to-do list", error)
    }
}

async function setMood(emoji){
    const mood_data = {
        date: getDate(),
        time: getTime(),
        emoji: Number(emoji)
    }

    try{
        const response = await fetch(`${Database_API_URL}/set/mood`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(mood_data)
        });
        if(response.ok){
            console.log("mood saved");
        }
    } catch(error){
        console.error("error saving mood", error)
    }
}

async function generateGraph(americanDate,boolArray) {
    const boolString = boolArray.join(' ');
    const graphData = {
        date:americanDate,
        vars:boolString
    }
    try{
        const response = await fetch(`${Python_API_URL}/grapher`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphData)
        })

        if(response.ok){
            console.log("Graph Generation triggered with:", graphData)
        }
    } catch(error){
        console.error("error generating graph", error)
    }
    
}