#!/bin/sh

# Run database migrations
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# Run the main container command
exec "$@"
