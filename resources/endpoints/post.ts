import { APIGatewayProxyEvent } from "aws-lambda";
import { getone } from '../handlers/posts/get-one';
import { deletePost } from '../handlers/posts/delete';
export const handler = async (event: APIGatewayProxyEvent) => {
    const id = event.pathParameters?.id;

    if (!(id)) {
        return {
            StatusCode: 400,
            body: JSON.stringify({ message: "Missing Path Parameters " })
        }
    }
    try {
        //Handle Different HTTpMethods
        switch (event.httpMethod) {
            case 'GET':
                return await getone({ id });
            case "DELETE":
                return await deletePost({ id });
            default:
                return {

                    StatusCode: 400,
                    body: JSON.stringify({ message: "Invalid Http Method!" })
                }

        }
    }catch(error )
    {
        console.log("Error");

        return{
            statusCode:500,
            body:JSON.stringify({message:"Internal  Code issue Please try  again! "})
        }
    }
}