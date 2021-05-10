const {lerp} = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const margin = 200

export const settings = {
	dimensions: [2048,2048],
}

export function sketch({audio, context, width, height}) {
	const colorCount = random.rangeFloor(2,6)
	const palette = random.shuffle(random.pick(palettes).slice(0,colorCount));
	const grid = []
	const count =  25

	for(let x = 0; x < count; x++) {
		for(let y = 0; y < count; y++) {
			const u = count <= 1 ? 0.5 : x/(count -1);
			const v = count <= 1 ? 0.5 : y/(count - 1);
			const radius = Math.max(0.005, random.noise2D(u, v) * 0.09)
			grid.push({
				color: random.pick(palette),
				radius,
				rotation: random.noise2D(u, v),
				position: [u,v],
				name: random.pick('jake')
			})
		}
	}


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


	let n = 0
	let lastColor = random.pick(palette)

	return (t, delta) => { 
		context.fillStyle = 'white'
		context.fillRect(0,0, width, height)
		grid.forEach(pt => { 
			const x = lerp(margin, width-margin, pt.position[0])
			const y = lerp(margin, height-margin, pt.position[1]) 
			context.save()
			context.translate(x, y)
			context.rotate(pt.rotation)
			context.font = `${pt.radius * width}px "Source Code Pro"`
			context.fillStyle = pt.color
			context.fillText(pt.name, 0,0)// ☞ ➙ ➝ ➤
			context.restore()
		})

		if(++n % 60 ===0) {
			lastColor = random.pick(palette)
			context.fillStyle = lastColor
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
