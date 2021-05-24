import * as Dave from './sketch'
import resize from './resize'

const config = {}
let rafId = null

function init() {
	config.canvas = document.createElement('canvas');
	config.ctx = config.canvas.getContext('2d');
	document.body.appendChild(config.canvas)
	const [width, height] = resize(config, Dave.settings.dimensions)
	config.width = width;
	config.height = height;
	const render = Dave.sketch(config);
	rafId = requestAnimationFrame(t => loop(t, render))
}

let lastRender = 0
function loop(t, r) {
	const delta = t - lastRender
	r(t, delta, [config.width, config.height]);
	lastRender = t
	if(Dave.settings.animate) {
		rafId = requestAnimationFrame(t => loop(t, r))
	}
}

function dispose() {
	cancelAnimationFrame(rafId)
	document.body.removeChild(config.canvas)
	config.ctx = null
	config.canvas = null
	rafId = null
}

window.addEventListener('resize', _ => {
	dispose()
	init()
})

window.addEventListener('load', init)
