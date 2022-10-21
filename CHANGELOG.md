# Change Log for OXID twig admin theme

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.1.1] - Unreleased

### Fixed
- Admin navigation frame access with top.navigation is broken for chrome. 

## [1.1.0] - 2022-09-08

### Renamed
- Changed price alert to wished price

### Deprecated
- Language Constants:
    - `SHOP_CONFIG_STORECREDITCARDINFO`
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
- Fix wrongly converted {% hasrights %} tags
- Port changes from main admin theme

## [1.0.0] - 2019-11-21

[1.1.1]: https://github.com/OXID-eSales/twig-admin-theme/compare/v1.1.0...b-6.5.x
[1.1.0]: https://github.com/OXID-eSales/twig-admin-theme/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/OXID-eSales/twig-admin-theme/releases/tag/v1.0.0
