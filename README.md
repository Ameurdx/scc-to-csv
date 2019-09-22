# Google Cloud Security Command Center to CSV
Google Cloud Security Command Center script to convert the output of the assets export functionality into a CSV file


## Instalation:
Clone this repo and install it.
> npm install

## Usage:
First you need to extract your asset inventory in Google Cloud Security Command Center. Don't use any grouping.
> node index.js <INPUT.JSON> <OUTPUT.CSV>

## Example:
> node index.js test.json out.csv

## TODOs:
I will update it to get the json file directly from the SCC API. https://cloud.google.com/security-command-center/docs/reference/rest/

