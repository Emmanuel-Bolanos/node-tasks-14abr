/*
* Remove a specific directory
* 1. If dir does not exist, show err
* 2. If dir not empty, ask usr confirmation
* 3. If usr confirms: rm all files and directories
* 4. Display # of files or dirs removed
*/

const recursiveConfirmation = require('./confirmation');
const getFilesDirectories = require('./getFilesDirectories');
const fs = require('fs').promises;

const rootDirectory = process.argv[2];

async function removeDirectories(directories) {
  for (dir of directories) {
    const stat = await fs.lstat(dir);
    stat.isDirectory() ? await fs.rmdir(dir) : await fs.rm(dir);
  }
}

if (rootDirectory) {
  (async () => {
    try {
      const directoriesInformation = await getFilesDirectories(rootDirectory);

      const directories = directoriesInformation[0];
      const nFolders = directoriesInformation[1];
      const nFiles = directoriesInformation[2];

      if (nFolders > 1) {
        const usrAuth = await recursiveConfirmation();
        if (!usrAuth) return;
        
        await removeDirectories(directories);
        console.log(`Done\nRemoved ${nFolders} directories, ${nFiles} files`);
      }
      else {
        await removeDirectories(directories);
        console.log(`Done\nRemoved ${nFolders} directory`);
      }
    }
    catch(err) {
      console.log(err.message);
    }
  })()
}
else {
  console.log('No directory provided!');
}
