/*
 * List the elements in a dir
 * 1. App will show a list of elements in a dir
 * 2. If dir is not specified, display cwd
 * 3. If given dir does not exist, show err
 * 4. If element is a dir, add a / at the end
 */

const fs = require('fs').promises;
const path = require('path');

const dir = process.argv[2] || process.cwd();

async function showFiles(dir) {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const fileDir = path.join(dir, file);
      const stat = await fs.lstat(fileDir);
      stat.isDirectory() ? console.log(`${file}/`) : console.log(file);
    }
  }
  catch(err) {
    console.log(err.message);
  }
};

showFiles(dir).catch(err => console.log(err.message));
