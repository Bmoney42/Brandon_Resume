# Brandon Resume

## AWS Resume Challenge

---

## Architecture

- **Amazon S3** → Private storage (origin) for static files
- **Amazon CloudFront** → Public CDN (HTTPS entry point)
- **Origin Access Control (OAC)** → Restricts S3 access to CloudFront only
- **API Gateway** → Public HTTPS endpoint for the visitor counter
- **AWS Lambda (Python)** → Increments the visitor count
- **DynamoDB** → Stores the visitor count
- **Viewer access** → Only through CloudFront (S3 is never public)

**Request flow:**
Browser → CloudFront → S3 (page) · Browser → API Gateway → Lambda → DynamoDB (counter)

---



## Progress

### Frontend & Hosting
- Created S3 bucket for static site storage
- Uploaded `index.html`, `styles.css`, and `counter.js`
- Enabled server-side encryption (SSE-S3)
- Kept Block All Public Access = ON (bucket never public)
- Configured S3 as a private origin
- Created CloudFront distribution with HTTPS
- Configured Origin Access Control (OAC)
- Applied secure bucket policy allowing only this CloudFront distribution
- Verified site loads via CloudFront (not directly from S3)

### Backend (Visitor Counter)
- Created DynamoDB table (`resume-visitor-counter`) to store the count
- Wrote Lambda function (Python) using an atomic `ADD` to increment the count
- Attached least-privilege IAM policy (Lambda → `dynamodb:UpdateItem` on the specific table only)
- Created API Gateway (HTTP API) as the public endpoint
- Enabled CORS on API Gateway for browser access
- Connected frontend (`counter.js`) to the API — counter working end-to-end

### Troubleshooting (real issues solved)
- **CloudFront 403 Access Denied** → Origin was set to the S3 *website* endpoint (requires public bucket). Fixed by switching to the S3 *REST* endpoint with OAC, and applying the matching bucket policy.
- **Lambda AccessDenied on DynamoDB** → Execution role was missing DynamoDB permission. Fixed by attaching a least-privilege inline policy for `dynamodb:UpdateItem`.
- **CORS blocked the counter** → Browser blocked the cross-origin fetch. Fixed by enabling CORS on API Gateway.

---

## Security Notes

- S3 Block Public Access fully ON — bucket is never publicly accessible
- Access restricted to a single CloudFront distribution via the `AWS:SourceArn` condition
- Lambda follows least privilege — one action (`dynamodb:UpdateItem`) on one table
- HTTPS enforced end to end

**Bucket Policy (CloudFront-only access):**
```json
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::resume-challenge-brandon/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::517392056455:distribution/ECCFQ175D2EWH"
                }
            }
        }
    ]
}
