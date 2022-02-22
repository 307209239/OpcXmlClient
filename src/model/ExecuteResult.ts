export class ExecuteResult{
   constructor(status?:boolean,message?:string|null){
      if(status!=undefined)
      this.Status=status
      if(message!=undefined)
      this.Message=message
   }
   public  Status:boolean =false
   public  Message:string|null=null
   public  Data:any
}