import Vue from 'vue'
import { Waits } from '@/globals'

export const SocketActions = {
  async printerInfo () {
    Vue.$socket.emit(
      'printer.info', {
        action: 'socket/onPrinterInfo'
      }
    )
  },

  async serverInfo () {
    Vue.$socket.emit(
      'server.info', {
        action: 'socket/onServerInfo'
      }
    )
  },

  async machineReboot () {
    Vue.$socket.emit(
      'machine.reboot'
    )
  },

  async machineShutdown () {
    Vue.$socket.emit(
      'machine.shutdown'
    )
  },

  async machineGpioPowerDevices () {
    Vue.$socket.emit(
      'machine.gpio_power.devices', {
        action: 'gpio/init'
      }
    )
  },

  async machineGpioPowerStatus () {
    Vue.$socket.emit(
      'machine.gpio_power.status', {
        action: 'gpio/onStatus'
      }
    )
  },

  async machineGpioPowerToggle (id: string, state: number, wait?: string) {
    const emit = (state === 1)
      ? 'machine.gpio_power.on'
      : 'machine.gpio_power.off'
    Vue.$socket.emit(
      emit, {
        action: 'gpio/onToggle',
        params: { [id]: null },
        wait
      }
    )
  },

  async printerQueryEndstops () {
    Vue.$socket.emit(
      'printer.query_endstops.status', {
        action: 'socket/onQueryEndstops'
      }
    )
  },

  async printerObjectsList () {
    Vue.$socket.emit(
      'printer.objects.list', {
        action: 'socket/onPrinterObjectsList'
      }
    )
  },

  async printerObjectsSubscribe (objects: {[key: string]: null}) {
    Vue.$socket.emit(
      'printer.objects.subscribe', {
        action: 'socket/onPrinterObjectsSubscribe',
        params: {
          objects
        }
      }
    )
  },

  async printerPrintStart (path: string) {
    Vue.$socket.emit(
      'printer.print.start', {
        params: {
          filename: path
        }
      }
    )
  },

  async printerPrintCancel () {
    Vue.$socket.emit(
      'printer.print.cancel', {
        action: 'socket/onPrintCancel',
        wait: Waits.onPrintCancel
      }
    )
  },

  async printerPrintPause () {
    Vue.$socket.emit(
      'printer.print.pause', {
        action: 'socket/onPrintPause',
        wait: Waits.onPrintPause
      }
    )
  },

  async printerPrintResume () {
    Vue.$socket.emit(
      'printer.print.resume', {
        action: 'socket/onPrintResume',
        wait: Waits.onPrintResume
      }
    )
  },

  async printerGcodeScript (gcode: string, wait?: string) {
    Vue.$socket.emit(
      'printer.gcode.script', {
        action: 'socket/onGcodeScript',
        params: {
          script: gcode
        },
        wait
      }
    )
  },

  async printerEmergencyStop () {
    Vue.$socket.emit(
      'printer.emergency_stop', {
        action: 'socket/notifyKlippyDisconnected'
      }
    )
  },

  async serverTemperatureStore () {
    Vue.$socket.emit(
      'server.temperature_store', {
        action: 'socket/onTemperatureStore'
      }
    )
  },

  async serverGcodeStore () {
    Vue.$socket.emit(
      'server.gcode_store', {
        action: 'socket/onGcodeStore'
      }
    )
  },

  async serverFilesMetaData (path: string) {
    Vue.$socket.emit(
      'server.files.metadata', {
        action: 'socket/onServerFilesMetadata',
        params: {
          filename: path
        }
      }
    )
  },

  /**
   * This only requires path, but we pass root along too
   * for brevity.
   */
  async serverFilesGetDirectory (root: string, path: string) {
    Vue.$socket.emit(
      'server.files.get_directory',
      {
        action: 'files/onServerFilesGetDirectory',
        wait: `${Waits.onGetDirectory}${path}`,
        params: { root, path }
      }
    )
  },
  async serverFilesMove (source: string, dest: string) {
    Vue.$socket.emit(
      'server.files.move', {
        params: {
          source,
          dest
        }
      }
    )
  },

  /**
   * Create a directory.
   * Root should be included in the path.
   */
  async serverFilesPostDirectory (path: string) {
    Vue.$socket.emit(
      'server.files.post_directory', {
        params: {
          path
        }
      }
    )
  },

  async serverFilesDeleteFile (path: string) {
    Vue.$socket.emit(
      'server.files.delete_file', {
        params: {
          path
        }
      }
    )
  },

  async serverFilesDeleteDirectory (path: string) {
    Vue.$socket.emit(
      'server.files.delete_directory', {
        params: {
          path,
          force: true
        }
      }
    )
  }
}
