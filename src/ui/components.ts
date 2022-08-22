interface Style {
    marginLeft?: string;
    textTransform?: string;
}

function generateStyle(config: Style) {
    let style = ``;
    if(config.marginLeft) {
        style += `margin-left: ${config.marginLeft} !important;`;
    }

    if(config.textTransform) {
        style += `text-transform: ${config.textTransform} !important;`;
    }

    return style
}

export function element<T = Element>(html: string, keepHTML: boolean = false): T|string|any {
    if(keepHTML) {
        return html;
    }

    const element = document.createElement(`div`);
    element.innerHTML = html;

    return element.firstElementChild as unknown as T;
}

export function button(id: string, text: string, style: Style = {}): Element|string|any {
    return `
        <button id="${id}" class="css-cxhge5" style="${generateStyle(style)}" type="button">
            <span class="css-19r5em7">${text}</span>
        </button>
    `;
}

export function badge(text: string, style: Style = {}): Element|string|any {
    if(!style.textTransform) {
        style.textTransform = `none`;
    }

    return `
        <span class="aui-badge ghx-statistic-badge custom-badge" style="${generateStyle(style)}">
            ${text}
        </span>
    `;
}

export function modal({id, title, content, html}: {id?: string, title: string, content: string, html?: boolean}) {
    const backdrop = `<div class="aui-blanket" tabindex="0" aria-hidden="false"></div>`;
    const modal = `
        <div id="${id}" class="jira-dialog box-shadow jira-dialog-open popup-width-medium jira-dialog-content-ready"
         style="width: 500px; margin-left: -270px; margin-top: -116.5px;">
            <div class="jira-dialog-heading"><h2 title="Supprimer WIIS-7724 ?">
                ${title}
            </h2></div>
            <div class="jira-dialog-content">
                <div class="form-body" style="max-height: 396px;">
                    <div>${content}</div>
                </div>
                <div class="buttons-container form-footer">
                        <input class="aui-button aui-button-primary flag-and-comment-form-popup-submit" style="width:70px; text-align:center"
                            value="Fermer" data-dismiss>
                </div>
            </div>
        </div>
   `;

    if(html) {
        return backdrop + modal;
    } else {
        document.body.append(element(backdrop));
        document.body.append(element(modal));
    }
}
