#!/bin/sh

# Run database migrations
npx prisma generate
npx prisma migrate deploy

# Run the main container command
exec "$@"
