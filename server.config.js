var env = {
    APP_PORT: 8002,
    JWT_TOKEN: '8GaNssWC5?eLzvt2',
    BILLPLZ_SECRET_KEY: 'be29c20a-81fb-4144-89d7-f7bb5c971eec',
    BILLPLZ_COLLECTION: 'xkvwvihv'
}

module.exports = {
    apps: [{
        name: 'arrivo:1',
        script: 'index.js',
        instances: 1,
        autorestart: true,
        watch: true,
        log_date_format: 'YYYY-MM-DD HH:mm',
        env_local: {
            NODE_ENV: 'local',
            ...env
        },
        env_uat: {
            NODE_ENV: 'uat',
            HOST: 'uat-arrivo.com.my'
            ...env
        },
        env_prod: {
            NODE_ENV: 'production',
            HOST: 'arrivo.com.my'
            ...env
        }
    }]
}