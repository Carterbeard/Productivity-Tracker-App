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