(function ($) {
    $(function () {
        const $form = $('#myedit');

        if (!$form.length) {
            return;
        }

        const $manager = $('#locale-manager');
        const $tbody = $('#locale-tbody');
        const $template = $('#new-locale-template');
        let newLocaleIndex = 0;

        function addNewLocaleRow() {
            if (!$template.length || !$tbody.length) {
                return;
            }

            const $row = $($template[0].content.firstElementChild.cloneNode(true));
            const index = newLocaleIndex++;

            $row.find('[data-name]').each(function () {
                this.name = 'newLocales[' + index + '][' + this.dataset.name + ']';
            });
            $row.find('.remove-icon').on('click', function (e) {
                e.preventDefault();
                $row.remove();
            });

            $('#empty-state-row').hide();
            $tbody.append($row);
        }

        $manager.on('click', '.delete', function (e) {
            e.preventDefault();
            if (window.confirm($(this).data('confirm'))) {
                $form.find('[name="localeCode"]').val($(this).data('locale-code'));
                $form.find('[name="fnc"]').val('delete');
                $form[0].submit();
            }
        });

        $manager.on('click', '.add-row', function (e) {
            e.preventDefault();
            addNewLocaleRow();
        });

        $manager.on('click', '.save-btn', function () {
            $form.find('[name="fnc"]').val('save');
        });
    });
})(jQuery);
