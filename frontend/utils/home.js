const study_select = document.querySelector('.select_study_time');
const study_options = document.querySelectorAll('.options_list li');
const study_options_wrapper = document.querySelector('.options_wrapper')
const mood_select = document.getElementById('mood_input')
const emoji_options = document.querySelectorAll('.emoji_list li')
const emoji_list_wrapper = document.querySelector('.emoji_list_wrapper')


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
    if (!study_select.contains(e.target)){
        study_options_wrapper.style.display = 'none';
    };
    if (!mood_select.contains(e.target)) {
        emoji_list_wrapper.style.display = 'none';
    };
});

mood_select.addEventListener('click',() => {
    emoji_list_wrapper.style.display = 'block'
})

emoji_options.forEach(option => {
    option.addEventListener('click', () => {
        mood_select.value = option.innerHTML;
        emoji_list_wrapper.style.display = 'none';
    })
})