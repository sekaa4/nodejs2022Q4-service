#!/bin/sh

# Run database migrations
npx prisma generate
npx prisma migrate dev --preview-feature --name postgres

# Run the main container command
exec "$@"
