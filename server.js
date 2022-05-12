const fastify = require('fastify')({ logger: true })
const path = require('path')
const package = require('./package.json')
// Change the actual PORT value in package.json
const PORT = package.port
const HOST = package.host

function handle(signal) {
    console.log(`[-->] Received event: ${signal}`)
}
process.on('SIGHUP', handle)

async function closeGracefully(signal) {
    console.log(`[-->] Received signal to terminate: ${signal}`)

    await fastify.close()
    // await db.close() if we have a db connection in this app
    // await other things we should cleanup nicely
    process.exit()
}
process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'build'),
  prefix: '/', // optional: default '/'
})

const start = async () => {
  try {
    await fastify.listen(PORT, HOST)
    console.log(`\n
     __                   __
    /\  \\__               /\\ \\__
 ___\\ \\ ,_\\    __    _ __\\ \\ ,_\\ _____     __       __      __
/',__\\ \\ \\/  /'__'\\ /\\''__\\ \\ \\//\\ '__'\\ /'__'\\   /'_ '\\  /'__'\\
/\\__, '\\ \\ \\_/\\ \\_\\.\\\\ \\ \\/ \\ \\ \\\\ \\ \\_\\ /\\ \\_\\.\\_/\\ \\_\\ \\/\\  __/
\\/\\____/\\ \\__\\ \\__/.\\_\\ \\_\\  \\ \\__\\ \\ ,__\\ \\__/.\\_\\ \\____ \\ \\____\\
\\/___/  \\/__/\\/__/\\/_/\\/_/   \\/__/\\ \\ \\/ \\/__/\\/_/\\/____\\ \\/____/
                                   \\ \\_\\            /\\____/
 // retro crt startpage             \\/_/            \\_/__/\n\n\n`)

    console.log(` [-->] Now running on >> http://` + HOST + `:` + PORT + ` <<`)
    console.log(` [---]`)
    console.log(` [-->] Process ID (PID): ${process.pid}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
