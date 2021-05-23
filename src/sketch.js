import resize from './resize'
import Vector from 'victor'
import { lerp, mapRange, expand2D } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'

const TAU = Math.PI*2

export const settings = {
	// animate: true
}

export function sketch({ ctx, audio, width, height }) {
	const palette = random.pick(palettes) 
	const waves = []

	for (let i of iter(20)) {
		const w = new Wave(random.range(20, height/2-40), random.range(width/4, width), random.range(0,TAU))
		w.color = random.pick(palette)
		w.direction = random.pick([-1,1])
		waves.push(w)
	}
	return (t, ft, [w, h]) => {
		ctx.fillStyle = '#fff4';
		ctx.fillRect(0,0, w, h);
		for(let x of iter(width)) {
			waves.forEach(wave => {
				let y = wave.evaluate(x)
				let size = mapRange(wave.freq, 1,width, 1,50)
				ctx.fillStyle = wave.color + '40' 
				ctx.shadowColor = wave.color
				ctx.shadowBlur = 10
				ctx.fillRect(x, y+h/2, size, size)
				ctx.fill();
			})
		}
		waves.forEach(w => w.update())
	}
}

class Wave {
	constructor(amp, freq, phase) {
		this.amp = amp
		this.freq = freq
		this.phase = phase
		this.color = null
	}

	evaluate(x){
		return Math.sin(this.phase + 2 * Math.PI * x / this.freq) * this.amp
	}

	update() {
		this.phase += (0.05 * this.direction)
	}
}

function* iter(value) {
		let count = 0;
		while(count < value) {
			yield count++
		}
}
