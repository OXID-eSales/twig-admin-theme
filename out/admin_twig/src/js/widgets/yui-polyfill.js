window.$ = (item) => {
    if (!item) {
        return null;
    }

    if (/^[^*#.\[:]/.test(item)) {
        return document.getElementById(item);
    }

    return document.querySelector(item);
};

window.$E = {
    addListener: (el, e, cb, self = el) => {
        el.addEventListener(e, () => {
            cb.call(self);
        });
    },
    onDOMReady: (cb) => {
        document.addEventListener('DOMContentLoaded', () => {
            cb.call(document);
        });
    }
};

window.$D = {
    addClass: (el, name) => {
        el.classList.add(name);
    },
    removeClass: (el, name) => {
        el.classList.remove(name);
    },
    setStyle (el, prop, value) {
        if (prop in el.style) {
            el.style[prop] = value;
        }
    }
};

window.YAHOO = {
    oxid: {
        aoc: class {
            viewSize = 25;
            viewCount = 10;
            dataSize = this.viewSize * this.viewCount;
            elContainer;

            tableBaseData;

            contextMenu;

            dataTable;
            sDataSource;
            dragImage;

            dataSource;

            selectedRows = new Set([]);

            filters = {};

            totalRecords = 0;

            identFields = [];

            sortCol = '_0';

            sortDir = 'asc';

            startIndex = 0;

            baseData = [];

            data = new Proxy(this.baseData, {
                set: (target, property, value) => {
                    if (property !== 'length') {
                        const numericIndex = Number(property.valueOf());

                        const tr = document.createElement('tr');
                        tr.draggable = true;
                        tr.id = `yui-rec${property.toString()}`;
                        tr.dataset.index = property.toString();
                        tr.classList.add('yui-dt-rec', numericIndex % 2 === 0 ? 'yui-dt-even' : 'yui-dt-odd');

                        if (numericIndex === 0) {
                            tr.classList.add('yui-dt-first');
                        }

                        tr.addEventListener('click', e => {
                            tr.classList.add('yui-dt-selected');

                            const index = Number(tr.dataset.index);
                            if (e.ctrlKey || ((navigator.userAgent.toLowerCase().includes('mac')) && e.metaKey)) {
                                this.selectedRows.add(index);
                                this.selectedRows = new Set([...this.selectedRows].sort());
                            } else if (e.shiftKey) {
                                this.selectedRows.add(index);
                                this.selectedRows = new Set([...this.selectedRows].sort());
                                if (this.selectedRows.size > 1) {
                                    const array = [...this.selectedRows];
                                    for (let i = array[0]; i < array[array.length - 1]; i++) {
                                        this.selectedRows.add(i);
                                    }
                                }
                            } else {
                                this.selectedRows = new Set([index]);
                            }

                            tr.parentNode.childNodes.forEach(tr => {
                                if (!this.selectedRows.has(Number(tr.dataset.index))) {
                                    tr.classList.remove('yui-dt-selected');
                                } else {
                                    tr.classList.add('yui-dt-selected');
                                }
                            });

                            console.log(this.selectedRows);

                            this.elContainer.dispatchEvent(new CustomEvent('rowClickEvent', {
                                detail: {
                                    el: tr
                                }
                            }));
                            this.elContainer.dispatchEvent(new CustomEvent('rowSelectEvent', {
                                detail: {
                                    el: tr
                                }
                            }));
                        });

                        tr.addEventListener('mousedown', e => {
                            if (!(e.ctrlKey || (navigator.userAgent.toLowerCase().includes('mac') && e.metaKey) || e.shiftKey) && e.buttons === 1 && e.button === 0) {
                                tr.classList.add('yui-dt-selected');
                                this.elContainer.dispatchEvent(new CustomEvent('rowMousedownEvent', {
                                    detail: {
                                        el: tr
                                    }
                                }));
                            }
                        });

                        tr.addEventListener('dragstart', e => {
                            const index = Number(tr.dataset.index);

                            if (!this.selectedRows.has(index)) {
                                this.selectedRows = new Set([index]);
                            }

                            tr.parentNode.childNodes.forEach(tr => {
                                const rowIndex = Number(tr.dataset.index);
                                if (this.selectedRows.has(rowIndex)) {
                                    tr.classList.add('yui-dt-selected');
                                } else {
                                    tr.classList.remove('yui-dt-selected');
                                }
                            });

                            e.dataTransfer.effectAllowed = 'copyMove';
                            e.dataTransfer.setData('text/plain', JSON.stringify({
                                containerId: this.elContainer.id,
                                data: this.getSelectedRows().map(row =>
                                    JSON.parse(this.elContainer.querySelector(`:scope tr[data-index="${row}"]`).dataset.identFields)
                                ),
                                url: `${this.dataSource}&${this.getDropAction()}`
                            }));

                            this.dragImage = document.createElement('div');
                            this.dragImage.style.border = '2px solid rgb(170, 170, 170)';
                            this.dragImage.style.zIndex = '-1';
                            this.dragImage.style.height = '26px';
                            this.dragImage.style.width = '26px';
                            this.dragImage.style.position = 'absolute';
                            this.dragImage.style.top = '0';
                            this.elContainer.append(this.dragImage);

                            e.dataTransfer.setDragImage(this.dragImage, 13, 13);
                        });



                        tr.addEventListener('dragend', e => {
                            if (this.selectedRows.size === 0) {
                                return;
                            }

                            e.dataTransfer.dropEffect = 'copy';
                            this.elContainer.removeChild(this.dragImage);
                            this.dragImage = undefined;
                        });

                        tr.dataset.identFields = JSON.stringify(this.identFields.map(identField => {
                            if (value[identField]) {
                                return {
                                    ident: identField,
                                    value: value[identField]
                                };
                            }

                            return false;
                        }).filter(Boolean));

                        if (typeof value === 'object' && value !== null) {
                            for (let key in value) {
                                const td = document.createElement('td');
                                td.classList.add('yui-dt-asc');
                                td.dataset.key = key;
                                td.dataset.value = value[key];
                                td.style.display = this.tableBaseData.find(item => item.key === key).visible ? '' : 'none';

                                const div = document.createElement('div');
                                div.classList.add('yui-dt-liner');

                                console.log(this.identFields, key);

                                div.innerText = value[key].length > 30 ? value[key].substr(0, 30) + '...' : value[key];
                                if (value[key].length > 30) {
                                    div.title = value[key];
                                }

                                td.appendChild(div);
                                tr.appendChild(td);
                            }
                        }

                        if (property >= this.dataTable.children.length) {
                            this.dataTable.appendChild(tr);
                        } else {
                            const child = this.dataTable.children[property];

                            if (child.nextSibling) {
                                this.dataTable.insertBefore(tr, child.nextSibling);
                            } else {
                                this.dataTable.appendChild(tr);
                            }
                            const oldEl = child;
                            oldEl.parentNode.removeChild(oldEl);
                        }
                    }

                    return Reflect.set(target, property, value);
                },
                deleteProperty: (target, property) => {
                    if (property in target) {
                        if (property !== 'length') {
                            const oldEl = this.dataTable.children[property];
                            oldEl.parentNode.removeChild(oldEl);
                        }

                        return Reflect.deleteProperty(target, property);
                    }
                }
            });

            constructor (elContainer, tableBaseData, dataSource) {
                this.elContainer = document.getElementById(elContainer);
                this.elContainer.style.position = 'relative';
                this.elContainer.style.zIndex = '0';
                this.dataSource = dataSource;

                this.buildBaseTable(tableBaseData);
                this.initAssignButtons();
                this.buildData();
                document.addEventListener('elementsAssigned', () => {
                    this.buildData();
                });
                this.scrollObserver = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting && this.data.length < this.totalRecords) {
                        this.buildData(this.page + 1, true);
                    }
                });
            }

            buildContextMenu () {
                if (this.tableBaseData.filter(item => item.label).length < 2) {
                    return;
                }

                this.contextMenu = document.createElement('div');
                this.contextMenu.id = `${this.elContainer.id}_m`;
                this.contextMenu.classList.add('yuimenu');
                this.contextMenu.style.position = 'absolute';
                this.contextMenu.style.zIndex = '1000';
                this.contextMenu.style.display = 'none';

                const bd = document.createElement('div');
                bd.classList.add('bd');

                const list = document.createElement('ul');
                list.classList.add('first-of-type');

                this.tableBaseData.forEach(({ label, visible, key }, index) => {
                    if (label && index > 0) {
                        const li = document.createElement('li');
                        li.classList.add('yuimenuitem');

                        const link = document.createElement('a');
                        link.href = '#';
                        link.type = 'link';
                        link.classList.add('yuimenuitemlabel');
                        link.style.border = '0';
                        link.innerText = label;

                        if (visible) {
                            li.classList.add('yuimenuitem-checked');
                            link.classList.add('yuimenuitemlabel-checked');
                        }

                        li.appendChild(link);

                        li.addEventListener('mouseenter', () => {
                            li.classList.add('yuimenuitem-selected');
                            link.classList.add('yuimenuitemlabel-selected');
                        });

                        li.addEventListener('mouseleave', () => {
                            li.classList.remove('yuimenuitem-selected');
                            link.classList.remove('yuimenuitemlabel-selected');
                        });

                        li.addEventListener('click', () => {
                            this.contextMenu.style.display = 'none';

                            if (li.classList.contains('yuimenuitem-checked')) {
                                this.tableBaseData[index].visible = false;

                                this.buildData().then(() => {
                                    li.classList.remove('yuimenuitem-checked');
                                    link.classList.remove('yuimenuitemlabel-checked');
                                    this.elContainer.querySelectorAll(`:scope [data-key="${key}"]`).forEach(el => {
                                        el.style.display = 'none';
                                    });
                                });

                            } else {
                                this.tableBaseData[index].visible = true;

                                this.buildData().then(() => {
                                    li.classList.add('yuimenuitem-checked');
                                    link.classList.add('yuimenuitemlabel-checked');
                                    this.elContainer.querySelectorAll(`:scope [data-key="${key}"]`).forEach(el => {
                                        el.style.display = '';
                                    });
                                });
                            }
                        });

                        list.appendChild(li);
                    }
                });

                bd.appendChild(list);
                this.contextMenu.appendChild(bd);
                document.body.appendChild(this.contextMenu);
            }

            showContextMenu (top, left) {
                if (!this.contextMenu) {
                    this.buildContextMenu();
                }

                if (this.contextMenu) {
                    this.contextMenu.style.display = 'block';
                    this.contextMenu.style.top = top;
                    this.contextMenu.style.left = left;
                }
            }

            buildBaseTable (tableBaseData = []) {
                this.tableBaseData = tableBaseData;
                const table = document.createElement('table');
                table.classList.add('oxid-aoc');
                table.style.borderSpacing = '0px';
                table.style.border = '0px';

                const tableBody = document.createElement('tbody');
                const wrapperTr = document.createElement('tr');
                const background = document.createElement('td');
                background.classList.add('oxid-aoc-table');
                background.id = `${this.elContainer.id}_bg`;
                background.style.verticalAlign = 'top';
                background.style.height = '450px';
                background.style.marginTop = '39px';
                background.style.overflowY = 'auto';

                background.addEventListener('drop', e => {
                    e.preventDefault();
                    if (!e.dataTransfer.getData('text/plain')) {
                        return;
                    }

                    const { containerId, data, url } = JSON.parse(e.dataTransfer.getData('text/plain'));
                    if (!e.target.closest(`#${containerId}`)) {
                        console.log(data);

                        const sourceContainer = window.YAHOO.oxid[containerId];
                        const targetContainerId = background.id;
                        const targetContainer = window.YAHOO.oxid[targetContainerId];

                        this.assignData(url, data, sourceContainer, targetContainer);

                        background.classList.remove('ddtarget');
                    }
                });
                background.addEventListener('dragover', e => {
                    e.preventDefault();
                    if (!e.dataTransfer.getData('text/plain')) {
                        return;
                    }

                    const { containerId } = JSON.parse(e.dataTransfer.getData('text/plain'));
                    if (!e.target.closest(`#${containerId}`)) {
                        e.dataTransfer.dropEffect = 'move';
                        background.classList.add('ddtarget');
                    }
                });
                background.addEventListener('dragleave', () => {
                    background.classList.remove('ddtarget');
                });

                const separator = document.createElement('td');
                separator.style.height = '100%';
                separator.style.verticalAlign = 'top';

                const separatorInner = document.createElement('div');
                separatorInner.classList.add('oxid-aoc-scrollbar');
                separatorInner.style.height = '450px';
                separatorInner.style.marginTop = '39px';

                separator.appendChild(separatorInner);

                const container = document.createElement('div');
                container.classList.add('yui-dt');
                container.id = `${this.elContainer.id}_c`;
                container.style.height = '100%';
                container.style.overflowY = 'auto';

                const innerTable = document.createElement('table');
                innerTable.classList.add('yui-dt-table');

                const inputHead = document.createElement('thead');
                inputHead.style.position = 'sticky';
                inputHead.style.top = '0';
                const inputHeadRow = document.createElement('tr');
                const head = document.createElement('thead');
                head.style.position = 'sticky';
                const headRow = document.createElement('tr');
                this.dataTable = document.createElement('tbody');
                this.dataTable.tabindex = '0';
                this.dataTable.classList.add('yui-dt-data');
                tableBaseData.forEach(({ key, label, visible, ident = false }) => {
                    const headItem = document.createElement('th');
                    headItem.dataset.key = key;
                    headItem.dataset.order = 'asc';
                    headItem.dataset.key = key;
                    headItem.classList.add('yui-dt-sortable', 'yui-dt-resizable');

                    const resizerLiner = document.createElement('div');
                    resizerLiner.classList.add('yui-dt-resizerliner');

                    const liner = document.createElement('div');
                    liner.classList.add('yui-dt-liner');

                    const linerLabel = document.createElement('span');
                    linerLabel.classList.add('yui-dt-label');

                    const linerLink = document.createElement('a');
                    linerLink.classList.add('yui-dt-sortable');
                    linerLink.innerText = label || '';
                    linerLink.title = `Click to sort ${headItem.dataset.order === 'asc' ? 'desc' : 'asc'}ending`;

                    const resizer = document.createElement('div');
                    resizer.classList.add('yui-dt-resizer');

                    linerLabel.appendChild(linerLink);
                    linerLabel.appendChild(resizer);
                    liner.appendChild(linerLabel);
                    resizerLiner.appendChild(liner);
                    headItem.appendChild(resizerLiner);

                    headItem.addEventListener('click', () => {
                        const hasSortClass = headItem.classList.contains('yui-dt-asc') || headItem.classList.contains('yui-dt-desc');
                        if (hasSortClass) {
                            headItem.dataset.order = headItem.dataset.order === 'asc' ? 'desc' : 'asc';
                        }

                        headItem.parentNode.querySelectorAll(':scope th').forEach(el => {
                            el.classList.remove('yui-dt-asc', 'yui-dt-desc');
                        });
                        headItem.classList.add(`yui-dt-${headItem.dataset.order}`);
                        linerLink.title = `Click to sort ${headItem.dataset.order === 'asc' ? 'desc' : 'asc'}ending`;
                        this.sortData(key, headItem.dataset.order);
                    });

                    headRow.appendChild(headItem);

                    const inputHeadItem = document.createElement('th');
                    inputHeadItem.style.padding = '0px';
                    inputHeadItem.dataset.key = key;
                    const inputHeadDiv = document.createElement('div');
                    inputHeadDiv.style.padding = '2px';
                    inputHeadDiv.style.overflow = 'hidden';
                    const input = document.createElement('input');

                    input.name = key;
                    input.style.width = '95%';
                    let filterTimeout;
                    input.addEventListener('input', () => {
                        clearTimeout(filterTimeout);
                        filterTimeout = setTimeout(() => {
                            console.log('filter', input.value)
                            this.filters[key] = input.value;
                            this.buildData();
                        }, 300);
                    });

                    inputHeadDiv.appendChild(input);
                    inputHeadItem.appendChild(inputHeadDiv);
                    inputHeadRow.appendChild(inputHeadItem);

                    if (!visible) {
                        headItem.style.display = 'none';
                        inputHeadItem.style.display = 'none';
                    }

                    if (ident) {
                        this.identFields.push(key);
                    }
                });

                head.appendChild(headRow);

                head.addEventListener('contextmenu', e => {
                    e.preventDefault();
                    this.showContextMenu(`${e.clientY}px`, `${e.clientX}px`);
                });

                inputHead.appendChild(inputHeadRow);

                innerTable.appendChild(inputHead);
                innerTable.appendChild(head);
                innerTable.appendChild(this.dataTable);

                container.appendChild(innerTable);
                background.appendChild(container);
                wrapperTr.appendChild(background);
                wrapperTr.appendChild(separator);
                tableBody.appendChild(wrapperTr);
                table.appendChild(tableBody);

                this.elContainer.appendChild(table);
                head.style.top = `${inputHead.getBoundingClientRect().height}px`;
            }

            initAssignButtons () {
                const button = new YAHOO.widget.Button(`${this.elContainer.id}_btn`);
                button.on('mouseup', () => {
                    this.assignData();
                });
            }

            sortData (sortCol, dir = 'asc') {
                this.sortCol = sortCol;
                this.sortDir = dir;
                if (this.totalRecords > this.dataSize) {
                    this.buildData();
                } else {
                    this.data.sort((a, b) => {
                        const aVal = String(a[sortCol]);
                        const bVal = String(b[sortCol]);
                        return dir === 'asc'
                            ? aVal.localeCompare(bVal)
                            : bVal.localeCompare(aVal);
                    });
                }
            }

            buildData (page = this.startIndex, append = false) {
                let url = `${this.dataSource}&startIndex=${page * this.dataSize}&results=${this.dataSize}&dir=${this.sortDir}&sort=${this.sortCol}`;

                if (!!Object.keys(this.filters).length) {
                    for (const key in this.filters) {
                        url += `&aFilter[${key}]=${this.filters[key]}`;
                    }
                }

                if (this.tableBaseData.length) {
                    this.tableBaseData.forEach(({ visible, key }) => {
                        if (visible) {
                            url += `&aCols[]=${key}`;
                        }
                    });
                }

                return new Promise((resolve, reject) => {
                    fetch(this.modRequest(url), { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                        .then(response => response.json())
                        .then(({ records, totalRecords, sort, dir, startIndex }) => {
                            this.selectedRows = new Set([]);
                            if (!append && this.data.length > 0) {
                                this.data.splice(0, this.data.length);
                            }

                            records.forEach(item => {
                                this.data.push(item);
                            });
                            this.totalRecords = totalRecords;
                            this.sortCol = sort;
                            this.dir = dir;
                            this.startIndex = startIndex;
                            this.page = page;

                            if (this.totalRecords > 0) {
                                this.scrollObserver.observe(this.dataTable.querySelector(':scope tr:last-child'));
                            }

                            this.elContainer.dispatchEvent(new CustomEvent('dataReturnEvent', {
                                detail: {
                                    el: this.elContainer
                                }
                            }));
                            resolve();
                        })
                        .catch((e) => {
                            console.error(e);
                            this.onFailureCallback(e);
                            reject();
                        });
                });
            }

            assignData (url = `${this.dataSource}&${this.getDropAction()}`, data = [], sourceContainer = null, targetContainer = null) {
                let dropParams;
                if (data.length === 0) {
                    dropParams = '&all=1';
                } else {
                    dropParams = data.flat().reduce((previous, {
                        ident,
                        value
                    }) => `${previous}&${ident}[]=${value}`, '');
                }
                fetch(`${url}&${dropParams}`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(response => response.text())
                    .then((response) => {
                        document.dispatchEvent(new Event('elementsAssigned'));
                        this.elContainer.dispatchEvent(new CustomEvent('dataReturnEvent', {
                            detail: {
                                el: this.elContainer
                            }
                        }));

                        this.onSuccessCallback({ responseText: response });
                    })
                    .catch((e) => {
                        console.error(e);
                        this.onFailureCallback(e);
                    });
            }

            getDataSource () {
                return {
                    flushCache () {

                    }
                };
            }

            getDropAction () {
                return '';
            }

            subscribe (e, cb) {
                this.elContainer.addEventListener(e, originalEvent => {
                    console.log(originalEvent);
                    cb({
                        el: originalEvent.detail.el,
                        record: this.getRecord(originalEvent.detail.el.dataset.index)
                    });
                });
            }

            onFailureCallback (error) {

            }

            onSuccessCallback (response) {
                return response;
            }

            custFormatter (elCell, oRecord, oColumn, oData) {

            }

            modRequest (request) {
                return request;
            }

            getPage (page) {
                this.buildData(page);
            }

            getSelectedRows () {
                return Array.from(this.selectedRows);
            }

            getRecord (index) {
                const el = this.elContainer.querySelector(`:scope tr[data-index="${index}"]`);
                if (el) {
                    return new class {
                        get _oData () {
                            return Array.from(el.children).reduce((acc, td) => {
                                const key = td.dataset.key;
                                if (key) acc[key] = td.dataset.value;
                                return acc;
                            }, {});
                        }

                        getData () {
                            return this;
                        }
                    };
                }
            }
        },
        help: {
            showPanel (helpId) {
                const makeDraggable = (dragEl, elToDrag = dragEl) => {
                    let pos1 = 0;
                    let pos2 = 0;
                    let pos3 = 0;
                    let pos4 = 0;

                    const dragMouseDown = e => {
                        if (e.target !== dragEl) {
                            return;
                        }
                        e.preventDefault();
                        // get the mouse cursor position at startup:
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        document.addEventListener('mouseup', closeDragElement);
                        document.addEventListener('mousemove', elementDrag);
                    };

                    const isInViewPort = elToDrag => {
                        const bounding = elToDrag.getBoundingClientRect();
                        const boundingParent = elToDrag.offsetParent.getBoundingClientRect();
                        return (elToDrag.offsetTop - pos2 >= 1 && elToDrag.offsetLeft - pos1 >= 1 && (bounding.right - pos1 <= boundingParent.right &&
                            bounding.bottom - pos2 <= boundingParent.bottom));
                    };

                    const elementDrag = e => {
                        elToDrag.style.zIndex = '9999';
                        e.preventDefault();
                        // calculate the new cursor position:
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        // set the element's new position:
                        if (isInViewPort(elToDrag)) {
                            elToDrag.style.top = (elToDrag.offsetTop - pos2) + 'px';
                            elToDrag.style.left = (elToDrag.offsetLeft - pos1) + 'px';
                        }
                    };

                    const closeDragElement = () => {
                        elToDrag.style.zIndex = '';
                        /* stop moving when mouse button is released: */
                        document.removeEventListener('mouseup', closeDragElement);
                        document.removeEventListener('mousemove', elementDrag);
                    };

                    dragEl.addEventListener('mousedown', dragMouseDown);
                };

                let panelContainer = document.getElementById('helpPanel_c');
                const helpButton = $(`helpBtn_${helpId}`);

                if (!panelContainer) {
                    panelContainer = document.createElement('div');
                    panelContainer.classList.add('yui-panel-container', 'show-scrollbars', 'shadow');
                    panelContainer.id = 'helpPanel_c';
                    panelContainer.style.visibility = 'hidden';

                    let panel = document.getElementById('helpPanel');

                    if (panel) {
                        panel.remove();
                    }

                    panel = document.createElement('div');
                    panel.classList.add('yui-module', 'yui-overlay', 'yui-panel');
                    panel.id = 'helpPanel';
                    panel.style.width = '370px';
                    panel.style.visibility = 'inherit';

                    const closeButton = document.createElement('button');
                    closeButton.classList.add('container-close');
                    closeButton.innerText = 'Close';
                    closeButton.style.border = 'none';
                    closeButton.type = 'button';
                    closeButton.addEventListener('click', () => {
                        panelContainer.style.visibility = 'hidden';
                    });

                    const header = document.createElement('div');
                    header.classList.add('hd');
                    header.id = 'helpPanel_h';
                    header.style.cursor = 'move';
                    header.innerHTML = '&nbsp;';

                    const body = document.createElement('div');
                    body.classList.add('bd');
                    body.innerHTML = $(`helpText_${helpId}`).innerHTML.trim();

                    panel.appendChild(closeButton);
                    panel.appendChild(header);
                    panel.appendChild(body);

                    const underlay = document.createElement('div');
                    underlay.classList.add('underlay');

                    panelContainer.appendChild(panel);
                    panelContainer.appendChild(underlay);
                    document.getElementById('helpTextContainer').appendChild(panelContainer);

                    makeDraggable(header, panelContainer);
                }

                panelContainer.style.visibility = 'visible';

                panelContainer.style.position = 'absolute';
                panelContainer.style.left = `${helpButton.getBoundingClientRect().left + helpButton.offsetWidth + 5}px`;
                panelContainer.style.top = `${helpButton.getBoundingClientRect().top}px`;
            }
        }
    },
    util: {
        Connect: {
            asyncRequest(method, url, { success, failure, scope }) {
                fetch(url, { method, headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(response => {
                        console.log('AJAX success. Scope:', scope);
                        if (typeof success === 'function') success(response);

                        if (scope && typeof scope.buildData === 'function') {
                            scope.buildData();
                        } else {
                            console.warn('buildData not called: scope is', scope);
                        }
                    })
                    .catch(err => {
                        console.error('AJAX error in asyncRequest:', err);
                        if (typeof failure === 'function') failure(err);
                    });
            }
        }
    },
    widget: {
        Button: class {
            id;

            constructor (id) {
                this.id = id;

                const originalButton = document.getElementById(this.id);

                if (originalButton) {
                    const outer = document.createElement('span');
                    outer.id = originalButton.id;
                    outer.classList.add('yui-button', 'yui-push-button');
                    const inner = document.createElement('span');
                    inner.classList.add('first-child');
                    this.button = document.createElement('button');
                    this.button.id = `${originalButton.id}-button`;
                    this.button.type = 'button';
                    this.button.tabIndex = 0;
                    this.button.innerText = originalButton.innerText || originalButton.value;
                    [...originalButton.attributes].forEach(attribute => {
                        this.button.setAttribute(attribute.nodeName, attribute.nodeValue);
                    });
                    if (this.button.disabled) {
                        outer.classList.add('yui-button-disabled', 'yui-push-button-disabled');
                    }

                    inner.appendChild(this.button);
                    outer.appendChild(inner);

                    originalButton.after(outer);
                    originalButton.parentNode.removeChild(originalButton);

                    this.button.addEventListener('mousedown', () => {
                        this.button.parentElement.parentElement.classList.add('yui-button-active', 'yui-push-button-active');
                    });
                    this.button.addEventListener('mouseup', () => {
                        this.button.parentElement.parentElement.classList.remove('yui-button-active', 'yui-push-button-active');
                    });
                    this.button.addEventListener('focusin', () => {
                        this.button.parentElement.parentElement.classList.add('yui-button-focus', 'yui-push-button-focus');
                    });
                    this.button.addEventListener('focusout', () => {
                        this.button.parentElement.parentElement.classList.remove('yui-button-focus', 'yui-push-button-focus');
                    });
                    this.button.addEventListener('mouseenter', () => {
                        this.button.parentElement.parentElement.classList.add('yui-button-hover', 'yui-push-button-hover');
                    });
                    this.button.addEventListener('mouseleave', () => {
                        this.button.parentElement.parentElement.classList.remove('yui-button-hover', 'yui-push-button-hover');
                    });
                }
            }

            on (e, cb) {
                if (this.button) {
                    this.button.addEventListener(e, cb);
                }
            }

            set (attribute, value) {
                console.log(attribute, value);

                if (this.button) {
                    this.button.setAttribute(attribute, value);
                    if (attribute === 'disabled') {
                        this.disable(value);
                    }
                }
            }

            disable (value) {
                const outer = this.button.parentElement.parentElement;

                if (value) {
                    outer.classList.add('yui-button-disabled', 'yui-push-button-disabled');
                    this.button.disabled = true;
                } else {
                    outer.classList.remove('yui-button-disabled', 'yui-push-button-disabled');
                    this.button.disabled = false;
                }
            }
        }
    }
};
