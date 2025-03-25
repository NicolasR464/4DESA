'use client'

import { useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function ApiDocs() {
    const [spec, setSpec] = useState(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('/api/doc')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `API responded with status: ${response.status}`
                    )
                }
                return response.json()
            })
            .then((data) => {
                setSpec(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className="p-8">Loading API documentation...</div>
    }

    if (error) {
        return (
            <div className="p-8 text-red-500">
                Error loading API documentation: {error}
            </div>
        )
    }

    if (!spec) {
        return <div className="p-8">No API specification found.</div>
    }

    return (
        <div className="swagger-container">
            <SwaggerUI spec={spec} />
            <style jsx global>{`
                .swagger-ui .topbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}
