import {badge, button, element, modal} from "../ui/components";

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 60 * 7;
const MINUTES_IN_WEEK = 60 * 7 * 5;

export function setupEstimator() {
    const container = document.querySelector<HTMLDivElement>(`#ghx-controls-buttons`);
    if(container.querySelector(`#calculate-estimations`)) {
        return;
    }

    container.style.display = `flex`;
    container.style.flexDirection = `row-reverse`;

    container.insertBefore(element(button(
        `calculate-estimations`,
        `Estimer les tâches sélectionnées`,
        {marginLeft: `5px`},
    )), container.firstChild);

    document.querySelector(`#calculate-estimations`).addEventListener(`click`, displayEstimations);
}

function displayEstimations() {
    let totalMinutes = 0;

    const elements = document.querySelectorAll<HTMLSpanElement>(`.ghx-selected .ghx-statistic-badge, .ghx-selected .ghx-estimate`);
    for(const element of Array.from(elements)) {
        if(element.innerText === `-`) {
            continue;
        }

        const values = element.innerText.split(` `);

        let minutes = 0;
        for(const value of values) {
            const [duration, unit] = value.match(/[a-zA-Z]+|[0-9]+/g);
            if(unit === `m`) {
                minutes += Number(duration);
            } else if(unit === `h`) {
                minutes += Number(duration) * MINUTES_IN_HOUR;
            } else if(unit === `d`) {
                minutes += Number(duration) * MINUTES_IN_DAY;
            } else if(unit === `w`) {
                minutes += Number(duration) * MINUTES_IN_WEEK;
            }
        }

        totalMinutes += minutes;
    }

    const minutes = totalMinutes % MINUTES_IN_HOUR;
    const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR) % 7;
    const days = Math.floor(totalMinutes / MINUTES_IN_DAY) % 5;
    const weeks = Math.floor(totalMinutes / MINUTES_IN_WEEK);

    let content;
    if(totalMinutes === 0) {
        content = `<p>
            Aucune tâche n'est sélectionnée ou les tâches sélectionnées ne sont pas estimées. 
            Pour utiliser ce plugin il est nécessaire de sélectionner une ou plusieurs tâches 
            à l'aide de ${badge(`Ctrl`)} ou ${badge(`Shift`)}
        </p>`;
    } else {
        content = `<p>
            ${elements.length > 1 ? `Les tâches sélectionnées sont estimées` : `La tâche sélectionnée est estimée`} à
            ${badge(`${weeks ? `${weeks}w` : ``} ${days ? `${days}d` : ``} ${hours ? `${hours}h` : ``} ${minutes ? `${minutes}m` : ``}`)}
            au total.
        </p>`;
    }

    modal({
        id: `tasks-estimation`,
        title: `Estimation des tâches`,
        content,
    });
}