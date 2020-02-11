import readline from 'readline';
import fs from 'fs';

let stringMsg = 'There is no duplicate value present'; 
const readFromTerminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

	readFromTerminal.question(`Select the type data \n
Select 1 for data is a Object in exported in JS file \n
Select 2 for data which is JSON Object in JSON file \n
Select 1 or 2 : `, async (selectedNo) => {
	if (selectedNo === '1') getDataForObj();
	else if (selectedNo === '2') getJSONData();
	else console.log('Please enter correct value')
});

const getDataForObj = () => {
	readFromTerminal.question(`\n
Enter the File Absolute Path : `, async (filePath) => {
		console.log(`\nEntired file path is ---- : ${filePath}!`);
		readFromTerminal.question(`\nEnter Main Key of object in which u need to find that has duplicate : `, async (key) => {
			console.log(`\n Enter Main Key ---:  ${key}!`)
			var fileData = await require(filePath);
			if (fileData) {
				const data = (fileData.default && fileData.default[key]) || fileData[key]
				if (data) {
					checkDuplicateData(data)
				} else {
					console.log('Please enter the correct Key');
				}
			} else {
				console.log('Please enter the correct file path')
			}
		});
	});
}

const getJSONData = () => {
	readFromTerminal.question(`Enter the JSON File Absolute Path : `, async (filePath) => {
		console.log(`\nEntired file path is ---- : ${filePath}`)
		let parsedData = '';
		fs.readFile(filePath, (err, data) => {
			try {
				parsedData = JSON.parse(data);
				checkDuplicateData(parsedData);
			} catch(err) {
				console.log('Please enter the valid path or check whether it is a proper JSON file')
			}
		});
	});
}


  const checkDuplicateData = (data) => {
		  
      const dataKeys = Object.keys(data);
			const dataObj = Object.assign({}, data);
			let msg = '';
			let serialNo = 0;
      dataKeys.forEach((eachKey) => {
				const value = dataObj[eachKey];
				const duplicateKeys = dataKeys.filter((objkey) => {

					if (dataObj[objkey] && 
						dataObj[objkey].toLowerCase().localeCompare(value && value.toLowerCase()) === 0) {
						delete dataObj[objkey];
						return delete dataObj[objkey];
					}
				});
				if (duplicateKeys.length > 1){
					serialNo += 1;
					msg += `${serialNo}. The value - "${value}" has ${duplicateKeys.length} duplicateKeys ${
						duplicateKeys.map((eachDuplicateKey,i) => `\n   ${i+1}. ${eachDuplicateKey}`)} \n\n`;
				}
			});
			
			console.log(`\nThe Results ============== \n\n ${msg || stringMsg}`)
			console.log(`\nTOTAL NUMBER OF DUPLICATE KEY FOR THE VALUE ${serialNo}`)
  }
