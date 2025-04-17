(function ($) {
    $.widget(
        "ui.productMediaManager",
        {
            _create() {
                this.locateDomElements();
                this.initErrorDisplayAreaControls();
                this.initImageLightboxControls();
                if (!(this.element.data("readonly") === "true")) {
                    this.initFileUploadButton();
                    this.initDragAndDropFileUploadArea();
                    this.initImageActionButtons();
                    this.initImageSortingGrid();
                }
            },
            locateDomElements() {
                this.$imageForm = $('#myedit');
                this.$loaderAnimation = $('#loader-animation');
                this.$errorMessages = this.$imageForm.find(".uploads .error-message");
                this.$closeErrorBtn = this.$imageForm.find(".uploads .error-message .close-message-button");
                this.$fileInput = this.$imageForm.find("#product-media-uploads-file-input");
                this.$dragAndDropArea = this.$imageForm.find(".uploads .file-drop-area");
                    this.$fileUploadButton = this.$imageForm.find(".uploads .file-upload-button");
                this.$lightbox = $("#lightbox");
                this.$imageGrid = this.$imageForm.find(".uploads .grid");
                this.$thumbCard = this.$imageForm.find("#thumb .card");
                this.$iconCard = this.$imageForm.find("#icon .card");
            },
            initImageLightboxControls() {
                this.$imageGrid.on("click", ".item", (e) => {
                    e.stopPropagation();
                    if (this.$lightbox.css("display") !== "none") {
                        return;
                    }
                    this.openLightbox($(e.currentTarget).data("url"));
                });
                ["$thumbCard", "$iconCard"].forEach((card) => {
                    this[card].on("click", (e) => {
                        e.stopPropagation();
                        this.openLightbox(
                            $(e.currentTarget).children("img").first().attr("src")
                        );
                    });
                });

                this.$lightbox.on("click", (e) => {
                    if (e.target === this.$lightbox[0]) {
                        this.closeLightbox();
                    }
                });
                this.$imageForm.find('.featured-images .card .title, .uploads .grid .item .title').on('click', function(e) {
                    e.stopPropagation();
                });
            },
            initErrorDisplayAreaControls() {
                this.$closeErrorBtn.on("click", () => this.$errorMessages.hide());
            },
            initFileUploadButton() {
                this.$fileUploadButton
                    .add(this.$dragAndDropArea)
                    .on("click", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.$fileInput.trigger('click');
                    });
                this.$fileInput.on("change", async(e) => {
                    if (e.target.files.length) {
                        await this.addFiles(e.target.files)
                    }
                    this.$fileInput.val("")
                });
            },
            initDragAndDropFileUploadArea() {
                const handleDragEvent = (ev, addClass) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this.$dragAndDropArea.toggleClass("drag-over", addClass);
                };
                this.$dragAndDropArea.on("dragenter dragover", (ev) => handleDragEvent(ev, true));
                this.$dragAndDropArea.on("dragleave", (ev) => handleDragEvent(ev, false));
                this.$dragAndDropArea.on("drop", async(ev) => {
                    handleDragEvent(ev, false);
                    if (ev.originalEvent.dataTransfer && ev.originalEvent.dataTransfer.files.length) {
                        await this.addFiles(ev.originalEvent.dataTransfer.files);
                    }
                });
            },
            initImageActionButtons() {
                [
                    { action: "setIcon", selector: ".set-icon" },
                    { action: "setThumbnail", selector: ".set-thumb" },
                    { action: "removeFile", selector: ".delete-media" },
                    { action: "toggleActive", selector: ".toggle-active" }
                ].forEach(({ action, selector }) => {
                    this.$imageGrid.on("click", selector, async(e) => {
                        e.stopPropagation();
                        await this[`${action}`]($(e.currentTarget).closest(".item").data("id"));
                    });
                });
            },
            initImageSortingGrid() {
                this.$imageGrid.sortable({
                    items: ".item:not([data-status='uploading'])",
                    placeholder: "ui-sortable-placeholder",
                    helper: "clone",
                    tolerance: "pointer",
                    over: (_, ui) => {
                        ui.placeholder.css(
                            'background-image',
                            `url(${ui.item.find('img').attr('src')})`
                        );

                    },
                    update: this.updateSorting.bind(this)
                });
            },
            openLightbox(imgUrl) {
                this.$lightbox.find("img").remove();
                const image = $('<img>', {
                    class: 'lightbox-img',
                    src: imgUrl
                });
                image.on("load", () => this.$lightbox.addClass("visible"))
                image.on("error", () => this.closeLightbox());
                this.$lightbox.prepend(image);
            },
            closeLightbox() {
                this.$lightbox.removeClass("visible")
                setTimeout(() => {
                    if (!this.$lightbox.hasClass("visible")) {
                        this.$lightbox.find("img").remove();
                    }
                }, 150)
            },
            showError(err) {
                this.$errorMessages.find("ul").remove();
                const errors = Array.isArray(err) ? err : [err];
                const $ul = $("<ul>");
                errors.forEach((msg) => $("<li>").text(msg).appendTo($ul));
                this.$errorMessages.append($ul).show();
            },
            async updateSorting() {
                const sortedIds = []
                this.$imageGrid.find(".item").each((_, el) => {
                    sortedIds.push($(el).data("id"))
                })
                await this.sendRequest(
                    this.prepareFormDataObject("sortMedia", {sorting: JSON.stringify(sortedIds)})
                );
            },
            async addFiles(id) {
                await this.sendRequest(
                    this.prepareFormDataObject("addMedia", id)
                );
            },
            async removeFile(id) {
                if (!window.confirm("Are you sure you want to remove this file?")) {
                    return;
                }
                await this.sendRequest(
                    this.prepareFormDataObject("removeMedia", {productMediaId: id})
                );
            },
            async setThumbnail(id) {
                await this.sendRequest(
                    this.prepareFormDataObject('setAsThumbnail', {productMediaId: id})
                );
            },
            async setIcon(id) {
                await this.sendRequest(
                    this.prepareFormDataObject('setAsIcon', {productMediaId: id})
                );
            },
            async toggleActive(fileId) {
                await this.sendRequest(
                    this.prepareFormDataObject("toggleMediaActiveState", {productMediaId: fileId})
                );
            },
            prepareFormDataObject(func, extraData) {
                const dataObject = new FormData();
                const formData = this.$imageForm.serializeArray();
                formData.find(({name}) => name === 'fnc').value = func;
                formData.forEach(({name, value}) => dataObject.append(name, value));
                if (extraData instanceof FileList) {
                    Array.from(extraData).forEach(file => dataObject.append('uploadedFiles[]', file));
                } else {
                    Object.entries(extraData).forEach(([key, value]) => dataObject.append(key, value));
                }
                dataObject.set('action', this.$imageForm.attr('action'));

                return dataObject;
            },
            async sendRequest(formData) {
                this.showLoader();
                const action = formData.get('action');
                formData.delete('action');
                $.ajax({
                    type: "POST",
                    url: action,
                    data: formData,
                    processData: false,
                    contentType: false
                })
                    .done((data) => {
                        if (!data.error) {
                            top.forceReloadingEditFrame();
                            top.reloadEditFrame();
                        }
                    })
                    .fail((_, __, errorThrown) => this.showError(errorThrown))
                    .always(async(data) => {
                        this.hideLoader();
                        if (data.error) {
                            this.showError(data.error);
                        }
                    });
            },
            showLoader() {
                this.$loaderAnimation.css('display', 'flex');
            },
            hideLoader() {
                clearTimeout(this._loaderTimeout);
                this._loaderTimeout = setTimeout(() => {
                    this.$loaderAnimation.css('display', 'none');
                }, 500);
            }
        }
    )
})(jQuery)
