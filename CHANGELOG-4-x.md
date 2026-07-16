# Change Log for OXID Twig admin theme

## v8.0.0-alpha.3 - Unreleased
*Compilation release*

### Added
- Locale management page
- Alt attribute management for product images
- Locale dropdown in language form
- Hint for theme settings overridden by the environment configuration

### Changed
- Theme admin templates receive the theme data as separate variables instead of `oTheme`
- Theme settings form posts `settings[<name>]` instead of the `conf*` parameters

### Removed
- Deprecated parent theme error translations

### Fixed
- Saving of number settings on the theme settings page

## v8.0.0-alpha.2 - 2026-02-12
*Compilation release*

### Changed
- Product Pictures page layout with Unlimited image upload quota

## v3.0.0-alpha.1 - 2025-02-03

### Added
- Added translations for cache configuration

### Changed
- Replace date_format filter with Twig date filter
- Product media management page has been redesigned

### Removed
- Remove deprecated translations
