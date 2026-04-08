# Change Log for OXID Twig admin theme

## v3.1.0 - 2026-04-08

### Added
- New translation for the HTML Sanitizer warning

### Fixed
- Fixed menu item counter for vendor-specific menu sections [PR-10](https://github.com/OXID-eSales/twig-admin-theme/pull/10)
- Fixed wrong product picture counter showing 13 instead of 12 [PR-14](https://github.com/OXID-eSales/twig-admin-theme/pull/14)
- Improved discount quantity help text to clarify display behavior based on "From" value [#0007907](https://bugs.oxid-esales.com/view.php?id=7907) [PR-15](https://github.com/OXID-eSales/twig-admin-theme/pull/15)

## v3.0.1 - 2025-11-10

### Fixed
- Fixed popup window for assigning categories to attribute.

## v3.0.0 - 2025-10-13

### Changed
- Missing VAT number prefix input in country form [#0007205](https://bugs.oxid-esales.com/view.php?id=7205)

### Removed
- Remove opt-out for sending shop information
- Remove YUI library usage
- Obsolete dynscreen_local.xml file
- "negative" from german translations of `SKIPDISCOUNTS` constants

### Fixed
- Product attribute link "Create Attribute in new window" to be opened in same window [#0005798](https://bugs.oxid-esales.com/view.php?id=5798)
- Clarified description and help text for voucher calculate once option [PR-12](https://github.com/OXID-eSales/twig-admin-theme/pull/12)
- Fixed unclear translations  [PR-13](https://github.com/OXID-eSales/twig-admin-theme/pull/13)
