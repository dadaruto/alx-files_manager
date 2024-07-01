// main.js
import dbClient from './utils/db';

const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;
    const repeatFct = async () => {
      await setTimeout(() => {
        i += 1;
        if (i >= 10) {
          reject();
        } else if (!dbClient.isAlive()) {
          repeatFct();
        } else {
          resolve();
        }
      }, 1000);
    };
    repeatFct();
  });
};

(async () => {
  console.log(dbClient.isAlive()); // false initially
  await waitConnection(); // Wait until connection is established
  console.log(dbClient.isAlive()); // true once connected
  console.log(await dbClient.nbUsers()); // Number of users
  console.log(await dbClient.nbFiles()); // Number of files
})();
