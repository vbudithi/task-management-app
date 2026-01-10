export const capitalizeFirst=(str:String)=>
    str? str.charAt(0).toUpperCase()+str.slice(1).toLowerCase():"";