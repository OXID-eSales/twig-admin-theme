/**
 * Copyright © OXID eSales AG. All rights reserved.
 * See LICENSE file for license details.
 */

var oxShopSelect = (function ($) {

    return {
        options: {
            'width': '165px',
            'disable_search_threshold': 9,
            'no_results_text': '-'
        },
        init: function () {
            var oSelectShop = $('#selectshop');
            oSelectShop.chosen(oxShopSelect.options);
        }
    };

})(jQuery);

jQuery.noConflict();

jQuery(document).ready(function () {
    oxShopSelect.init();
});
