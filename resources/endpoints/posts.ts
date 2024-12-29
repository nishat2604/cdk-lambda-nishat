import { APIGatewayEvent } from "aws-lambda";
import { getAll } from '../handlers/posts/getall';
import { createPost } from '../handlers/posts/create';
export const handler = async (event: APIGatewayEvent)=>{
    try {
        switch (event.httpMethod) {
            case "GET":
                return await getAll();
            case "POST":
                return await createPost(event.body);
            default:
                return {

                    statusCode: 400,
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify({ message: "Invalid HTTPmethod" })
                }
        }

    } catch (error) {
        console.log(error);
        return{
            statusCode: 500,
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ message: error }),
        }
    }

}