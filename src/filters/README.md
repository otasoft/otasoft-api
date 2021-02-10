# Filters

Global Nest.js filters that can be used across the application. Currently implemented:

- ErrorFilter -> used for validating server errors in the application

This directory contains:

- ErrorFilter
- `enums` directory with error-code enum for storing specific error codes and index.ts exporting that file
- `helpers` directory with validate-server-error method  and index.ts exporting that file
- `interfaces` directory with error-object interface and index.ts exporting that file
- index.ts exporting filers
