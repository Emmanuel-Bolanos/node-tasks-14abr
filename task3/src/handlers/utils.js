const fs = require('fs');
const path = require('path');
const os = require('os');

const readFile = (location) => {
  try {
    let file = fs.readFileSync(location, 'utf8');
    file = JSON.parse(file);
    return file;
  } catch (err) {
    return { books: [] };
  }
};

const getBooks = (req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/html',
  });

  const bookList = readFile('./task3/src/public/books.txt');

  const parsedBookList = (bookList.books).map((val) => `<li> ${val.title}: ${val.description} </li>`).join(' ');

  res.write(`<h2> Books list </h2>\n<ul> ${parsedBookList} </ul>`);

  res.end();
};

const patchBooks = (req, res) => {
  // read the usr data
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    // parse the json data
    try {
      data = JSON.parse(data);
      res.writeHead(200, {
        'Content-type': 'text/html',
      });
    } catch (err) {
      res.writeHead(400, {
        'Content-type': 'text/html',
      });
      res.end('<h1> ERROR 400: BAD REQUEST</h1><p>Data must be a valid JSON!</p>');
      return;
    }

    // read the txt current data
    const bookList = readFile('./task3/src/public/books.txt');

    const updatedBookList = JSON.stringify({
      books: bookList.books.concat(data),
    });

    fs.writeFileSync('./task3/src/public/books.txt', updatedBookList, 'utf8');
    res.end('Data added successfully');
  });
};

const clearBooks = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    // if user sends data communicate that is not allowed
    if (data) {
      res.writeHead(501);
      res.end('<h1> ERROR 501: NOT IMPLEMENTED</h1><p>Use patch to add more books</p>');
      return;
    }
    // clear file content
    try {
      fs.writeFileSync('./task3/src/public/books.txt', '');
      res.writeHead(204);
      res.end();
    } catch (err) {
      res.writeHead(500, {
        'Content-type': 'text/html',
      });
      res.end('<h1> ERROR 500: INTERNAL SERVER ERROR</h1>');
    }
  });
};

const showFiles = (req, res) => {
  const publicDir = path.join(process.cwd(), 'task3/src/public');
  try {
    const myURL = 'http://localhost:8080';
    const fullURL = new URL(req.url, myURL);
    const file = fullURL.searchParams.get('file');

    const fileDir = path.join(publicDir, file);

    if (fs.statSync(fileDir).isFile) {
      const content = fs.readFileSync(fileDir);
      res.writeHead(200, {
        'Content-type': 'text/html',
      });
      res.end(`<h2>Here is the content of ${file}:</h2> <p>${content}</p>`);
    } else {
      throw new Error('File not available');
    }
  } catch (err) {
    console.log(err);
    res.writeHead(400, {
      'Content-type': 'text/html',
    });
    res.end('<h1> ERROR 400: BAD REQUEST</h1><p>Query route is not valid!</p>');
  }
};

const serverStats = (req, res) => {
  try {
    const stats = {
      hostname: os.hostname(),
      cpus: os.cpus(),
      arch: os.arch(),
      uptime: os.uptime(),
      userInfo: os.userInfo('utf8'),
      freemem: os.freemem(),
    };

    res.end(JSON.stringify(stats));

    res.writeHead(200, {
      'Content-type': 'text/html',
    });
  } catch (err) {
    res.writeHead(500, {
      'Content-type': 'text/html',
    });
    res.end('<h1> ERROR 500: INTERNAL SERVER ERROR</h1>');
  }
};

module.exports = {
  getBooks,
  patchBooks,
  clearBooks,
  showFiles,
  serverStats,
};
