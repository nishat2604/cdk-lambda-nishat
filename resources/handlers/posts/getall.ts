import { DynamoDB, ScanCommand } from "@aws-sdk/client-dynamodb";

const dynamodb= new DynamoDB();

export async function getAll() {
    const result =await dynamodb.send(
        new ScanCommand({
            TableName:"LearnLambdaStack-MyDBTable428EC0B9-114VXDWRKO3NS"
        })
    );

    return {
        statusCode:200,
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(result.Items),
    }

}