const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  'GET': {
    '/': htmlHandler.getIndex,
    '/updateUser': jsonHandler.updateUser,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    notFound: jsonHandler.notFound,
  },
  'HEAD': {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFound,
  },
}

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.log(request.method);
  console.log(parsedUrl.pathname);

  /*
  if(urlStruct[parsedUrl.pathname]){
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
  */
  if (!urlStruct[request.method]) {
    return urlStruct['HEAD'].notFound(request, response);
  }

  if(urlStruct[request.method][parsedUrl.pathname]){
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
