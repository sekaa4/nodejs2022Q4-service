#!/bin/sh

# Run database migrations
npx prisma migrate dev --preview-feature --name initial

# Run the main container command
exec "$@"
