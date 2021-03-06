const take = function (count, list) {
  return list.slice(0,count);
};

const last = function (count, list) {
  return list.slice(Math.max(list.length-count,0));
};

const fetchContent = function (delimiter, fetcher, count, content) {
  let result = content.toString().split(delimiter);
  result = fetcher( count, result);
  return result.join(delimiter);
};

const headLines = fetchContent.bind(null, "\n", take);

const headBytes = fetchContent.bind(null, "", take);

const tailLines = fetchContent.bind(null, "\n", last);

const tailBytes = fetchContent.bind(null, "", last);

const getContent = { head : { line : headLines, byte : headBytes },
                       tail : { line : tailLines, byte : tailBytes }
                     };

const getContents = function (utility, { option, count, files }, fs) {
  let filesData = files.map(function (fileName) {
    let fileDetails = {
      fileName: fileName,
      isExists: fs.existsSync(fileName),
    };
    if (fileDetails.isExists) {
      let fileContent = fs.readFileSync(fileName);
      let content = getContent[utility][option].bind(null, count, fileContent)();
      fileDetails.requiredFileContent = content;
    };
    return fileDetails;
  });
  return { utility, filesData};
};

const head = getContents.bind(null, "head");

const tail = getContents.bind(null, "tail");

module.exports = {
  take,
  last,
  headLines,
  headBytes,
  tailLines,
  tailBytes,
  head,
  tail,
};