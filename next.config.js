// Import dotenv package
//require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['firebasestorage.googleapis.com', "storage.googleapis.com"],
    },

}

module.exports = nextConfig

