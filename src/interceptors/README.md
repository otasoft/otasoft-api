# Interceptors

Global Nest.js interceptors that can be used across the application. Currently implemented:

- TimeoutInterceptor -> used for droping requests that reach certain timeout
- ExcludeNullInterceptor -> used for excluding null values provided as parameters

This directory contains:

- TimeoutInterceptor
- ExcludeNullInterceptor
- `helpers` directory with recursivelyStripNullValues method
- index.ts exporting all interceptors
