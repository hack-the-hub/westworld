#!/bin/sh

set -x

cd scripts

echo "Running staging ingest"
bash ./load_data.sh stage
echo "Completed staging ingest"

echo "Running production ingest"
bash ./load_data.sh prod
echo "Completed production ingest"

cd ../

set +x
