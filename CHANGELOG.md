# Change Log for OXID Twig admin theme

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [v2.2.0] - unreleased

### Changed
- Remove usages of smarty_cycle() from templates

## [v2.1.0] - 2023-05-08

### Added
- Manufacturer sort field

### Removed
- Deprecated language constants

### Fixed
- Error during Generic Export
- No static SEO URLs shown for languages after selection

## [v2.0.1] - 2022-11-23

### Fixed
- Wrong characters shown in module class sort list
- Do not escape the module description and author

## [v2.0.0] - 2022-10-28

### Added
- Functionality to export newsletter recipients
- Support for PHP v8

### Changed
- Switched to Twig v3

### Fixed
- Increased the size of smtp password input field [CE-PR-898](https://github.com/OXID-eSales/oxideshop_ce/pull/898)
- Admin navigation frame access with top.navigation is broken for chrome.

### Removed
- Support for PHP v7
- RSS functionality
- Language Constants:
    - `SHOP_CONFIG_STORECREDITCARDINFO`
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
- block `admin_shop_rdfa_submiturl` in `tpl/shop_rdfa.html.twig`

## [v1.1.1] - Unreleased

### Fixed
- Admin navigation frame access with top.navigation is broken for chrome. 

## [v1.1.0] - 2022-09-08

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

## [v1.0.0] - 2019-11-21

[v2.1.0]: https://github.com/OXID-eSales/twig-admin-theme/compare/v2.0.1...v2.1.0
[v2.0.1]: https://github.com/OXID-eSales/twig-admin-theme/compare/v2.0.0...v2.0.1
[v2.0.0]: https://github.com/OXID-eSales/twig-admin-theme/compare/v1.1.0...v2.0.0
[v1.1.0]: https://github.com/OXID-eSales/twig-admin-theme/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/OXID-eSales/twig-admin-theme/releases/tag/v1.0.0
