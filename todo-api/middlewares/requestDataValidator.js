 const {dateTimeValidator} = require('./dateTimeValidator')


exports.requestDataValidator=(req,res,next)=>{

      const body = req.body

      //// title description completed priority dueDate

      //// check Title
      const title = body.title;

      if(title == null || title == undefined || typeof (title)== 'undefined') return res.status(400).json({
            success :'Failed',message:'Title is Required!'
      })
      if(title.length <6 || title.length > 100) return res.status(400).json({
        success: "Failed",
        message: "Title length must be min:6 to max:100 characters long",
      });

      //// check description
      const description = body.description;
      
      if(description == null || description == undefined ||typeof( description) == 'undefined' ) {
            req.body.description = ''
      }
      if (description.length > 500)
        return res.status(400).json({
          success: "Failed",
          message: "Description is too long Max 500 words.",
        });

      //// check completed 

      const completed = body.completed;
      if(completed == null ||  typeof(completed) == 'undefined') {
            req.body.completed = false
      }else{
            const toggle = [0, 1, "true", "false", "True", "False"];
            if (!toggle.includes(completed))
              return res.status(400).json({
                success: "Failed",
                message: "completed must be 0/1 or true/false only",
              });
      }
      

      //// check priority 
      const priority = body.priority
      if (
        priority == null ||
        priority == undefined ||
        typeof priority == 'undefined'
      ) {
        req.body.priority = "medium";
      }else{
            const allowedPriorities = [
              "low",
              "medium",
              "high",
              "Low",
              "medium",
              "High",
            ];
            if (!allowedPriorities.includes(priority))
              return res.status(400).json({
                success: "Failed",
                message: "Allowed values are 'low' 'medium' 'high' only.",
              });
      }
      

      ///// check for due date
       dateTimeValidator(req,res,next);

      // next();
}