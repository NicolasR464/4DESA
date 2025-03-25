/**
 * @swagger
 * /api/upload:
 *   get:
 *     summary: Generate Azure Blob Storage SAS URL
 *     description: Generates a Shared Access Signature (SAS) URL for uploading files to Azure Blob Storage
 *     tags:
 *       - Storage
 *     parameters:
 *       - in: query
 *         name: containerName
 *         required: true
 *         schema:
 *           type: string
 *         description: The Azure Blob Storage container name
 *       - in: query
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to be uploaded
 *     responses:
 *       200:
 *         description: Successfully generated SAS URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The SAS URL for uploading to Azure Blob Storage
 *                   example: https://storageaccount.blob.core.windows.net/container/file.jpg?sv=2020-08-04&ss=b&srt=c&sp=cw&se=2023-01-01T00:00:00Z&st=2022-01-01T00:00:00Z&spr=https&sig=signature
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Container name required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing Azure Storage credentials
 */

import {
    generateBlobSASQueryParameters,
    BlobSASPermissions,
    SASProtocol,
    StorageSharedKeyCredential,
} from '@azure/storage-blob'

export const GET = async (req: Request) => {
    console.log('🔥 GET')

    const url = new URL(req.url)
    const containerName = url.searchParams.get('containerName')
    const fileName = url.searchParams.get('fileName')
    console.log({ containerName })

    if (!containerName)
        return new Response(
            JSON.stringify({ error: 'Container name required' })
        )

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!

    if (!accountName || !accountKey)
        return new Response(
            JSON.stringify({ error: 'Missing Azure Storage credentials' })
        )

    const sharedKeyCredential = new StorageSharedKeyCredential(
        accountName,
        accountKey
    )

    const blobSas = generateBlobSASQueryParameters(
        {
            containerName,
            permissions: BlobSASPermissions.parse('cw'), // Create + Write
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + 10 * 60 * 1000), // 10 min
            protocol: SASProtocol.Https,
        },
        sharedKeyCredential
    ).toString()

    const azureURL = `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}?${blobSas}`

    if (!azureURL) return new Response(JSON.stringify({ error: '❌' }))

    return new Response(JSON.stringify({ url: azureURL }))
}
