import fs from "fs";
const deleteFile = (filePath) => {
    fs.unlink(filePath, (error) => {
        if(error) throw(error);
    });
}
export default deleteFile;