export const handler = () => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Api is healthy',
            healthy: true
        })
    }
}