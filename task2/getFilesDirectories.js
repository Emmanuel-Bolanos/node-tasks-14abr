const path = require('path');
const fs = require('fs').promises;

let filesDirectories = [];
let nfolders = 1;
let nFiles = 0;

const getFilesDirectories = async (dir) => {
  const files = await fs.readdir(dir);

  if (files.length > 0) {

    for (const file of files) {
      const fileDir = path.join(dir, file);
      const stat = await fs.lstat(fileDir);

      if (stat.isDirectory()) {
        nfolders++;
        nFiles--;
        // get the files inside the directory
        await getFilesDirectories(fileDir);
      }

      // add the directories to the list
      // ignore those that are already included
      if (!filesDirectories.includes(fileDir)) filesDirectories.push(fileDir);
      nFiles++;
    }

  }

  // add the directories to the list
  filesDirectories.push(dir);
  return [filesDirectories, nfolders, nFiles];
  }

module.exports = getFilesDirectories;
