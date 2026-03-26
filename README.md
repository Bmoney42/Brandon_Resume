# Brandon Resume

## AWS Resume Challenge

---

## Progress

- S3 bucket created (private origin)
- Static website files uploaded (`index.html`, `styles.css`)
- Server-side encryption enabled (SSE-S3)
- Removed public access from S3 bucket
- Configured S3 as **CloudFront origin**
- CloudFront distribution created
- HTTPS enabled via CloudFront
- Site successfully deployed and accessible through CloudFront URL
- Verified secure access (no direct S3 website endpoint exposure)
- Added JavaScript support (frontend ready for API integration)

---

## Architecture

- **S3** → private storage (origin only)
- **CloudFront** → public access layer (HTTPS)
- **Viewer access** → only through CloudFront

---

## S3 Setup (Private Origin)

### Configuration

- Bucket created for static assets
- Files uploaded:
  - `index.html`
  - `styles.css`
- Static website hosting **not used for public access**
- Server-side encryption enabled:
  - Amazon S3 managed keys (**SSE-S3**)

---

## S3 Security

### Block Public Access

All public access remains **ON**

- Block public access to buckets and objects granted through new ACLs → **ON**
- Block public access to buckets and objects granted through any ACLs → **ON**
- Block public access through new public bucket policies → **ON**
- Block public and cross-account access through any public policies → **ON**

No public bucket policy applied.

---

## CloudFront Setup

### Distribution Configuration

- Origin: S3 bucket
- Viewer protocol policy: **Redirect HTTP → HTTPS**
- Default root object: `index.html`

### Access Control

- S3 access restricted to CloudFront using **Origin Access Control (OAC)**
- Direct S3 access blocked

---

## Deployment Result

- Site accessible via CloudFront domain (HTTPS)
- S3 bucket is no longer publicly reachable
- Architecture follows production pattern (CDN in front of private origin)

---

## Next Steps

- DynamoDB visitor counter
- Lambda function integration
- API Gateway endpoint
- Frontend API call for live counter
- CI/CD pipeline (GitHub Actions)
