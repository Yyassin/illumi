import { useState } from 'react';
const ipcRenderer = window.require('electron').ipcRenderer

const [isActive, setIsActive] = useState()
const [isMaximized, setIsMaximized] = useState()

ipcRenderer.on('focused', () => {
    setIsActive(true)
})

ipcRenderer.on('blurred', () => {
    setIsActive(false)
})

ipcRenderer.on('maximized', () => {
    setIsMaximized(true)
})

ipcRenderer.on('unmaximized', () => {
    setIsMaximized(false)
})

const Renderer = {
    ipcRenderer: ipcRenderer,
    isActive: isActive,
    setIsActive: setIsActive,
    isMaximized: isMaximized,
    setIsMaximized: setIsMaximized
}

export default Renderer;