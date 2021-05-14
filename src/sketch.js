const { Midi } = require("@tonaljs/tonal");
const {lerp} = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const margin = 200

export const settings = {
	dimensions: [2048,2048],
}

export function sketch({audio, context, width, height, onClick}) {
	const colorCount = random.rangeFloor(2,6)
	const palette = random.shuffle(random.pick(palettes).slice(0,colorCount));
	const grid = createGrid({ palette })
	const {osc, amp, env} = createVoice({ audio })
	let index = 0
	let n = 0
	let lastColor = random.pick(palette)
	return (t, delta) => { 
		context.fillStyle = 'white'
		context.fillRect(0,0, width, height)
		grid.forEach(pt => {
			const x =  lerp(margin, width-margin, pt.position[0])
			const y =  lerp(margin, height-margin, pt.position[1])
			context.beginPath()
			context.arc(x, y, 20, 0,2*Math.PI);
			context.fillStyle = pt.color
			context.fill()
		})

		if(++n % 60 === 0) {
			const frequency = random.noise1D(++index, 1, 220) + 220
			lastColor = random.pick(palette)
			context.fillStyle = lastColor
			osc.frequency.setValueAtTime(frequency, audio.currentTime);
			env.gain.cancelScheduledValues(audio.currentTime)
			env.gain.setValueAtTime(0, audio.currentTime)
			env.gain.linearRampToValueAtTime(1, audio.currentTime + 0.01)
			env.gain.linearRampToValueAtTime(0, audio.currentTime + 0.01 + 0.99)
		} else {
			context.fillStyle = lastColor
		}
		context.font = '200px "Courier"'
		context.fillText(n, width/2, height/2)
	}
}

function createVoice({audio}) {
	const osc = audio.createOscillator()
	const amp = audio.createGain()
	const env = audio.createGain()

	osc.type = 'sawtooth'
	osc.frequency.value = 220
	osc.start()

	amp.gain.value = 0.01
	env.gain.value = 0

	osc.connect(amp)
	amp.connect(env)
	env.connect(audio.destination)
	return { osc, amp, env }
}

function createGrid({ palette }) {
	const grid = []
	const count =  25
	const color = random.pick(palette)
	for(let x = 0; x < count; x++) {
		for(let y = 0; y < count; y++) {
			const u = count <= 1 ? 0.5 : x/(count -1);
			const v = count <= 1 ? 0.5 : y/(count - 1);
			const radius = Math.max(0.005, random.noise2D(u, v) * 0.09)
			grid.push({
				color,
				radius,
				rotation: random.noise2D(u, v),
				position: [u,v],
				name: random.pick('jake')
			})
		}
	}
	return grid
}
