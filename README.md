# Brandon Resume

## AWS Resume Challenge

---

## Progress

- Created S3 bucket for static site storage
- Uploaded `index.html` and `styles.css`
- Enabled server-side encryption (SSE-S3)
- Kept **Block All Public Access = ON**
- Removed all public bucket access patterns
- Configured S3 as a **private origin**
- Created CloudFront distribution
- Enabled HTTPS delivery through CloudFront
- Configured **Origin Access Control (OAC)**
- Applied secure bucket policy to allow **only CloudFront access**
- Verified site loads successfully via CloudFront (not S3)
- Added frontend JavaScript support (ready for backend integration)

---

## Architecture

- **Amazon S3** → Private storage (origin)
- **Amazon CloudFront** → Public CDN (HTTPS entry point)
- **Viewer Access** → Only through CloudFront

---

## S3 Setup (Private Origin)

### Configuration

- Created S3 bucket for static assets
- Uploaded:
  - `index.html`
  - `styles.css`
- Server-side encryption enabled:
  - Amazon S3 managed keys (**SSE-S3**)
- Static website endpoint **not used**

---

## S3 Security

### Block Public Access

All public access is fully **enabled (blocked)**

- Block public access to buckets and objects granted through new ACLs → **ON**
- Block public access to buckets and objects granted through any ACLs → **ON**
- Block public access through new public bucket policies → **ON**
- Block public and cross-account access through any public policies → **ON**

---

### Bucket Policy (CloudFront Only Access)

Only CloudFront is allowed to read objects from S3:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontOnly",
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
