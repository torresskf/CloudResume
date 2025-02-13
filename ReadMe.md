# Cloud Resume Challenge - Infrastructure Documentation

## Project Overview
A serverless resume website hosted on AWS, utilizing cloud services including S3 for static website hosting, CloudFront for content delivery, Route 53 for DNS management, and ACM for SSL certification

## Architecture Diagram

![Cloud Resume Architecture](https://s3.ap-southeast-1.amazonaws.com/torresoo.com/Documentation/Resume.drawio-2.svg)

- Title: Cloud Resume Challenge Infrastructure
- Designed with draw.io 
- AWS Architecture Icons © 2025 Amazon Web Services, Inc. or its affiliates
- Author: Torres Soo
- Created: February 2025

## Front-End Web Development
- **Code Repository**: `arn:aws:s3:::torresoo.com`
  ```yaml
  Soruce Code:
    HTML: https://s3.ap-southeast-1.amazonaws.com/torresoo.com/resume.html
    JavaScript: https://s3.ap-southeast-1.amazonaws.com/torresoo.com/script.js
    CSS: https://s3.ap-southeast-1.amazonaws.com/torresoo.com/styles.css
    ```
## Infrastructure Components

### 1. S3 Bucket Configuration
- **Bucket Name**: `torresoo.com`
- **Purpose**: Static website hosting
- **Configuration**:
  ```yaml
  WebsiteConfiguration:
    IndexDocument: resume.html
    ErrorDocument: error.html
  ```
- **Bucket Policy**:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::torresoo.com/*"
        }
    ]
  }
  ```

### 2. CloudFront Distribution
- **Origin**: S3 bucket website endpoint
- **Price Class**: Use Only North America, Europe, Asia, Middle East, and Africa
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS
- **Default Root Object**: resume.html
- **Cache Policy**: CachingOptimized
- **SSL Certificate**: ACM Certificate

### 3. ACM Certificate
- **Domain**: torresoo.com
- **Validation Method**: DNS Validation
- **Region**: us-east-1 (required for CloudFront)

### 4. Route 53 Configuration
- **Domain Registration**: www.torresoo.com
- **Record Sets**:
  ```yaml
  - Name: www.torresoo.com
    Type: A
    Alias: Yes
    Target: CloudFront Distribution
  - Name: www.torresoo.com
    Type: CNAME
    Value: torresoo.com
  ```

## Deployment Steps

### 1. Domain Registration
1. Register domain in Route 53
2. Note the nameservers assigned in the hosted zone

### 2. SSL Certificate
1. Request certificate in ACM (us-east-1) #only region available for certification request
2. Add domain names:
   - torresoo.com 
   - www.torresoo.com 
3. Create DNS validation records in Route 53:
   - record type: CNAME

### 3. S3 Bucket Setup
1. Create bucket with website name
2. Enable static website hosting
3. Upload website files
4. Apply bucket policy
5. Test bucket website endpoint

### 4. CloudFront Configuration
1. Create distribution
2. Point to S3 origin
3. Attach ACM certificate
4. Set default root object
5. Note distribution domain name: 
   - www.torresoo.com

### 5. DNS Configuration
1. Create A record in Route 53
2. Point to CloudFront distribution
3. Add www CNAME if needed:
   - Did not register for torresoo.com in the ACM hence not accessible
4. Wait for DNS propagation

## Testing & Verification

### Domain & SSL
- [ ] Domain resolves to website
- [ ] SSL certificate is valid
- [ ] HTTPS working correctly
- [ ] www subdomain working

### Website Function
- [ ] Homepage loads correctly
- [ ] All assets loading
- [ ] No SSL warnings
- [ ] Mobile responsive

## Maintenance Tasks

### Regular Checks
- Monitor SSL certificate expiration
- Review CloudFront cache settings
- Check S3 bucket permissions
- Monitor website performance

### Updates Process
1. Test changes locally
2. Upload to S3
3. Invalidate CloudFront cache if needed
4. Verify changes on live site

## Cost Estimation
- Route 53: 
  - $14 for domain registration
  - $0.50/month per hosted zone
- CloudFront: Based on traffic
- S3: Based on storage and requests
- ACM: Free for CloudFront usage

## Security Considerations
- Bucket accessible only through CloudFront
- HTTPS enforced via ACM
- WAF not enabled due to cost constraint

## Troubleshooting Guide

### Common Issues
1. **SSL Certificate Issues**
   - Verify certificate region
   - Check DNS validation
   - Confirm CloudFront settings

2. **Domain Resolution Problems**
   - Verify A record configuration
   - Check nameserver delegation
   - Allow DNS propagation time

3. **Content Updates Not Showing**
   - Clear CloudFront cache
   - Check S3 file permissions
   - Verify bucket policy

## Resources & References
- AWS Documentation
- Cloud Resume Challenge Guide 
- AWS Pricing Calculator
- ACM Documentation

## Future Improvements
- [ ] Implement CI/CD pipeline (AWS CodePipeline)
- [ ] Configure using IaC (AWS CDK & Cloudformation)
- [ ] Add monitoring and alerts
- [ ] Enable access logging
- [ ] Set up bucket backup strategy

