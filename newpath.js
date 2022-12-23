const fs = require("fs");

const path = "D:/imagesfolder";

fs.access(path, (error) => {
 
  if (error) {
    fs.mkdir(path, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  } else {
    console.log("Given Directory already exists !!");
  }
});
