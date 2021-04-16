const readline = require('readline');


const confirmation = () => {
  let auth = false;
  const confirmationTxt = `The directory is not empty. Do you want to delete it and all of its contents?\n(yes): `;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => rl.question(confirmationTxt, answer => {
    if (answer.toLowerCase() === 'yes') {
      console.log('Deleting folder and its contents...');
      auth = true;
    } 
    else {
      console.log('Stopping operation...');
    }
    rl.close();
    resolve(auth);
  }));
}

module.exports = confirmation;
