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
