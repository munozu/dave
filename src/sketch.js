import { mapRange } from 'canvas-sketch-util/math'
const audio = new AudioContext();
const state = { interacted: 0, mouseisdown: false };


export function sketch({ ctx, canvas, width, height }) {
	const voice = new Voice()
	const analyser =  audio.createAnalyser()

	voice.connect(analyser)
	analyser.connect(audio.destination)

	analyser.fftSize = 1024
	let buflen = analyser.frequencyBinCount;
	let dataArray =  new Float32Array(buflen);
	canvas.onmousedown = onMouseDown
	canvas.onmouseup = onMouseUp
	let to;
	return _ => {
		ctx.fillStyle = '#333'
		ctx.fillRect(0,0,width, height);
		if(state.mouseisdown) {
			if(to) clearTimeout(to)
			to = setTimeout(() => {
				let value =  mapRange(state.pos.y/height, 0, 1, 440, 40 )
				voice.play(value, 0.1, 3)
				console.log(dataArray)
			}, 20)
		}
		analyser.getFloatTimeDomainData(dataArray)
		let sliceWidth =  width/buflen
		let x = 0
		ctx.fillStyle = 'white'
		for(let i = 0; i < buflen; i++){
			let v = dataArray[i]
			let y = v * height + height/2
			ctx.fillRect(x, y, 2, 2)
			x += sliceWidth;
		}
	}
}

function onMouseDown(e) {
	state.pos = { x: e.x , y: e.y }
	state.mouseisdown = true
}

function onMouseUp(e) {
	state.pos = { x: e.x , y: e.y }
	state.mouseisdown = false
}

window.addEventListener('click', _ => {
	if(audio.state === 'suspended') audio.resume()
})

class Voice {
	constructor() {
		this.osc = audio.createOscillator()
		this.amp = audio.createGain()
		this.env = audio.createGain()
		this.flt =  audio.createBiquadFilter()

		this.osc.type =  'square';
		this.osc.frequency.value = 220;
		this.amp.gain.value =  0.1;
		this.env.gain.value = 0.0;

		this.osc.start()
		this.osc.connect(this.amp)
		this.amp.connect(this.env)
		this.env.connect(this.flt)
	}

	connect(n) {
		this.flt.connect(n)
	}

	play(value, attack, decay) {
		this.osc.frequency.linearRampToValueAtTime(value, audio.currentTime)
		this.env.gain.cancelScheduledValues(audio.currentTime)
		this.env.gain.linearRampToValueAtTime(0.0, audio.currentTime + 0.0003)
		this.env.gain.linearRampToValueAtTime(1, audio.currentTime + attack)
		this.env.gain.linearRampToValueAtTime(0, audio.currentTime + attack + decay)
	}
}

function* iter(len) {
	let count = 0
	while(count < len) {
		yield count++
	}
}

export const settings = {
	dimensions: [1024, 1024],
	animate: true
}
