const checkBox = document.querySelectorAll('.checkbox')
const inpFields = document.querySelectorAll('.goal-inp')
const errorLab = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressVal = document.querySelector('.progress-val');
const myGoals = JSON.parse(localStorage.getItem('myGoals')) || {}
let completedGoals = Object.values(myGoals).filter((goal) => goal.completed).length
progressVal.style.width = `${(completedGoals / inpFields.length) * 100}%`
progressVal.firstElementChild.innerText = `${completedGoals}/3 completed`

function getProgressMessage(completedGoals) {
    switch (completedGoals) {
        case 1:
            return "Don't slack bitch!";
        case 2:
            return " Move yo ass! Let's gooo!";
        case 3:
            return "Loose the smirk! Don't get complacent!";
        default:
            return "";
    }
}

progressVal.addEventListener('mouseover', () => {
    const message = getProgressMessage(completedGoals);
    if (message) {
        progressVal.title = message;
    }
});

checkBox.forEach((item) => {

    item.addEventListener('click', () => {

        const allFieldsFilled = [...inpFields].every((inp) => {
            return inp.value
        })

        if (allFieldsFilled) {
            item.parentElement.classList.toggle('completed')
            const inputId = item.nextElementSibling.id
            if (myGoals[inputId]) {
                myGoals[inputId].completed = !myGoals[inputId].completed
                completedGoals = Object.values(myGoals).filter((goal) => goal.completed).length
                progressVal.style.width = `${(completedGoals / inpFields.length) * 100}%`
                progressVal.firstElementChild.innerText = `${completedGoals}/3 completed`
                localStorage.setItem('myGoals', JSON.stringify(myGoals))
                const inputField = document.getElementById(inputId);
                inputField.disabled = myGoals[inputId].completed;
                const message = getProgressMessage(completedGoals);
                if (message) {
                    progressVal.title = message;
                }
            }
        } else {
            progressBar.classList.add('show-error')
        }
    })

});

inpFields.forEach((item) => {

    if (myGoals[item.id] && myGoals[item.id].completed){
        item.parentElement.classList.add('completed')
        item.disabled = true;
    }
    
    item.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    item.value = myGoals[item.id] ? myGoals[item.id].goal : ''
    item.addEventListener('input', (e) => {
        myGoals[e.target.id] = {
            goal: e.target.value,
            completed: myGoals[e.target.id] ? myGoals[e.target.id].completed : false
        }
        localStorage.setItem('myGoals', JSON.stringify(myGoals))
    })

});

