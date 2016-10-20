# Structure

## specific

These are the modules representing the main frontend features for this application.

Specific modules will be able to see common modules and sometimes each other, but not the application module, which is talked about later.

## common

Common modules are so small and basic that they could be reused anywhere in the application, or possibly another application.

Common module components do not have any visibility of specific modules. Some of them might be able to see other common modules.

## specific/application

It's important to understand the difference between features that could appear anywhere and features that will appear everywhere.

Where the common features can appear anywhere in the application, the application module contains features which *are* the application.

Stylesheets which appear on *all* pages, the angular module referred to in the html tag, the base routing and the go-to 404 page would go here.

This module should be minimally popoulated. Not all features appear across the whole application.
