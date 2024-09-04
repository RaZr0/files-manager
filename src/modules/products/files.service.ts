import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';

@Injectable()
export class FilesService {

    private region = 'my-region';
    private s3 = new AWS.S3({ region: this.region });

    async upload(projectName: string, content: Blob | Buffer,
        fileKey: string,
        mimetype: string,) {
        try {
            const params = {
                Bucket: projectName,
                Key: fileKey,
                ContentType: mimetype,
                Body: content,
            };
            const res = await this.s3.upload(params).promise();
            return this.getFileMetadataUrl(projectName, res.Key);
        } catch (error) {
            console.error('File upload failed:', error);
        }
    }


    async getFilesMetadata(projectName: string) {
        try {

            const data = await this.s3.listObjectsV2({ Bucket: projectName }).promise();
            const files = data.Contents.map(file => {
                return this.getFileMetadataUrl(projectName, file.Key)
            });
            console.log(files);
        } catch (error) {
            console.error(error);
        }
    }

    private getFileMetadataUrl(key: string, projectName: string) {
        return {
            name: key,
            url: `https://${projectName}.s3.${this.region}.amazonaws.com/${key}`
        }
    }

}
