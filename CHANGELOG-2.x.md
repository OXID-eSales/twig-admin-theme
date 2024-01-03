# Change Log for OXID Twig admin theme

## v2.5.0 - unreleased

### Added
- Ability to define a custom low stock message for individual products

## v2.4.0 - 2024-03-18

### Fixed
- Fix German translation of Parent theme not found case error [#0006195](https://bugs.oxid-esales.com/view.php?id=6195) [PR-7](https://github.com/OXID-eSales/twig-admin-theme/pull/7)

### Changed
- New Icons for time activated products

### Deprecated
- Private Sales Invite functionality is outdated.

## v2.3.0 - 2024-03-11

### Changed
- jQuery and jQueryUI were updated to the current versions

## v2.2.0 - 2023-11-16

### Changed
- Remove usages of smarty_cycle() from templates

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
