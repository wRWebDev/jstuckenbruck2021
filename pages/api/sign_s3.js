const aws = require( 'aws-sdk' )

// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
    region: 'eu-west-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY
})

// Now lets export this function so we can call it from somewhere else
export default async function(req, res) {
    
    const s3 = new aws.S3()  // Create a new instance of S3
    const mainBucket = process.env.S3_BUCKET_NAME
    const bucket = req.body.bucket
    const fileType = req.body.fileType
    const newFileName = req.body.newFileName

    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: mainBucket,
        Key: `${bucket}/${newFileName}`,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    }

    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        
        if(err){
            console.error(err);
            res.json({success: false, error: err})
        }

        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
        const returnData = {
            signedRequest: data,
            url: `https://${mainBucket}.s3.amazonaws.com/${bucket}/${newFileName}`
        }

        // Send it all back
        res.status(200)
        res.json({success:true, data:{returnData}});

    })
}