const timer = document.getElementById('timer');

export function setTimer(hidden) { 
    if (hidden) {
        timer.classList.add('hidden');
    } else {
        timer.classList.remove('hidden');
    }
}