for DB in $(psql -t -c "SELECT datname FROM pg_database WHERE datname NOT IN ('postgres', 'template0', 'template1')"); do
  psql -d $DB -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
done
