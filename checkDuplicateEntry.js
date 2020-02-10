import readline from 'readline';

let stringMsg = 'There is no duplicate value present'; 
const readFromTerminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

readFromTerminal.question(`Enter the File Absolute Path : `, async (filePath) => {
    console.log(`\nEntired file path is ---- : ${filePath}!`)
    readFromTerminal.question(`\nEnter Main Key of object in which u need to find that has duplicate : `, async (key) => {
        console.log(`\n Enter Main Key ---:  ${key}!`)
				var fileData = await require(filePath);
				checkDuplicateData(fileData.default[key])
		});
  });

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
			
			console.log(`\nThe Results ============== \n ${msg || stringMsg}`)
			console.log(`\nTOTAL NUMBER OF DUPLICATE KEY FOR THE VALUE ${serialNo}`)
  }
