const fs = require('fs');
const path = require('path');

let dir1800Path = path.join(process.cwd(), '1800');
let dir2000Path = path.join(process.cwd(), '2000');

const moveFiles = (oldDir, newDir, data) => {
    fs.rename(path.join(oldDir, data), path.join(newDir, data), err1 => {
            if (err1) {
                console.log(err1)
            }
        }
    )
}

const copyFiles = (oldDir, newdir) => {
    fs.readdir(oldDir, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file =>
                moveFiles(oldDir, newdir, file))
        }

    })

}
copyFiles(dir1800Path, dir2000Path)
copyFiles(dir2000Path, dir1800Path)


