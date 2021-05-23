import * as Dave from './sketch'
import resize from './resize'

const config = {}

function init() {
	config.canvas = document.createElement('canvas');
	config.ctx = config.canvas.getContext('2d');
	config.audio = new AudioContext();
	document.body.appendChild(config.canvas)
	const [width, height] = resize(config)
	config.width = width;
	config.height = height;
	const render = Dave.sketch(config);
	requestAnimationFrame(t => loop(t, render))
}

let lastRender = 0
function loop(t, r) {
	const delta = t - lastRender
	r(t, delta, [config.width, config.height]);
	lastRender = t
	if(Dave.settings.animate) {
		requestAnimationFrame(t => loop(t, r))
	}
}
window.addEventListener('mouseup', _ => {
	if(config.audio.state ==='suspended') config.audio.resume()
})

window.addEventListener('resize', _ => {
	const [ width, height ] = resize(config)
	config.width = width
	config.height = height
})

window.addEventListener('load', init)
