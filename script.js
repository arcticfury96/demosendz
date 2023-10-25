document.addEventListener('DOMContentLoaded', function() {
    let list = document.getElementById('list').children;
    for (let problem of list) {
        loadValuesFromLocalStorage(problem)
        applyChangeEvents(problem);
    }
});

function loadValuesFromLocalStorage(problem) {
    problem.querySelectorAll('input:not([type=radio])').forEach((input) => {
        let loadedValue = localStorage.getItem(input.name);
        if (loadedValue !== null) {
            input.value = localStorage.getItem(input.name);
        }
    });

    problem.querySelectorAll('input[type=radio]').forEach((input) => {
        let loadedValue = localStorage.getItem(input.name);
        if (loadedValue !== null) {
            input.checked = input.value === loadedValue;
        }
    });
}

function applyChangeEvents(problem) {
    problem.querySelector('input[type=number]').addEventListener('change', (event) => {
        localStorage.setItem(event.target.name, event.target.value);
    });

    problem.querySelectorAll('input[type=radio]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            console.log('should save radio: ', event.target.name, event.target.value);
            console.log('selected radio: ', document.querySelector('input[name="' + event.target.name + '"]:checked').value);
            localStorage.setItem(event.target.name, event.target.value);
        });
    })

    problem.querySelector('input[type=color]').addEventListener('change', (event) => {
        localStorage.setItem(event.target.name, event.target.value);
    });
}