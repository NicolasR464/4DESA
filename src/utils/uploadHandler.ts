import {
    generateBlobSASQueryParameters,
    BlobSASPermissions,
    SASProtocol,
    StorageSharedKeyCredential,
} from '@azure/storage-blob'

export const uploadHandler = async (containerName: string) => {
    console.log({ containerName })

    if (!containerName) {
        return undefined
    }

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!

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

    const url = `https://${accountName}.blob.core.windows.net/${containerName}?${blobSas}`

    return url
}
