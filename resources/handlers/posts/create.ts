import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";
import { json } from "stream/consumers";
import { IPost } from "../../../type";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamodb=new DynamoDB({});

export async function createPost(body:string | null) {
 const uuid= randomUUID();
 if(!body){
    return{
        statuscode:400,
        body:JSON.stringify({message:"body"})

    }
 } 
 
 const bodyparsed =JSON.parse(body) as IPost

 // create the post 
 await dynamodb.send(
    new PutCommand({
        TableName:"LearnLambdaStack-MyDBTable428EC0B9-114VXDWRKO3NS", 
        Item:{
            pk:`POST#${uuid}`,
            ... bodyparsed
        },
    })
 );

 return {
    statusCode:200,
    headers: {
        "Content-Type": "application/json",
      },
    body:JSON.stringify({message:" Data Created Sucessfully"})
 }
}