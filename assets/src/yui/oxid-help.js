// http://developer.yahoo.com/yui/articles/hosting/?container&dragdrop&utilities&MIN&nocombine&norollup&basepath&[{$shop->basetpldir}]yui/build/

YAHOO.namespace('YAHOO.oxid');

// --------------------------------------------------------------------------------

YAHOO.oxid.help = {
    helpBtntId: '',
    helpTextBody: '',
    helpTextPanel: null,

    /*
     * Show help panel
     */
    showPanel: function (helpId) {
        'use strict';

        var helpBtnIdPrefix   = "helpBtn_";
        var helpTextIdPrefix = "helpText_";

        this.helpBtntId   = helpBtnIdPrefix + helpId;
        this.helpTextBody = document.getElementById(helpTextIdPrefix + helpId).innerHTML;

        if ( !this.helpTextPanel ) {
            this.helpTextPanel = new YAHOO.widget.Panel("helpPanel");

            //setting general panel properties
            this.setTextPanelProperties();
        }

        // setting panel position next to help button
        this.helpTextPanel.cfg.setProperty("context", [this.helpBtntId, "tl", "tr"]);
        this.helpTextPanel.cfg.setProperty("constraintoviewport", true);

        this.helpTextPanel.setBody(this.helpTextBody);
        this.helpTextPanel.render("helpTextContainer");
        this.helpTextPanel.show();
    },

    /*
     * Set general panel properties
     */
    setTextPanelProperties: function () {
        'use strict';

        this.helpTextPanel.cfg.setProperty("width", "370px");
        this.helpTextPanel.cfg.setProperty("visible", false);
        this.helpTextPanel.cfg.setProperty("draggable", true);
    }
};

