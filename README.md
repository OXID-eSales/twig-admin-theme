# Twig admin theme

Admin theme based on the Twig engine.

## Installation

**Run the following command to install theme:**
```bash
composer require oxid-esales/twig-admin-theme
```

**(Only for PE) Install OXID eSales PE Twig component:**

If you are using Professional Edition, please install Twig component for OXID eShop Professional Edition:
```bash
composer require oxid-esales/twig-component-pe
```

**(Only for EE) Install OXID eSales EE Twig component:**

If you are using Enterprise Edition, please install Twig component for OXID eShop Enterprise Edition:
```bash
composer require oxid-esales/twig-component-ee
```

**Note:**

The shop reads the admin UI directly from this package in the `vendor` directory and links its `assets` directory to
`out/admin_twig`. Package and link name are configured with the following shop parameters:
```yaml
parameters:
  oxid_esales.admin_ui.package_name: 'oxid-esales/twig-admin-theme'
  oxid_esales.admin_ui.name: 'admin_twig'
```

## License

See LICENSE file for license details.

## Bugs and Issues

If you experience any bugs or issues, please report them in the section **OXID eShop (all versions)** under category **Twig engine** of https://bugs.oxid-esales.com
