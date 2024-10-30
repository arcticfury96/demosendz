let problemsDone = 0;
let flashsDone = 0;

document.addEventListener('DOMContentLoaded', function() {
    let list = document.getElementById('list').children;
    for (let problem of list) {
        loadValuesFromLocalStorage(problem)
        applyChangeEvents(problem);
    }
});

function loadValuesFromLocalStorage(problem) {
    problem.querySelectorAll('input[type=number]').forEach((input) => {
        let loadedValue = localStorage.getItem(input.name);
        if (loadedValue !== null) {
            input.value = loadedValue;
        }
    });

    problem.querySelectorAll('input[type=radio]').forEach((input) => {
        let loadedValue = localStorage.getItem(input.name);
        if (loadedValue !== null) {
            input.checked = input.value === loadedValue;
            if (input.checked) {
                switch (input.value) {
                    case 'flash':
                        flashsDone++;
                    case 'top':
                        problemsDone++;
                        break;
                }
            }
        }
    });
    document.getElementById('problems_done').innerText = problemsDone.toString();
    document.getElementById('flashs_done').innerText = flashsDone.toString();

    problem.querySelectorAll('input[type=color]').forEach((input) => {
        let loadedValue = localStorage.getItem(input.name);
        if (loadedValue !== null) {
            input.value = loadedValue;
            input.closest('.problem').style.backgroundColor = loadedValue;
        }
    });
}

function applyChangeEvents(problem) {
    problem.querySelector('input[type=number]').addEventListener('change', (event) => {
        localStorage.setItem(event.target.name, event.target.value);
    });

    problem.querySelectorAll('input[type=radio]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            localStorage.setItem(event.target.name, event.target.value);
        });
    })

    problem.querySelector('input[type=color]').addEventListener('change', (event) => {
        localStorage.setItem(event.target.name, event.target.value);
        event.target.closest('.problem').style.backgroundColor = event.target.value;
    });
}