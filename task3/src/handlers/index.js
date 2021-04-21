const fs = require('fs');
const utils = require('./utils');

const notFound = (req, res) => {
  res.writeHead(404, {
    'Content-type': 'text/html',
  });
  const html = fs.readFileSync('./task3/src/public/404.html', 'utf8');
  res.write(html);
  res.end();
};

const notAllowed = (req, res) => {
  res.writeHead(405, {
    'Content-type': 'text/html',
  });
  const html = fs.readFileSync('./task3/src/public/405.html', 'utf8');
  res.write(html);
  res.end();
};

const home = (req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const html = fs.readFileSync('./task3/src/public/index.html', 'utf8');
    res.write(html);
    res.end();
  } else {
    notAllowed(req, res);
  }
};

const books = (req, res) => {
  if (req.method === 'GET') {
    utils.getBooks(req, res);
  } else if (req.method === 'PATCH') {
    utils.patchBooks(req, res);
  } else if (req.method === 'PUT') {
    utils.clearBooks(req, res);
  } else {
    notAllowed(req, res);
  }
};

const viewFiles = (req, res) => {
  if (req.method === 'GET') {
    utils.showFiles(req, res);
  } else {
    notAllowed(req, res);
  }
};

const serverStatus = (req, res) => {
  if (req.method === 'GET') {
    utils.serverStats(req, res);
  } else {
    notAllowed(req, res);
  }
};

module.exports = {
  home,
  notFound,
  books,
  viewFiles,
  serverStatus,
};
