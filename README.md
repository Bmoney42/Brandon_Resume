# Brandon Resume

## AWS Resume Challenge

### Setup

- Use VS Code to create:
  - `index.html`
  - `styles.css`
- Create an S3 bucket in AWS
- Upload both files to the bucket (Objects tab)
- Enable static website hosting
- Enable server-side encryption:
  - Amazon S3 managed keys (**SSE-S3**)

---

## Permissions

### Block Public Access (Bucket Settings)

Set the following:

- Block all public access → **OFF**
  - Block public access to buckets and objects granted through new ACLs → **OFF**
  - Block public access to buckets and objects granted through any ACLs → **ON**
  - Block public access through new public bucket or access point policies → **OFF**
  - Block public and cross-account access through any public bucket or access point policies → **OFF**

---

## Bucket Policy

Apply the following policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::resume-challenge-brandon/*"
    }
  ]
}
