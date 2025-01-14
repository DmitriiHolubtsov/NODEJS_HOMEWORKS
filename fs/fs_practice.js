const fs = require("fs");

// Read
fs.readFile("./readme.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    console.log("Content of readme.txt:", data);

    // Write
    fs.writeFile("./result.txt", "This is the result file.", (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File written successfully.");

        // Check file
        if (fs.existsSync("./result.txt")) {
          console.log("File result.txt exists.");
        } else {
          console.log("File result.txt does not exist.");
        }
      }
    });
  }
});

// Dirs
const folderName = "./testFolder";

if (!fs.existsSync(folderName)) {
  fs.mkdir(folderName, (err) => {
    if (err) {
      console.error("Error creating folder:", err);
    } else {
      console.log("Folder created successfully.");
    }
  });
} else {
  console.log("Folder already exists.");
}
