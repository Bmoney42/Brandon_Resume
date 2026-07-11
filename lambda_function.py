import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("resume-visitor-counter")

def lambda_handler(event, context):
    response = table.update_item(
        Key={"id": "1"},
        UpdateExpression="ADD #count :inc",
        ExpressionAttributeNames={"#count": "count"},
        ExpressionAttributeValues={":inc": 1},
        ReturnValues="UPDATED_NEW"
    )

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "count": int(response["Attributes"]["count"])
        })
    }