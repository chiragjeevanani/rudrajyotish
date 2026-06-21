const fs = require('fs');
const path = require('path');

const target = "c:\\Users\\chira\\OneDrive\\Desktop\\Appzeto\\achyutam\\frontend\\src\\assets\\achyutam_logo.png";

try {
  if (fs.existsSync(target)) {
    fs.unlinkSync(target);
    console.log("SUCCESS: Logo deleted successfully!");
  } else {
    console.log("FILE DOES NOT EXIST");
  }
} catch (err) {
  console.error("ERROR deleting file:", err);
}
