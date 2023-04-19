var figlet = require("figlet");

figlet("Why?", function(err, data){
    if(err){
        console.log("somthin went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
})