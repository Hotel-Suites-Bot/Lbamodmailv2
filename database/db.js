const { QuickDB }=
require("quick.db");

const db=
new QuickDB({

filePath:
"database.sqlite"

});

module.exports=db;
