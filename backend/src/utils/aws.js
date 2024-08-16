import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/*
*
* ----------------->STEPS<---------------- 
*
* 1. CREATE A IAM USER
* 2. GENERATE ACCESS KEYS BY GOING INTO security credentials > create access keys
* 3. CREATE A S3 CLIENT



* LINK FOR CREATING IAM USER
* https://us-east-1.console.aws.amazon.com/iam/home?region=ap-south-1#/users
*
* LINK FOR CREATING ACCESS KEYS OF AN IAM USER
* https://us-east-1.console.aws.amazon.com/iam/home?region=ap-south-1#/users/details/<IAM USER-NAME THAT U HAVE CREATED>/create-access-key 
* 
* GRANT THE IAM USER , ACCESS FOR USING S3 
* https://us-east-1.console.aws.amazon.com/iam/home?region=eu-north-1#/users/details/<USERNAME>/add-permissions
* Select "attach policies directly" and then search for policy name AmazonS3FullAccess
*
* REPLACE THE USERNAME WITH THE NAME OF YOUR IAM USER
*
* THEN WE NEED TO SET THE CORS POLICY OF BUCKET BY GOING TO THE GIVEN LINK:
* https://console.aws.amazon.com/s3/bucket/<YOUR-BUCKET-NAME>/property/cors/edit?region=ap-south-1&bucketType=general
*
* CLICK ON THE EDIT BUTTON AND PASTE THE FOLLOWING CONFIGURATION IN TEXT FIELD
* [
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "http://localhost:5173"
        ],
        "ExposeHeaders": []
    }
]
* --------------> STEPS <------------------
*/


const Bucket = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEYID}`,
    secretAccessKey: `${process.env.AWS_ACCESS_SECRET}`,
  },
});

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  // console.log(url);
  return url;
}

async function uploadObject(
  fileName,
  folder,
  ContentType
) {
  try {
    const filename = `${fileName}-${Date.now()}`
    const key = `${folder}/${filename}`;

    const command = new PutObjectCommand({
      Bucket,
      Key: `${folder}/${filename}`,
      ContentType: ContentType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    return {
      url,
      key,
    };
  }
  catch (err) {
    return {
      error: `Error while uploading the image to`,
    };
  }
}

async function deleteObject(key) {
  const command = new DeleteObjectCommand({
    Bucket,
    Key: key,
  });
  const deleted = await s3Client.send(command);
  return deleted;
}

async function uploadFile(fileName, folderName, contentType, image) {
  try {

    // const data = await fetch("/api/media",{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify({
    //     fileName,
    //     folderName,
    //     contentType
    //   })
    // });

    const data = await uploadObject(fileName, folderName, contentType)

    const { url, key } = data;

    const upload = await fetch(url ? url : "", {
      method: "PUT",
      headers: {
        "Content-Type": contentType
      },
      body: image
    })

    return upload;

  }
  catch (err) {
    return {
      error: err
    }
  }
}

// console.log(await uploadObject("Picture2.png", "image/png"))

export { getObjectUrl, uploadObject, deleteObject, uploadFile };
