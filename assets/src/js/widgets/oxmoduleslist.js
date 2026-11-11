/**
 * Copyright © OXID eSales AG. All rights reserved.
 * See LICENSE file for license details.
 */

( function ( $ ) {

    oxModulesList = {

        _create: function () {

            var self = this,
                options = self.options,
                el      = self.element;

            $(".sortable,.sortable2").sortable({
                opacity: 0.5,
                update: function () {
                    $("#myedit [name=saveButton]").prop("disabled", false);
                }
            });

            $("#myedit [name=saveButton]").click(function () {
                var aClasses = $(".sortable").sortable('toArray');

                // make array from current order
                var aModules = {};

                $.each(aClasses, function (key, elem) {
                    sIndex = "#" + elem + "_modules";
                    aModules[elem] = $(sIndex).sortable('toArray');
                });

                $("#myedit [name=aModules]").val(JSON.stringify(aModules));
                $("#myedit").submit();
            })
        }
    }

    $.widget("ui.oxModulesList", oxModulesList);

} )(jQuery);
