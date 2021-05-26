# Change Log for OXID twig admin theme

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.0] Unreleased

### Added
- Functionality to export newsletter recipients

### Removed
- Language Constants:
    - `SHOP_CONFIG_STORECREDITCARDINFO`
    - `PAYMENT_RDFA_CREDITCARD`
    - `PAYMENT_RDFA_AMERICANEXPRESS`
    - `PAYMENT_RDFA_DINERSCLUB`
    - `PAYMENT_RDFA_DISCOVER`
    - `PAYMENT_RDFA_JCB`
    - `PAYMENT_RDFA_MASTERCARD`
    - `PAYMENT_RDFA_VISA`
    - `HELP_SHOP_CONFIG_ATTENTION`
    - `NAVIGATION_NEWVERSIONAVAILABLE`
- Suggest (Recommend Product) feature:
    - Usage in: `shop_config.html.twigl`
    - Language Constants: 
        - `SHOP_CONFIG_ALLOW_SUGGEST_ARTICLE`
        - `HELP_SHOP_CONFIG_ALLOW_SUGGEST_ARTICLE`
- News feature
- Management of Newsletter emails:
  - Templates
  - Language constants
    - `NEWSLETTER_DONE_NEWSSEND`
    - `NEWSLETTER_DONE_GOTONEWSLETTE`
    - `NEWSLETTER_DONE_TITLE`
    - `NEWSLETTER_SUBJECT`
    - `NEWSLETTER_MAIN_MODEL`
    - `NEWSLETTER_PLAIN_TEXT`
    - `NEWSLETTER_PREVIEW_PLAINTEXT`
    - `NEWSLETTER_PREVIEW_HTML`
    - `NEWSLETTER_SELECTION_SELMAILRESAVER`
    - `NEWSLETTER_SELECTION_SENDNEWS`
    - `NEWSLETTER_SELECTION_USEDGROUP`
    - `NEWSLETTER_SEND_TITLE`
    - `NEWSLETTER_SEND_SEND1`
    - `NEWSLETTER_SEND_SEND2`
    - `TOOLTIPS_NEWNEWSLETTER`
    - `tbclnewsletter_plain`
    - `tbclnewsletter_preview`
    - `tbclnewsletter_selection`
        
## [1.0.1] Unreleased

### Renamed
- Changed price alert to wished price

### Deprecated
- Language Constants:
    - `SHOP_CONFIG_STORECREDITCARDINFO`
    - `PAYMENT_RDFA_CREDITCARD`
    - `PAYMENT_RDFA_AMERICANEXPRESS`
    - `PAYMENT_RDFA_DINERSCLUB`
    - `PAYMENT_RDFA_DISCOVER`
    - `PAYMENT_RDFA_JCB`
    - `PAYMENT_RDFA_MASTERCARD`
    - `PAYMENT_RDFA_VISA`
    - `HELP_SHOP_CONFIG_ATTENTION`
    - `TOOLTIPS_NEWNEWS`
    - `NAVIGATION_NEWVERSIONAVAILABLE`
- Management of Newsletter emails:
  - Language constants
    - `NEWSLETTER_DONE_NEWSSEND`
    - `NEWSLETTER_DONE_GOTONEWSLETTE`
    - `NEWSLETTER_DONE_TITLE`
    - `NEWSLETTER_SUBJECT`
    - `NEWSLETTER_MAIN_MODEL`
    - `NEWSLETTER_PLAIN_TEXT`
    - `NEWSLETTER_PREVIEW_PLAINTEXT`
    - `NEWSLETTER_PREVIEW_HTML`
    - `NEWSLETTER_SELECTION_SELMAILRESAVER`
    - `NEWSLETTER_SELECTION_SENDNEWS`
    - `NEWSLETTER_SELECTION_USEDGROUP`
    - `NEWSLETTER_SEND_TITLE`
    - `NEWSLETTER_SEND_SEND1`
    - `NEWSLETTER_SEND_SEND2`
    - `TOOLTIPS_NEWNEWSLETTER`
    - `tbclnewsletter_plain`
    - `tbclnewsletter_preview`
    - `tbclnewsletter_selection`

### Fixed
- Fix textareas with arrays display and saving bug [PR-2](https://github.com/OXID-eSales/twig-admin-theme/pull/2)

## [1.0.0] - 2019-11-21
