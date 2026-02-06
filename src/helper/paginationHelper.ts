type PaginationOptions ={
    page?:number | string,
    limit ?: number | string,

}
type PaginationOptionsResult ={
    page ?:number,
    limit?:number,
    skip?:number
}
export const   paginationHelper=(options :PaginationOptions):PaginationOptionsResult=>{
    //  console.log(options);

    const page :number =Number(options.page  )|| 1;
    const limit :number=Number(options.limit) || 10
    const skip:number= (page-1) * limit

console.log(options);

     return {
        page,
        limit,skip
     }
     
}