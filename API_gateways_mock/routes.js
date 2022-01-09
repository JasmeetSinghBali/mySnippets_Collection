/**Routes */
const ROUTES = [
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
            /** changeOrigin flag if set true then if a request
             * was made to different domain backend then it
             * will be possible basically cross origin request
             * proxies enabled kinda
             */
            changeOrigin: true,
            /** pathRewrite will change the path at runtime
             * the ^/free singnifies that "free" will be removed
             * form end of the request path hence redirected
             * to /
             */
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