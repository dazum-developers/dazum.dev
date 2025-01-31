import type { Request, Response } from 'express'

import os from 'node:os'

import {routeGroup} from '@/common/route-group'

export default routeGroup(
    {
        name: 'system',
        prefix: '/system'
    },
    [
        {
            method: 'get',
            path: '/info',
            middlewares: [],
            validators: [],
            controllers: [
                (_: Request, res: Response) => res.status(200).json({
                    arch: os.arch(),
                    cpu: os.cpus()?.[0]?.model,
                    hostname: os.hostname(),
                    platform: os.platform()
                })
            ],
        }
    ]
)
