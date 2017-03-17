/**
 * 全局loading效果
 * */

// 单例
let __instance__ = (function () {
    let instance

    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance
    }
}())

export default class AutoLoading {
    constructor () {

        if (__instance__(null)) return __instance__(null)
        __instance__(this)

        this.loadding  = _createNode()
        this.loadQueue = []

        window.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(this.loadding)
            document.body.appendChild(_createStyle())
        })
    }

    show () {
        this.loadQueue.push(1)
        this.loadding.style.display = 'block'
    }

    hide () {
        this.loadQueue.pop()

        if (this.loadQueue.length > 0) {
            return false
        }
        this.loadding.style.display = 'none'
    }
}

function _createNode() {
    const _node  = document.createElement('div')
    const _child = document.createElement('div')

    _node.setAttribute('style', 'position: fixed;z-index:99999999;display:none;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.15);text-align:center;')
    _child.setAttribute('style', `
        position:absolute;top:50%;left:50%;margin-top: -12px;margin-left: -12px;background-color: none;
        border-radius: 100%;-webkit-animation-fill-mode: both;animation-fill-mode: both;
        border: 2px solid #fff;border-bottom-color: transparent;height: 25px;width: 25px;
        background: transparent !important;display: inline-block;
        -webkit-animation: rotate 1.2s 0s linear infinite;animation: rotate 1.2s 0s linear infinite;
    `)
    _node.appendChild(_child)
    _node.addEventListener('touchstart', (e) => {
        e.preventDefault()
    })

    return _node
}

function _createStyle() {
    const _style = document.createElement('style')

    _style.innerText = `
        @-webkit-keyframes rotate {
            0% {-webkit-transform: rotate(0deg) scale(1);transform: rotate(0deg) scale(1);}
            50% {-webkit-transform: rotate(180deg) scale(1);transform: rotate(180deg) scale(1); }
            100% {-webkit-transform: rotate(360deg) scale(1);transform: rotate(360deg) scale(1); }
        }
    `

    return _style
}