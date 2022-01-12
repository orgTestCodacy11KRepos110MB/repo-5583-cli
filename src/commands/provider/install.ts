import { PluginType } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import Command from '../base'

export default class Install extends Command {
  static description = 'Install providers based on the lock file'

  static aliases = ['install']

  static examples = ['$ cg provider install']

  static strict = false

  static hidden = false

  static flags = {
    ...Command.flags,
  }

  static args = Command.args

  async run(): Promise<void> {
    const manager = await this.getPluginManager(PluginType.Provider)
    const lockFile = manager.getLockFile()
    if (isEmpty(lockFile?.provider)) {
      this.logger.info('No providers found in lock file, have you added any?')
      this.exit()
    }
    for (const [key, value] of Object.entries(lockFile.provider)) {
      await manager.getPlugin(key, value as string)
    }
  }
}
