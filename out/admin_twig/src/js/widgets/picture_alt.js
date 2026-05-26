(function ($) {
    $(function () {
        const $table = $('#picture-alt-manager .picture-alt-table');

        $table.find('.locale-field input[type="text"]').each(function () {
            $(this).data('original', $(this).val());
        });

        $table.on('click', '.picture-alt-row', (e) => {
            toggleRow($(e.currentTarget));
        });

        $table.on('input', '.locale-field input[type="text"]', (e) => {
            updateBadges($(e.currentTarget).closest('tr.expand-row'));
        });

        function toggleRow($row) {
            const id = $row.data('row-id');
            const $expandRow = $(`#expand-${id}`);
            const isExpanded = $row.data('expanded') === true;

            $table.find('.picture-alt-row').each(function () {
                if ($(this).data('row-id') !== id) {
                    $(this).data('expanded', false);
                    $(`#expand-${$(this).data('row-id')}`).hide();
                }
            });

            if (isExpanded) {
                $row.data('expanded', false);
                $expandRow.hide();
            } else {
                $row.data('expanded', true);
                $expandRow.show();
            }
        }

        function updateBadges($expandRow) {
            const id = $expandRow.attr('id').replace('expand-', '');
            const $row = $table.find(`.picture-alt-row[data-row-id="${id}"]`);
            const $inputs = $expandRow.find('.locale-field input[type="text"]');

            $inputs.each(function () {
                const current = $(this).val().trim();
                const original = ($(this).data('original') || '').trim();
                const localeCode = $(this).data('locale-code');
                const $badge = $row.find('.lang-badge').filter(function () {
                    return $(this).data('locale-code') === localeCode;
                });

                if (current !== original) {
                    $badge.removeClass('filled').addClass('changed');
                } else if (current !== '') {
                    $badge.removeClass('changed').addClass('filled');
                } else {
                    $badge.removeClass('filled changed');
                }
            });
        }
    });
})(jQuery);
