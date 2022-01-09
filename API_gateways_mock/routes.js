/**Routes */
const Routes = [
    /**Free
     * rate limited enabled
     * auth disabled
     * creditCheck disabled
     * proxy where the request should be redirected to
     */
    {
        url: '/free',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/free`]: '',
            },
        }
    },
    /**Premium
     * rate limited disabled
     * auth enabled
     * creditCheck enabled
     * proxy where the request should be redirected to
     */
    {
        url: '/premium',
        auth: true,
        creditCheck: true,
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/premium`]: '',
            },
        }
    }
]

exports.ROUTES = ROUTES;