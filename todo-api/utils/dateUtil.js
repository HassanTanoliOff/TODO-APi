
 //// Add 7 days to current date 
exports.generateNewDueDate = ()=> new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
   