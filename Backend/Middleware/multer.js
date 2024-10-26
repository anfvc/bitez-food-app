import multer from "multer";
//Image storage Engine:

//* Code for production:
// let storage;

// if (process.env.NODE_ENV === "DEVELOPMENT") {
//   storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, "client/public");
//     },
//     filename: (req, file, callback) => {
//       return callback(null, `${Date.now()} ${file.originalname}`); //Filename is unique with Date.now()
//     },
//     limits: { fileSize: 150000 }, // 150kb
//   });
// } else {
//   storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, "client/dist");
//     },
//     filename: (req, file, callback) => {
//       return callback(null, `${Date.now()} ${file.originalname}`); //Filename is unique with Date.now()
//     },
//     limits: { fileSize: 150000 }, // 150kb
//   });
// }

// ? Code for development:

const storage = multer.diskStorage({
  destination: "Uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()} ${file.originalname}`); //Filename is unique with Date.now()
  },
});

const upload = multer({ storage: storage });

export default upload;
