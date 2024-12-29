import { DynamoDB, ScanCommand } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const dynamodb=new DynamoDB();

export async function getone({id}:{id:string}) {
  const result = await dynamodb.send(
    new GetCommand({
        TableName:"LearnLambdaStack-MyDBTable428EC0B9-114VXDWRKO3NS",
        Key:{pk:`POST#${id}`},
    })
  ) ;
  
  return{

    statusCode:200,
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(result.Item)
  };
}