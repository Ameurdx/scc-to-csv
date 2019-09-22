'use strict';

//get the command line arguments
const args = process.argv.slice(2);

const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: args[1],
    header: [
      {id: 'instanceName', title: 'Instance Name'},
      {id: 'project', title: 'Project'},
      {id: 'disksCount', title: 'Disks Count'},
      {id: 'OS', title: 'OSs'},
    ]
  });

fs.readFile(args[0], (err, data) => {
    if (err) throw err;
    let records = JSON.parse(data);

    const dataOutput = [];

    // for each element in the json file
    records.forEach(element => {
        if(element.asset.securityCenterProperties.resourceType == 'google.compute.Instance' ) {
            let diskInfo = JSON.parse(element.asset.resourceProperties.disks);

            let SOs = '';

            //scan every disk
            for (let i = 0; i < diskInfo.length; i++) {
                if(diskInfo[i].licenses != undefined) {
                    // for every disk scan every license
                    for (let j = 0; j < diskInfo[i].licenses.length; j++) {
                        const license = diskInfo[i].licenses[j];
                        SOs = SOs + license.split('/').pop() + ' ';
                    }
                }
            }

            // write the data into an entry of the csv file
            const item = {
                instanceName: element.asset.resourceProperties.name,
                project: element.asset.securityCenterProperties.resourceProject.split('/').pop(),
                disksCount: diskInfo.length,
                OS: SOs
            }
            dataOutput.push(item);
        }
    });
    csvWriter
        .writeRecords(dataOutput)
        .then(()=> console.log('The CSV file was written successfully'));

    //console.log(records);
});
