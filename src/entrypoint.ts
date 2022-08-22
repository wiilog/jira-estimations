import 'arrive';
import {setupEstimator} from "./features/estimator";

async function main() {
    initializeModals();

    document.arrive(`[data-testid="insights-show-insights-button.ui.insights-button"]`, setupEstimator);
}

function initializeModals() {
    document.arrive(`.jira-dialog [data-dismiss]`, function() {
        this.addEventListener(`click`, () => {
            this.closest(`.jira-dialog`).remove();
            document.querySelector(`.aui-blanket`).remove();
        })
    })
}

await main();
