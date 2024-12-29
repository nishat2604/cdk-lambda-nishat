import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const deleteDynamoDB=new DynamoDB();

export async function deletePost({id}:{id:string}) {
    await deleteDynamoDB.send(
        new DeleteCommand({
            TableName:"LearnLambdaStack-MyDBTable428EC0B9-114VXDWRKO3NS",
            Key:{pk:`POST#${id}`},
        })
    );


    return {
        statusCode:200,
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({message:"Data had been  deleted sucessfully"})

    };
}