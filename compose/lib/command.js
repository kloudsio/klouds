import { exec }  from 'child_process'

class Command {
    constructor(command) {
        this.command = command
        this.queue = []
    }
    bind({env = {}, cwd = process.cwd(), args}) {
        let cmd = this.command
        if (args)
            cmd = `${cmd} ${args}`

        this.queue.push(cb => exec(cmd, { cwd }, cb))
        return this
    }
    run(cb) {
        const self = this
        function next(err, res) {
            if (err)
                return cb && cb(err)
            const fn = self.queue.shift()
            if (!fn)
                return cb && cb(err, res.trim().split('\n'))
            fn.call(self, next)
        }
        next()
    }
}

export default Command
