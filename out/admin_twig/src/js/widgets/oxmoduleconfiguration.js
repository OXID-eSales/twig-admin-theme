/**
 * Copyright © OXID eSales AG. All rights reserved.
 * See LICENSE file for license details.
 */

( function ( $ ) {

    oxModuleConfiguration = (function () {

        /**
         * Object for jQuery widget creation.
         * @type {{_create: Function}}
         */
        var obj = {
            _create: function () {
                var form = this.element;

                $('.password_input', form).each(handlePassword);
                form.submit(handleSubmit);
            }
        };

        /**
         * All password fields in the form.
         * @type {Array}
         */
        var passwordFields = [];

        /**
         * Handles password field actions.
         * @param position
         * @param password
         */
        function handlePassword(position, password)
        {
            password = $(password);
            var passwordConfirm = password.clone().prop('name', '');

            passwordFields.push({original: password, confirmation: passwordConfirm});

            password.before(passwordConfirm).before($('</br>'));

            if (!password.data('empty')) {
                hidePassword(password, passwordConfirm);
            }

            password.add(passwordConfirm).change(function () {
                if (password.prop('value') != '' || passwordConfirm.prop('value') == '') {
                    checkPassword(password, passwordConfirm);
                }
            });
        }

        /**
         * Handle form submit action.
         * @param event
         * @returns {boolean}
         */
        function handleSubmit(event)
        {
            var invalid = false;
            $(passwordFields).each(function (position, element) {
                if (!checkPassword(element.original, element.confirmation)) {
                    $('div:first-child', element.original.parents('div.groupExp')).addClass('exp');
                    invalid = true;
                }
            });

            if (invalid) {
                event.stopPropagation();
                return false;
            }
        }

        /**
         * Hides original password, sets value to confirmation password and shows original password on event.
         * @param password
         * @param passwordConfirm
         */
        function hidePassword(password, passwordConfirm)
        {
            passwordConfirm.prop('value', '*****');
            password.hide().prop('disabled', true);

            passwordConfirm.bind("change paste keyup", function () {
                if (!password.is(":visible")) {
                    password.show().prop('disabled', false);
                }
            })
        }

        /**
         * Checks whether passwords matches.
         * @param original
         * @param confirm
         * @returns {boolean}
         */
        function checkPassword(original, confirm)
        {
            var result = true;
            if (original.prop('disabled') == false && original.prop('value') != confirm.prop('value')) {
                if (original.errorBox == undefined) {
                    original.errorBox = $('<div class="errorbox"></div>').text(original.data('errormessage'));
                    original.after(original.errorBox);
                } else {
                    original.errorBox.show();
                }
                result = false;
            } else if (original.errorBox != undefined) {
                original.errorBox.hide();
            }

            return result;
        }

        return obj;
    })();

    $.widget("ui.oxModuleConfiguration", oxModuleConfiguration);

} )(jQuery);
