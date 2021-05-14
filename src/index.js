import * as Dave from './sketch.js'

const dpr = window.devicePixelRatio

const App = {
	audio : new AudioContext(),
	canvas : document.createElement('canvas'),
	parent : document.body,
	onClick: cb => this._onClick = cb
}

window.addEventListener('click', e => {
	if(App._onClick) App._onClick(e)
	if(App.audio.state === 'suspended') App.audio.resume();
})

function init({ dimensions }) {
	App.context = App.canvas.getContext('2d'),
	App.parent.appendChild(App.canvas)
	const { width, height } = setDimensions(App, dimensions);
	App.width = width
	App.height = height
}

function setDimensions({ canvas, context }, dimensions = []) {
	const gcd = (a, b) => (b == 0) ? a : gcd (b, a%b);
	const [w = 1440, h = 1080] = dimensions
	const width =  w 
	const height =  h
	canvas.width = width * dpr
	canvas.height= height * dpr
	canvas.style.width = '100%'
	context.scale(dpr, dpr)
	return { width, height }
}

function view(model) {
	return Dave.sketch(App, model)
}

let lastRender = 0
function loop(t, render) {
	const delta = t - lastRender
	render(t, delta)
	lastRender =  t
	requestAnimationFrame(t => loop(t, render ))
}

function main() {
	init(Dave.settings)
	const render = view()
	requestAnimationFrame(t => loop(t, render))
}

window.addEventListener('load',main)

