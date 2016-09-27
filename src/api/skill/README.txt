Start the patterns here:

We no longer expose classes. We deal in factories.

The factories will consist of the following:
- node, which stores the hardcoded configurations and levels

There will be a db service which does the following:
- load: fetches the player skills into nodes.
- save: writes the player skills into the database.
- manages the schema
