# Change Log for OXID Twig admin theme

## v2.2.0 - unreleased

### Changed
- Remove usages of smarty_cycle() from templates

### Removed
- Private Sales Invite functionality is outdated.

## v2.1.0 - 2023-05-08

### Added
- Manufacturer sort field

### Removed
- Deprecated language constants

### Fixed
- Error during Generic Export
- No static SEO URLs shown for languages after selection

## v2.0.1 - 2022-11-23

### Fixed
- Wrong characters shown in module class sort list
- Do not escape the module description and author

## v2.0.0 - 2022-10-28

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
- Language Constants: `SHOP_CONFIG_STORECREDITCARDINFO`, `HELP_SHOP_CONFIG_ATTENTION`, `NAVIGATION_NEWVERSIONAVAILABLE`
- Suggest (Recommend Product) feature
- News feature
- Management of Newsletter emails templates and language constants
- block `admin_shop_rdfa_submiturl` in `tpl/shop_rdfa.html.twig`

## v1.1.1 - Unreleased

### Fixed
- Admin navigation frame access with top.navigation is broken for chrome. 

## v1.1.0 - 2022-09-08

### Renamed
- Changed price alert to wished price

### Deprecated
- Language Constants `SHOP_CONFIG_STORECREDITCARDINFO`, `HELP_SHOP_CONFIG_ATTENTION`, `TOOLTIPS_NEWNEWS`, `NAVIGATION_NEWVERSIONAVAILABLE`
- Management of Newsletter emails language constants

### Fixed
- Fix textareas with arrays display and saving bug [PR-2](https://github.com/OXID-eSales/twig-admin-theme/pull/2)
- Fix wrongly converted {% hasrights %} tags
- Port changes from main admin theme

## v1.0.0 - 2019-11-21
