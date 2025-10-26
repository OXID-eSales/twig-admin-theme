(function ($) {
    $.widget("ui.productMediaManager", {
        _create() {
            this.locateDomElements();
            this.initErrorDisplayAreaControls();
            this.initImageLightboxControls();
            if (this.element.data("readonly") !== "true") {
                this.initFileUploadButton();
                this.initGlobalDropArea();
                this.initFeaturedTargets();
                this.initImageActionButtons();
                this.initImageSortingGrid();
            }
        },
        locateDomElements() {
            this.$imageForm = $("#myedit");
            this.$loaderAnimation = $("#loader-animation");
            this.$errorMessages = this.$imageForm.find(".uploads .error-message");
            this.$closeErrorBtn = this.$imageForm.find(".uploads .error-message .close-message-button");
            this.$fileInput = this.$imageForm.find("#product-media-uploads-file-input");
            this.$dragAndDropArea = this.$imageForm.find(".uploads .file-drop-area");
            this.$fileUploadButton = this.$imageForm.find(".uploads .file-upload-button");
            this.$lightbox = $("#lightbox");
            this.$imageGrid = this.$imageForm.find(".uploads .grid");
            this.$thumbCard = this.$imageForm.find("#thumb .card");
            this.$iconCard = this.$imageForm.find("#icon .card");
            this._pendingRole = "detail";
        },
        initImageLightboxControls() {
            this.$imageGrid.on("click", ".item", (e) => {
                if ($(e.target).closest("button").length) return;
                e.stopPropagation();
                if (this.$lightbox.css("display") !== "none") return;
                this.openLightbox($(e.currentTarget).data("url"));
            });
            this.$lightbox.on("click", (e) => {
                if (e.target === this.$lightbox[0]) this.closeLightbox();
            });
        },
        initErrorDisplayAreaControls() {
            this.$closeErrorBtn.on("click", () => this.$errorMessages.hide());
        },
        initFileUploadButton() {
            this.$fileUploadButton.add(this.$dragAndDropArea).on("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._pendingRole = "detail";
                this.$fileInput.prop("multiple", true);
                this.openFilePicker(this.$fileInput);
            });
            const onChange = async (e) => {
                const files = e.target.files;
                if (!files || !files.length) return;
                await this.addFiles(files);
                $(e.target).val("");
            };
            this.$fileInput.on("change", onChange);
        },
        initGlobalDropArea() {
            let dragDepth = 0;
            const enter = (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                dragDepth++;
                this.$dragAndDropArea.addClass("drag-over");
            };
            const over = (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
            };
            const leave = (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                dragDepth = Math.max(0, dragDepth - 1);
                if (dragDepth === 0) this.$dragAndDropArea.removeClass("drag-over");
            };
            const drop = async (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                dragDepth = 0;
                this.$dragAndDropArea.removeClass("drag-over");
                const dt = ev.originalEvent.dataTransfer;
                if (dt && dt.files && dt.files.length) {
                    this._pendingRole = "detail";
                    await this.addFiles(dt.files);
                }
            };
            this.$dragAndDropArea.on("dragenter", enter);
            this.$dragAndDropArea.on("dragover", over);
            this.$dragAndDropArea.on("dragleave", leave);
            this.$dragAndDropArea.on("drop", drop);
        },
        initFeaturedTargets() {
            const setupDropZone = ($el, type) => {
                let dragDepth = 0;
                $el.on("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.element.data("readonly") === "true") return;
                    const $t = $(e.target);
                    if ($t.closest(".title, .inputhelp, .help, a, [role='button'], button").length) return;
                    this._pendingRole = type;
                    this.$fileInput.prop("multiple", false);
                    this.openFilePicker(this.$fileInput);
                });
                $el.on("dragenter", (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    dragDepth++;
                    $el.addClass("drag-over");
                });
                $el.on("dragover", (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                });
                $el.on("dragleave", (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    dragDepth = Math.max(0, dragDepth - 1);
                    if (dragDepth === 0) $el.removeClass("drag-over");
                });
                $el.on("drop", async (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    dragDepth = 0;
                    $el.removeClass("drag-over");
                    const dt = ev.originalEvent.dataTransfer;
                    if (!dt || !dt.files || !dt.files.length) return;
                    this._pendingRole = type;
                    if (type === "thumbnail" || type === "icon") {
                        await this.addFiles([dt.files[0]]);
                    } else {
                        await this.addFiles(dt.files);
                    }
                });
            };
            setupDropZone(this.$thumbCard, "thumbnail");
            setupDropZone(this.$iconCard, "icon");
        },
        initImageActionButtons() {
            [
                { action: "removeFile", selector: ".delete-media" },
                { action: "toggleActive", selector: ".toggle-active" }
            ].forEach(({ action, selector }) => {
                this.$imageGrid.on("click", selector, async (e) => {
                    e.stopPropagation();
                    await this[action]($(e.currentTarget).closest(".item").data("id"));
                });
            });
        },
        initImageSortingGrid() {
            this.$imageGrid.sortable({
                items: ".item:not([data-status='uploading'])",
                placeholder: "ui-sortable-placeholder",
                helper: "clone",
                tolerance: "pointer",
                cancel: ".media-actions, .media-actions *",
                over: (_, ui) => {
                    ui.placeholder.css("background-image", `url(${ui.item.find("img").attr("src")})`);
                },
                start: () => {
                    this._prevOrder = this.$imageGrid.find(".item").map((_, el) => $(el).data("id")).get();
                    this.$imageGrid.addClass("sorting-active");
                },
                stop: () => {
                    this.$imageGrid.removeClass("sorting-active");
                },
                update: this.updateSorting.bind(this)
            });
        },
        openLightbox(imgUrl) {
            this.$lightbox.find("img").remove();
            const image = $("<img>", { class: "lightbox-img", src: imgUrl });
            image.on("load", () => this.$lightbox.addClass("visible"));
            image.on("error", () => this.closeLightbox());
            this.$lightbox.prepend(image);
        },
        closeLightbox() {
            this.$lightbox.removeClass("visible");
            setTimeout(() => {
                if (!this.$lightbox.hasClass("visible")) this.$lightbox.find("img").remove();
            }, 150);
        },
        showError(err) {
            this.$errorMessages.find("ul").remove();
            const errors = Array.isArray(err) ? err : [err];
            const $ul = $("<ul>");
            errors.forEach((msg) => $("<li>").text(msg).appendTo($ul));
            this.$errorMessages.append($ul).show();
        },
        async updateSorting() {
            const sortedIds = [];
            this.$imageGrid.find(".item").each((_, el) => sortedIds.push($(el).data("id")));
            const resp = await this.sendRequest(this.prepareFormDataObject("sortMedia", { sorting: JSON.stringify(sortedIds) }), { reloadOnSuccess: false });
            const isError = resp === null || (resp && resp.error);
            if (isError) {
                if (Array.isArray(this._prevOrder) && this._prevOrder.length) this.applyOrder(this._prevOrder);
                return;
            }
            this._prevOrder = sortedIds;
        },
        applyOrder(order) {
            const byId = {};
            this.$imageGrid.find(".item").each((_, el) => { byId[String($(el).data("id"))] = el; });
            order.forEach((id) => {
                const el = byId[String(id)];
                if (el) this.$imageGrid.append(el);
            });
        },
        async addFiles(files) {
            let fnc = this._pendingRole === "detail" ? "addMedia" : "replaceMedia";
            const extra = { role: this._pendingRole };
            if (fnc === "replaceMedia") {
                const cardIdByRole = {
                    thumbnail: this.$thumbCard.data("id"),
                    icon: this.$iconCard.data("id")
                };
                const currentId = cardIdByRole[this._pendingRole];
                if (currentId) {
                    extra.productMediaId = String(currentId);
                } else {
                    fnc = "addMedia";
                }
            }
            await this.sendRequest(this.prepareFormDataObject(fnc, extra, files));
            this._pendingRole = "detail";
        },
        async removeFile(id) {
            if (!window.confirm(top.oxid.admin.getDeleteMessage())) return;
            await this.sendRequest(this.prepareFormDataObject("removeMedia", { productMediaId: id }), { reloadOnSuccess: true });
        },
        async toggleActive(fileId) {
            const $item = this.getItemById(fileId);
            if (!$item.length) return;
            const current = String($item.attr("data-active")) === "true";
            const next = !current;
            const resp = await this.sendRequest(this.prepareFormDataObject("toggleMediaActiveState", { productMediaId: fileId }), { reloadOnSuccess: false });
            const isError = resp === null || (resp && resp.error);
            if (isError) return;
            $item.attr("data-active", next ? "true" : "false");
            const $btn = $item.find("button.toggle-active");
            $btn.toggleClass("inactive", !next).toggleClass("active", next);
        },
        prepareFormDataObject(func, extraData, files) {
            const dataObject = new FormData();
            const formData = this.$imageForm.serializeArray();
            const fncField = formData.find(({ name }) => name === "fnc");
            if (fncField) fncField.value = func;
            formData.forEach(({ name, value }) => dataObject.append(name, value));
            if (files) {
                const list = files instanceof FileList ? Array.from(files) : Array.isArray(files) ? files : [];
                list.forEach(file => dataObject.append("uploadedFiles[]", file));
            }
            if (extraData && typeof extraData === "object") {
                Object.entries(extraData).forEach(([k, v]) => dataObject.append(k, v));
            }
            return dataObject;
        },
        async sendRequest(formData, options = {}) {
            const { reloadOnSuccess = true } = options;
            this.showLoader();
            const url = this.$imageForm.attr("action");
            return new Promise((resolve) => {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: formData,
                    processData: false,
                    contentType: false
                })
                    .done((data) => {
                        if (reloadOnSuccess && !(data && data.error)) {
                            top.forceReloadingEditFrame();
                            top.reloadEditFrame();
                        }
                        resolve(data);
                    })
                    .fail((xhr, __, errorThrown) => {
                        try {
                            const json = xhr.responseJSON;
                            if (json && json.error) this.showError(json.error);
                            else this.showError(errorThrown);
                        } catch (_) {
                            this.showError(errorThrown);
                        }
                        resolve(null);
                    })
                    .always((data) => {
                        this.hideLoader();
                        if (data && data.error) this.showError(data.error);
                    });
            });
        },
        showLoader() {
            this.$loaderAnimation.css("display", "flex");
        },
        hideLoader() {
            clearTimeout(this._loaderTimeout);
            this._loaderTimeout = setTimeout(() => {
                this.$loaderAnimation.css("display", "none");
            }, 400);
        },
        getItemById(id) {
            return this.$imageGrid.find(".item").filter((_, el) => String($(el).data("id")) === String(id));
        },
        openFilePicker($input) {
            const el = $input && $input[0];
            if (!el) return;
            if (typeof el.showPicker === "function") {
                el.showPicker();
            } else if (typeof el.click === "function") {
                el.click();
            }
        }
    });
})(jQuery);
