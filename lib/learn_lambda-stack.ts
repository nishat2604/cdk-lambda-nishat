import * as cdk from 'aws-cdk-lib';
import { ApiKey, ApiKeySourceType, Cors, LambdaIntegration, RestApi, UsagePlan } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Handler } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LearnLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LearnLambdaQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    //1. Create Dynamo Table 

    const dbtable = new Table(this, "MyDBTable", {
      partitionKey: { name: "pk", type: AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      //billingMode: BillingMode.PAY_PER_REQUEST



    });

    // 2. Create API Gateway 
    const myapi = new RestApi(this, "NishatRestAPI", {
      restApiName: "NishatRestAPI_Dev",
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_METHODS,
        allowMethods: Cors.ALL_METHODS,
      },
      apiKeySourceType: ApiKeySourceType.HEADER,
      
    });

    const apikey = new ApiKey(this, "APIkey");
// Create Usage Plan  and Add API key  to  it .
    const usageplan = new UsagePlan(this, "nishatusageplan", {
      name: "UasagePlanNishat",
      apiStages: [
        {
          api: myapi,
          stage: myapi.deploymentStage
        }
      ]

    });
    usageplan.addApiKey(apikey);



    const postLambda=new NodejsFunction(this,"PostLambdaNishat",{
      entry: 'resources/endpoints/post.ts',
      handler:"handler",
      environment:{
        Tablename:dbtable.tableName
      }
        });
        
    const postsLambda=new NodejsFunction(this,"PostsLambdaNishat",{
      entry: 'resources/endpoints/posts.ts',
      handler:"handler",
      environment:{
        Tablename:dbtable.tableName
      }
        });

// Grant Lambda Function  to  read write access to  Lambda Function 
        dbtable.grantReadWriteData(postLambda);
        dbtable.grantReadWriteData(postsLambda);
// Define our API  getway  Endpoints 
const posts=myapi.root.addResource('posts');
const post=posts.addResource('{id}');

//connect  our Lambda function  to  API GAteways endpoints
const postIntegration=new LambdaIntegration(postLambda);
const  postIntegrations=new LambdaIntegration(postsLambda);



// Define your API  Getway Methods

posts.addMethod("GET",postIntegrations,{
  apiKeyRequired:true,
});

posts.addMethod("POST",postIntegrations,{
  apiKeyRequired:true,
});
post.addMethod("GET",postIntegration,{
  apiKeyRequired:true,
});

post.addMethod("DELETE",postIntegration,{
  apiKeyRequired:true,
});


new cdk.CfnOutput(this,"API KEY ID",{
value:apikey.keyId
  
})
  }

}
