interface Style {
    marginLeft?: string;
    textTransform?: string;
}

function generateStyle(config: Style|string) {
    if(typeof config === `string`) {
        return config;
    }

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

export function button(id: string, text: string, style: Style|string = {}): Element|string|any {
    const buttonStyle = `
        -webkit-box-align: baseline;
        align-items: baseline;
        box-sizing: border-box;
        display: inline-flex;
        font-size: inherit;
        font-style: normal;
        font-family: inherit;
        font-weight: 500;
        max-width: 100%;
        position: relative;
        text-align: center;
        white-space: nowrap;
        color: var(--ds-text-onBold, #FFFFFF);
        cursor: pointer;
        height: 2.28571em;
        line-height: 2.28571em;
        vertical-align: middle;
        width: auto;
        -webkit-box-pack: center;
        justify-content: center;
        background-color: var(--ds-background-boldBrand-resting, #0052CC);
        border-width: 0px;
        border-radius: 3px;
        text-decoration: none;
        transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
        padding: 0px 10px;
        outline: none;
        margin: 0 0 0 5px;
    `.replace(/\s+/g,` `).replace(/(\r\n|\n|\r)/gm, ``).trim();

    const spanStyle = `
        opacity: 1;
        transition: opacity 0.3s ease 0s;
        margin: 0px 2px;
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `.replace(/\s+/g,` `).replace(/(\r\n|\n|\r)/gm, ``).trim();

    return `
        <button id="${id}" style="${buttonStyle} ${generateStyle(style)}" type="button">
            <span style="${spanStyle}">${text}</span>
        </button>
    `;
}

export function badge(text: string, style: Style|string = {}): Element|string|any {
    if(typeof style !== `string` && !style.textTransform) {
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
