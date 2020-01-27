require('dotenv').config()
const xlsx = require('node-xlsx').default;
const AWS = require("aws-sdk");

// parse the xlsx
const workSheetsFromFile = xlsx.parse('./stocks-closing-prices(2020-01-27)_el.xlsx');
const data = workSheetsFromFile[0].data
data.shift(); // remove header
const parseDate = data[10][1]
// https://github.com/mgcrea/node-xlsx/issues/17#issuecomment-549671821
const fixedDate = new Date ((parseDate - 25567 - 2) * 86400 * 1000);
console.log(fixedDate);
data.forEach(stock => {
    console.log({
        symbol: `stock#ase#${stock[0]}`,
        date: new Date ((stock[1] - 25567 - 2) * 86400 * 1000),
        datetime: new Date ((stock[1] - 25567 - 2) * 86400 * 1000).getTime(),
        close: stock[2],
        volume: stock[4],
        high: stock[5],
        low: stock[6],
        revenue: stock[7],
        trades: stock[8],
        open: stock[9]
    })
});
console.log(`Number of stocks: ${data.length}`);

// store the data in dynamodb
const config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: '2012-08-10'
}

const docClient = new AWS.DynamoDB.DocumentClient(config);

Promise.all(
    data.map(stock => {
        const item = {
            symbol: `stock#ase#${stock[0]}`,
            datetime: new Date ((stock[1] - 25567 - 2) * 86400 * 1000).getTime(),
            close: stock[2],
            volume: stock[4],
            high: stock[5],
            low: stock[6],
            revenue: stock[7],
            trades: stock[8],
            open: stock[9]
        }
        var params = {
            TableName: "Ticker",
            Item: item
        };

        return docClient.put(params).promise();
    })
).then(result => {
    console.log('All data were processed');
}).catch((err) => {
  console.log('err: ' + err);
});
